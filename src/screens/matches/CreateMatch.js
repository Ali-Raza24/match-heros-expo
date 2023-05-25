import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Alert,
  Picker,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, FormLabel, Input, Button } from "react-native-elements";
import AuthService from "../../services/AuthService";
import TeamService from "../../services/TeamService";
import counties from "../../component/_shared/Counties";
import VenueService from "../../services/VenueService";
import GameService from "../../services/GameService";
import PlayerService from "../../services/PlayerService";
import BookingService from "../../services/BookingService";
import PrimaryButton from "../../component/_shared/PrimaryButton";
// import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from "moment";
// import BadgeIcon from '../../component/_shared/BadgeIcon'
import { LinearGradient } from "expo-linear-gradient";
import SegmentedControlTab from "react-native-segmented-control-tab";
import TransparentButton from "../../component/_shared/TransparentButton";
import { getStatusBarHeight } from "react-native-status-bar-height";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";

class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this.counties = counties;
    this.VenueService = new VenueService();
    this.GameService = new GameService();
    this.PlayerService = new PlayerService();
    this.BookingService = new BookingService();
    this.AuthService = new AuthService();
    this.TeamService = new TeamService();
    this.state = {
      user_id: "",
      city_id: "",
      county_id: "",
      pitch_id: "",
      gameType: 1,
      gameTypes: [
        { name: "Friendly Game", value: 1 },
        { name: "Team Challenge", value: 2 },
      ],
      userTeams: [],
      otherTeams: [],
      home: "",
      away: "",
      errors: {},
      selected: 0,
      refreshing: false,
      isCustomVenue: false,
      selectedPitch: "",
      customVenueName: "",
      customVenueAddress: "",
      gameStart: null,
      buttonLoading: false,
      bookings: [],
      showSpinner: true,
      selectedBooking: {},
      isVisibleDatePicker: false,
    };
  }

  componentDidMount() {
    this.handleCreateData();
  }

  showErrAlert = (title, message) => {
    return Alert.alert(
      `${title}`,
      `${message}`,
      [{ text: "OK", onPress: () => console.log("Cancel Pressed") }],
      { cancelable: false }
    );
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.handleCreateData().then(() => this.setState({ refreshing: false }));
  };

  handleCreateData() {
    this.BookingService.getUserBookings(this.props.user.id).then((response) => {
      this.setState({ bookings: response.data.data });
    });
    this.TeamService.getUserTeams(this.props.user.id).then((userTeams) => {
      this.TeamService.getTeamsNoPagination().then((allTeams) => {
        console.log("allTeams", allTeams);
        const userTeamsIds = userTeams.map((team) => {
          if (team.captain[0].id === this.props.user.id) return team.id;
        });
        let userCaptainTeams = userTeams.filter(
          (team) => team.captain[0].id === this.props.user.id
        );
        const otherTeams = allTeams.data.filter(
          (teams) => userTeamsIds.indexOf(teams.id) === -1
        );
        this.setState({
          userTeams: userCaptainTeams,
          otherTeams: otherTeams,
          user_id: this.props.id,
          showSpinner: false,
        });
      });
    });
  }

  handleCountyChange = (value) => {
    this.setState({
      county_id: value,
      city_id: "",
    });
  };

  createGame() {
    this.setState({ buttonLoading: true });
    console.log(this.state);
    if (this.state.gameType === 1) {
      let data = {};
      if (this.state.pitch_id) data.pitch_id = this.state.pitch_id;
      data.type_id = this.state.gameType.toString();
      data.creator_id = this.props.user.id;
      if (this.state.gameDuration) data.duration = this.state.gameDuration;
      data.status = "accepted";
      if (this.state.isCustomVenue) {
        data.custom_venue = this.state.isCustomVenue;
        data.city_id = this.state.city_id;
        data.venue_name = this.state.customVenueName;
        data.venue_address = this.state.customVenueAddress;
        data.starts_at = this.state.gameStart;
      }
      if (Object.keys(this.state.selectedBooking).length > 0) {
        data.selectedBooking = this.state.selectedBooking;
      }

      this.GameService.create(data)
        .then((response) => {
          this.setState({ buttonLoading: false }, () => {
            if (Object.keys(this.state.selectedBooking).length > 0) {
              this.BookingService.syncBookingWithGame(
                this.state.selectedBooking.id,
                response.data.id
              )
                .then((res) => {
                  Alert.alert(
                    `You successfully create game`,
                    "You will navigate to manage game",
                    [
                      {
                        text: "OK",
                        onPress: () =>
                          this.props.navigation.navigate("ManageGame", {
                            gameId: response.data.id,
                          }),
                      },
                    ],
                    { cancelable: false }
                  );
                })
                .catch((err) => {
                  this.showErrAlert(
                    "An error occurs during syncing booking with game",
                    "Please try it again later trough manage game."
                  );
                  console.log(err.response ? err.response.data : err);
                  this.props.navigation.navigate("Games");
                });
            } else {
              Alert.alert(
                `You successfully create game`,
                "You will navigate to manage game",
                [
                  {
                    text: "OK",
                    onPress: () =>
                      this.props.navigation.navigate("ManageGame", {
                        gameId: response.data.id,
                      }),
                  },
                ],
                { cancelable: false }
              );
            }
          });
        })
        .catch((err) => {
          this.showErrAlert(
            "An error occurs during creating game",
            "Please try it again later trough manage game."
          );
        });
    } else {
      let data = {};
      data.home_id = this.state.home;
      data.away_id = this.state.away;
      if (this.state.pitch_id) data.pitch_id = this.state.pitch_id;
      data.type_id = this.state.gameType;
      data.creator_id = this.props.user.id;
      if (this.state.gameDuration) data.duration = this.state.gameDuration;
      data.status = "pending";
      if (this.state.isCustomVenue) {
        data.custom_venue = this.state.isCustomVenue;
        data.city_id = this.state.city_id;
        data.venue_name = this.state.customVenueName;
        data.venue_address = this.state.customVenueAddress;
        data.starts_at = this.state.gameStart;
      }
      if (Object.keys(this.state.selectedBooking).length > 0) {
        data.selectedBooking = this.state.selectedBooking;
      }
      console.log(data);
      this.GameService.create(data)
        .then((response) => {
          if (Object.keys(this.state.selectedBooking).length > 0) {
            this.BookingService.syncBookingWithGame(
              this.state.selectedBooking.id,
              response.data.id
            )
              .then((res) => {
                this.setState({ buttonLoading: false }, () =>
                  Alert.alert(
                    `You successfully create game`,
                    "You will navigate to manage game",
                    [
                      {
                        text: "OK",
                        onPress: () =>
                          this.props.navigation.navigate("ManageGame", {
                            gameId: response.data.id,
                          }),
                      },
                    ],
                    { cancelable: false }
                  )
                );
              })
              .catch((err) => {
                this.showErrAlert(
                  "An error occurs during syncing booking with game",
                  "Please try it again later trough manage game."
                );
                console.log(err.response ? err.response.data : err);
                this.props.navigation.navigate("Games");
              });
          } else {
            Alert.alert(
              `You successfully create game`,
              "You will navigate to manage game",
              [
                {
                  text: "OK",
                  onPress: () =>
                    this.props.navigation.navigate("ManageGame", {
                      gameId: response.data.id,
                    }),
                },
              ],
              { cancelable: false }
            );
          }
        })
        .catch((err) => {
          this.showErrAlert(
            "An error occurs during creating game",
            "Please try it again later trough manage game."
          );
          console.log(err.response ? err.response.data : err);
        });
    }
  }

  getCities() {
    return this.counties.find((x) => x.id === this.state.county_id)
      ? this.counties.find((x) => x.id === this.state.county_id).cities
      : [];
  }

  handleCityChange = (cityId) => {
    this.setState({ city_id: cityId });
  };

  handleTeamGame() {
    return (
      <View style={{ paddingTop: 20 }}>
        <View style={{ paddingHorizontal: 25 }}>
          <RNPickerSelect
            itemStyle={{
              color: "#808080",
              //  fontFamily: 'SourceSansPro-Regular'
            }}
            style={bookingsPicker}
            value={this.state.home}
            placeholder={{ label: "Choose Home Team", value: "" }}
            onValueChange={(value) => this.setState({ home: value })}
            items={this.state.userTeams.map((team) => {
              return { key: team.id, label: team.name, value: team.id };
            })}
          ></RNPickerSelect>
        </View>
        <View style={{ paddingHorizontal: 25 }}>
          <RNPickerSelect
            itemStyle={{
              color: "#808080",
              //   fontFamily: "SourceSansPro-Regular",
            }}
            style={bookingsPicker}
            value={this.state.away}
            placeholder={{ label: "Choose Away Team", value: "" }}
            onValueChange={(value) => this.setState({ away: value })}
            items={this.state.otherTeams.map((team) => {
              return { key: team.id, label: team.name, value: team.id };
            })}
          ></RNPickerSelect>
        </View>
      </View>
    );
  }

  handleValidation = () => {
    const {
      county_id,
      city_id,
      gameType,
      isCustomVenue,
      customVenueName,
      customVenueAddress,
      home,
      away,
      gameStart,
    } = this.state;
    let errors = {};

    if (gameType === "") {
      errors.gameType = "Please select game type.";
    }
    if (gameType === 2) {
      if (home === "") {
        errors.home = "Please select home team.";
      }
      if (away === "") {
        errors.away = "Please select away team.";
      }
    }
    if (isCustomVenue) {
      if (customVenueName === "") {
        errors.customVenueName = "Please enter venue name.";
      }
      if (customVenueAddress === "") {
        errors.customVenueAddress = "Please enter venue address.";
      }
      if (county_id === "") {
        errors.county_id = "Please select county.";
      }
      if (city_id === "") {
        errors.city_id = "Please select city.";
      }
      if (gameStart === null) {
        errors.gameStart = "Please select game start time.";
      }
    }

    if (Object.keys(errors).length === 0) {
      this.setState({ errors: errors });
      return true;
    } else {
      this.setState({ errors: errors });
      return false;
    }
  };

  handleSubmit = () => {
    if (this.handleValidation()) {
      this.createGame();
    }
  };

  handleGameType() {
    return this.state.gameType === 2 ? this.handleTeamGame() : null;
  }

  handleBookingCheck = (bookingId) => {
    if (
      !this.state.selectedBooking &&
      this.state.selectedBooking.id === bookingId
    ) {
      this.setState({
        selectedBooking: { id: "placeholder" },
      });
      return;
    }
    let selectedBooking = this.state.bookings.filter(
      (booking) => booking.id === bookingId
    )[0] || { id: "placeholder" };
    this.setState({
      selectedBooking,
    });
  };

  showPicker = () => {
    this.setState({ isVisibleDatePicker: true });
  };

  hidePicker = () => {
    this.setState({ isVisibleDatePicker: false });
  };

  handlePicker = (datetime) => {
    let formatdDate = moment(datetime).format("YYYY-MM-DD HH:mm:ss");
    this.setState({ gameStart: formatdDate, isVisibleDatePicker: false });
  };

  render() {
    let date = new Date();
    let hour = date.getHours();
    //  todo: what is this for??????
    date.setMinutes(0);
    date.setHours(hour + 1);
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <LinearGradient
          style={{ flex: 1, marginTop: getStatusBarHeight() + 50 }}
          colors={["#5E89E2", "#0E1326"]}
        >
          <StatusBar backgroundColor="#5E89E2" />
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this.onRefresh}
                refreshing={this.state.refreshing}
              />
            }
          >
            <View style={styles.mainContainer}>
              <View style={styles.formContainer}>
                <View>
                  <View style={styles.navigationSection}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                          //   fontFamily: "SourceSansPro-SemiBold",
                        }}
                      >
                        Choose game type{" "}
                      </Text>
                    </View>
                    <View style={styles.segmentSection}>
                      <SegmentedControlTab
                        values={["Friendly", "Team Challenge"]}
                        selectedIndex={this.state.selected}
                        tabStyle={styles.tabStyle}
                        tabTextStyle={styles.tabTextStyle}
                        activeTabStyle={styles.activeTabStyle}
                        activeTabTextStyle={styles.activeTabTextStyle}
                        onTabPress={(index) =>
                          this.setState({
                            selected: index,
                            gameType: index + 1,
                          })
                        }
                      />
                    </View>
                    {this.handleGameType()}
                  </View>
                </View>
                <View style={styles.customVenueSection}>
                  <View style={styles.customVenueCheck}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        // fontFamily: "SourceSansPro-SemiBold",
                      }}
                    >
                      Use custom venue
                    </Text>
                    <TouchableOpacity
                      style={{ paddingLeft: 20 }}
                      onPress={() =>
                        this.setState({
                          isCustomVenue: !this.state.isCustomVenue,
                        })
                      }
                    >
                      {this.state.isCustomVenue ? (
                        <Image
                          source={require("../../../assets/image/venueCheck.png")}
                          style={{ width: 30, height: 30 }}
                        />
                      ) : (
                        <Image
                          source={require("../../../assets/image/venueUnchecked.png")}
                          style={{ width: 30, height: 30 }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  {this.state.isCustomVenue && (
                    <View style={styles.customVenueData}>
                      <View style={styles.placePicker}>
                        <View style={styles.pickerLeftContainer}>
                          <RNPickerSelect
                            itemStyle={{
                              color: "#808080",
                              //   fontFamily: "SourceSansPro-Regular",
                            }}
                            style={pickerSelectStyles}
                            value={this.state.county_id}
                            placeholder={{ label: "County", value: "" }}
                            onValueChange={(value) =>
                              this.handleCountyChange(value)
                            }
                            items={this.counties.map((county) => {
                              return {
                                key: county.id,
                                label: county.name,
                                value: county.id,
                              };
                            })}
                          ></RNPickerSelect>
                        </View>
                        <View style={styles.pickerRightContainer}>
                          <RNPickerSelect
                            itemStyle={{
                              color: "#808080",
                              //   fontFamily: "SourceSansPro-Regular",
                            }}
                            style={pickerSelectStyles}
                            value={this.state.city_id}
                            placeholder={{ label: "City", value: "" }}
                            onValueChange={(cityId) =>
                              this.handleCityChange(cityId)
                            }
                            items={this.getCities().map((city) => {
                              return {
                                key: city.id,
                                label: city.name,
                                value: city.id,
                              };
                            })}
                          ></RNPickerSelect>
                        </View>
                      </View>
                      <View style={{ width: "100%" }}>
                        <FormLabel
                          containerStyle={styles.labelContainer}
                          labelStyle={styles.label}
                        >
                          Venue name:
                        </FormLabel>
                        <Input
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            this.addressTextInput.focus();
                          }}
                          blurOnSubmit={false}
                          containerStyle={styles.inputContainerStyle}
                          inputStyle={styles.inputStyle}
                          onChangeText={(text) =>
                            this.setState({ customVenueName: text })
                          }
                          value={this.state.customVenueName}
                        />
                        <FormLabel
                          containerStyle={styles.labelContainer}
                          labelStyle={styles.label}
                        >
                          Venue address:
                        </FormLabel>
                        <Input
                          blurOnSubmit={false}
                          ref={(input) => {
                            this.addressTextInput = input;
                          }}
                          onSubmitEditing={() => {
                            this.addressTextInput.blur();
                          }}
                          inputStyle={styles.inputStyle}
                          containerStyle={styles.inputContainerStyle}
                          onChangeText={(text) =>
                            this.setState({ customVenueAddress: text })
                          }
                          value={this.state.customVenueAddress}
                        />
                      </View>
                      <View>
                        <View>
                          <Button
                            transparent
                            outline
                            containerViewStyle={{
                              width: "100%",
                              marginLeft: 0,
                              paddingTop: 25,
                            }}
                            buttonStyle={styles.transparentButton}
                            title={
                              this.state.gameStart
                                ? moment(this.state.gameStart).format(
                                    "DD. MMM YYYY HH:mm"
                                  )
                                : "Choose Date:"
                            }
                            onPress={this.showPicker}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                </View>

                <View style={{ paddingTop: 20 }}>
                  <Text
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "white",
                      fontSize: 16,
                      //   fontFamily: "SourceSansPro-SemiBold",
                    }}
                  >
                    Your Bookings
                  </Text>
                  {this.state.showSpinner ? (
                    <ActivityIndicator
                      size="small"
                      color="#00ff00"
                      animating={this.state.showSpinner}
                    />
                  ) : this.state.bookings.length > 0 ? (
                    <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
                      {this.state.selectedBooking !== undefined && (
                        <RNPickerSelect
                          itemStyle={{
                            color: "#808080",
                            // fontFamily: "SourceSansPro-Regular",
                          }}
                          style={bookingsPicker}
                          value={this.state.selectedBooking.id}
                          placeholder={{
                            label: "Choose Booking",
                            value: "placeholder",
                          }}
                          onValueChange={(value) => {
                            this.setState({
                              selectedPitch: value.key ? value.key : "",
                            });
                            this.handleBookingCheck(value);
                          }}
                          items={this.state.bookings.map((booking) => {
                            return {
                              key: booking.id,
                              label: `${booking.pitch.venue.name},${booking.pitch.name} at ${booking.starts_at}`,
                              value: booking.id,
                            };
                          })}
                        ></RNPickerSelect>
                      )}
                    </View>
                  ) : (
                    <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                      <Text style={styles.label}>
                        {" "}
                        You don't have bookings.{" "}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ marginTop: 20 }}>
                  <TransparentButton
                    title="Book New Pitch"
                    containerViewStyle={{ width: "100%", marginLeft: 0 }}
                    onPress={() => this.props.navigation.navigate("Venues")}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    title={!this.state.buttonLoading ? "Create game" : ""}
                    containerViewStyle={{ width: "100%", marginLeft: 0 }}
                    onPress={this.handleSubmit}
                    loading={this.state.buttonLoading}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ScrollView>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderTopWidth: 0,
    paddingLeft: 10,
    color: "rgba(112,112,112,0.5)",
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "white",
    borderRadius: 10,
    color: "rgba(112,112,112,0.5)",
  },
});
const bookingsPicker = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    marginBottom: 0,
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    color: "rgba(112,112,112,0.5)",
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginTop: 10,
    marginBottom: 0,
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    color: "rgba(112,112,112,0.5)",
  },
});
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 26,
    paddingBottom: 25,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    alignItems: "flex-start",
  },
  formContainer: {
    width: "100%",
    flex: 1,
  },
  inputStyle: {
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "100%",
  },
  label: {
    textAlign: "left",
    fontSize: 15,
    // fontFamily: "SourceSansPro-SemiBold",
    color: "white",
  },
  labelContainer: {
    marginHorizontal: -20,
    marginBottom: -10,
  },
  buttonContainer: {
    marginTop: 15,
    width: "100%",
  },
  pickerLeftContainer: {
    flex: 1,
  },
  pickerRightContainer: {
    flex: 1,
    paddingLeft: 25,
  },
  pickerLocation: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 25,
  },
  pickerStyle: {
    backgroundColor: "white",
    paddingBottom: 0,
    borderRadius: 10,
    overflow: "hidden",
    color: "rgba(112,112,112,0.5)",
  },
  placePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingBottom: 20,
  },
  inputContainerStyle: {
    width: "100%",
    marginLeft: 0,
    marginTop: 0,
  },
  navigationSection: {
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    paddingVertical: 25,
  },
  customVenueSection: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  customVenueCheck: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  customVenueData: {
    paddingVertical: 25,
  },
  segmentSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingHorizontal: 50,
  },
  activeTabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    height: 32,
    width: 220,
  },
  tabTextStyle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    // fontFamily: "SourceSansPro-SemiBold",
  },
  transparentButton: {
    paddingTop: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(CreateMatch);
