import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
  Dimensions,
} from "react-native";
import { ListItem, Avatar, Text } from "react-native-elements";
import TeamService from "../../services/TeamService";
import AuthService from "../../services/AuthService";
import MyText from "../../component/_shared/MyText";
import ImageService from "../../services/ImageService";
import HeaderView from "../../component/_shared/HeaderView";
// import BadgeIcon from "../../_shared/BadgeIcon";
import PrimaryButton from "../../component/_shared/PrimaryButton";
import TransparentButton from "../../component/_shared/TransparentButton";
import DeleteButton from "../../component/_shared/DeleteButton";
import { connect } from "react-redux";
import TextBold from "../../component/_shared/TextBold";
import SvgImage from "../../../assets/signIn.svg";
const { width, height } = Dimensions.get("window");

class ViewTeam extends Component {
  constructor(props) {
    super(props);
    this.TeamService = new TeamService();
    this.AuthService = new AuthService();
    this.ImageService = new ImageService();
    this.state = {
      captain: {},
      players: [],
      team: null,
      captainId: "",
      teamId: "",
      refreshing: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.pop(2);
    return true;
  };

  componentDidMount() {
    this.getTeam();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getTeam().then(() => this.setState({ refreshing: false }));
  };

  getTeam() {
    const teamId = this.props.route.params.id;
    return this.TeamService.getTeam(teamId)
      .then((res) => {
        console.log(res);
        this.setState({
          captain: res.captain,
          players: res.players,
          team: res.team,
          teamId: teamId,
        });
      })
      .catch((err) => {
        this.setState({ teamNotFound: true });
        console.log(err.response ? err.response.data : err);
      });
  }

  getUriImage(imageUrl, id, type) {
    if (type === "profile")
      return { uri: `${this.profileImagesUrl}${id}/${imageUrl}` };
    else
      return imageUrl != null
        ? { uri: `${this.teamImagesUrl}${id}/${imageUrl}` }
        : require("../../../assets/image/betaLogo.png");
  }

  captainTitle(id) {
    return this.state.captain.id == id ? "captain" : " ";
  }

  toggleAditionalMenu(index) {
    if (this.props.user.id === this.state.captain.id) {
      let statePlayers = this.state.players;
      statePlayers[index].showAditionalInfo =
        !statePlayers[index].showAditionalInfo;
      this.setState({ players: statePlayers });
    }
  }

  setCaptain(player) {
    this.TeamService.setCaptain(this.state.teamId, player.id)
      .then((res) => {
        alert(res.message);
        player.showAditionalInfo = false;
        this.setState({ captain: player });
      })
      .catch((error) => {
        console.log("Api call error", error.response);
      });
  }

  canSendRequest() {
    let counter = this.state.players.filter(
      (player) => this.props.user.id === player.id
    ).length;
    return counter <= 0;
  }

  isCaptain() {
    return this.state.captain.id === this.props.user.id;
  }

  sendTeamJoinRequest() {
    Alert.alert(
      `Join Team`,
      "Are you sure you want to join team?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes, join",
          onPress: () => {
            this.TeamService.playerJoinToTeam(this.state.team.id)
              .then((res) => {
                Alert.alert(
                  "Join request successfully sent.",
                  "",
                  [
                    {
                      text: "OK",
                      onPress: () => {},
                    },
                  ],
                  { cancelable: false }
                );
              })
              .catch((err) => {
                console.log("error", err.response);
              });
          },
        },
      ],
      { cancelable: false }
    );
  }

  handleOnNavigateBack = () => {
    this.getTeam();
  };

  deleteTeam = () => {
    Alert.alert(
      `Delete Team`,
      "Are you sure you want to delete team?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes, delete",
          onPress: () => {
            this.TeamService.delete(this.state.teamId).then((response) => {
              Alert.alert(
                `${response.data.message}`,
                "You will navigate to Dashboard to continue enjoy in Find A Five",
                [
                  {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("Dashboard"),
                  },
                ],
                { cancelable: false }
              );
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const showSpinner = this.state.team ? false : true;
    if (showSpinner) {
      return (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgImage
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 16,
              bottom: 0,
            }}
          />
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              size={50}
              color="#2b87ff"
              animating={this.state.loading}
            />
          </View>
        </View>
      );
    }
    if (this.state.teamNotFound) {
      return (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgImage
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 16,
              bottom: 0,
            }}
          />
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextBold
              style={{ color: "white", fontSize: 25, textAlign: "center" }}
              text="This team is not available any more."
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <SvgImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 16,
            bottom: 0,
          }}
        />
        <StatusBar backgroundColor="transparent" translucent />
        <HeaderView
          cover={
            this.state.team.images.cover
              ? this.ImageService.getCoverUri(this.state.team.images.cover)
              : this.ImageService.getCoverUri("cover1.png")
          }
          avatar={this.ImageService.getTeamUriImage(
            this.state.team.id,
            this.state.team.images.logo
          )}
          title={this.state.team ? this.state.team.name : ""}
        />
        <ScrollView style={styles.mainContainer}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.teamInfoContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(255,255,255,0.35)",
                }}
              >
                <Image
                  source={require("../../../assets/image/location.png")}
                  style={{ width: 16, height: 16, marginHorizontal: 10 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    // fontFamily: "SourceSansPro-Regular",
                    color: "white",
                  }}
                >
                  {this.state.team
                    ? this.state.team.location != null
                      ? `${this.state.team.location.county.name}, ${this.state.team.location.city.name}`
                      : ""
                    : ""}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingHorizontal: 26,
                paddingBottom: 20,
                borderBottomColor: "rgba(255,255,255,0.35)",
                borderBottomWidth: 1,
              }}
            >
              {this.isCaptain() && (
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    containerViewStyle={{ width: "100%" }}
                    onPress={() =>
                      this.props.navigation.push("InvitePlayerToTeam", {
                        id: this.state.team.id,
                        teamPlayers: this.state.players,
                      })
                    }
                    title="Invite Players"
                  />
                </View>
              )}
              {this.isCaptain() && (
                <View style={styles.buttonContainer}>
                  <TransparentButton
                    containerViewStyle={{ width: "100%" }}
                    onPress={() =>
                      this.props.navigation.push("TeamJoinRequests", {
                        id: this.state.team.id,
                        onNavigateBack: this.handleOnNavigateBack,
                      })
                    }
                    title="Join Requests"
                  />
                </View>
              )}
              {this.isCaptain() && (
                <View style={styles.buttonContainer}>
                  <TransparentButton
                    containerViewStyle={{ width: "100%" }}
                    onPress={() =>
                      this.props.navigation.push("TeamInvites", {
                        id: this.state.team.id,
                      })
                    }
                    title="Team Invites"
                  />
                </View>
              )}
              {this.isCaptain() && (
                <View style={styles.buttonContainer}>
                  <TransparentButton
                    containerViewStyle={{ width: "100%" }}
                    onPress={() =>
                      this.props.navigation.push("EditTeam", {
                        id: this.state.team.id,
                        onNavigateBack: this.handleOnNavigateBack,
                      })
                    }
                    title="Edit Team"
                  />
                </View>
              )}
              {this.canSendRequest() && (
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    containerViewStyle={{ width: "100%" }}
                    onPress={() => this.sendTeamJoinRequest()}
                    title="Send Join Request"
                  />
                </View>
              )}

              {this.isCaptain() && (
                <View style={styles.buttonContainer}>
                  <DeleteButton
                    containerViewStyle={{ width: "100%" }}
                    onPress={this.deleteTeam}
                    title="Delete Team"
                  />
                </View>
              )}
            </View>
            <View style={styles.textPlayersContainer}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  // fontFamily: "SourceSansPro-Regular",
                }}
              >
                Players
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "transparent",
                paddingHorizontal: 26,
                paddingBottom: 30,
              }}
            >
              <FlatList
                style={{ backgroundColor: "transparent" }}
                data={this.state.players}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      borderBottomColor: "rgba(255,255,255,0.35)",
                      borderBottomWidth: 1,
                    }}
                  >
                    <ListItem
                      //   avatar={this.ImageService.getPlayerAvatarUri(item.images.avatar, item.id)}
                      //   avatarStyle={{ borderWidth: 0, width: 60, height: 60, resizeMode: 'contain' }}
                      containerStyle={{
                        alignItems: "center",
                        backgroundColor: "transparent",
                        borderBottomWidth: 0,
                        paddingRight: 0,
                        justifyContent: "center",
                        paddingTop: 10,
                        flex: 1,
                        paddingBottom: 10,
                        height: 100,
                      }}
                      key={item.id}
                      //   title={item.name}
                      //   rightTitle={this.captainTitle(item.id)}
                      //   subtitleContainerStyle={{ paddingLeft: 15 }}
                      //   titleContainerStyle={{ paddingLeft: 15 }}

                      //   subtitle={item.location ? `${item.location.county.name}, ${item.location.city.name}` : ""}
                      onPress={() => this.toggleAditionalMenu(index)}
                      //   onPressRightIcon={() => this.props.navigation.push("ViewPlayer", {
                      //     id: item.id,
                      //     navTo: "ViewTeam"
                      //   })}
                    >
                      <Avatar
                        containerStyle={{
                          borderRadius: 30,
                          width: 60,
                          height: 60,
                          //  resizeMode: "contain",
                        }}
                        avatarStyle={{
                          borderRadius: 30,
                          width: 60,
                          height: 60,
                          resizeMode: "contain",
                        }}
                        source={require("../../../assets/image/default_avatar.jpg")}
                        //  source={ this.ImageService.getPlayerAvatarUri(item.avatar, item.id)}
                      />
                      <ListItem.Content>
                        <ListItem.Title
                          style={{ color: "white", fontSize: 16 }}
                        >
                          {item?.name}
                        </ListItem.Title>
                        <ListItem.Title
                          style={{
                            textAlign: "right",
                            color: "#ffffff",
                            fontSize: 14,
                          }}
                        >
                          {this.captainTitle(item.id)}
                        </ListItem.Title>
                        <ListItem.Subtitle
                          style={{
                            color: "white",
                            fontSize: 14,
                            fontWeight: "normal",
                          }}
                        >
                          {item?.location
                            ? `${item?.location?.county?.name}, ${item?.location?.city?.name}`
                            : ""}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Chevron
                        color={"#0B8140"}
                        size={28}
                        style={{ color: "#ffffff", alignSelf: "center" }}
                        onPress={() =>
                          this.props.navigation.push("ViewPlayer", {
                            id: item.id,
                            navTo: "ViewTeam",
                          })
                        }
                      />
                    </ListItem>
                    {item.showAditionalInfo && (
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: "transparent",
                          justifyContent: "space-around",
                          height: 40,
                        }}
                      >
                        <MyText
                          myStyle={styles.textMakeCaptain}
                          onPress={() =>
                            Alert.alert(
                              "Are you sure? ",
                              "",
                              [
                                {
                                  text: "Cancel",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel",
                                },
                                {
                                  text: "OK",
                                  onPress: () => this.setCaptain(item),
                                },
                                // {text: 'OK', onPress: null},
                              ],
                              { cancelable: false }
                            )
                          }
                        >
                          Make captain
                        </MyText>
                        <MyText
                          myStyle={styles.textRemove}
                          onPress={() =>
                            Alert.alert(
                              "Are you sure?",
                              "",
                              [
                                {
                                  text: "OK",
                                  onPress: () => {
                                    this.TeamService.removePlayerFromTeam(
                                      this.state.team.id,
                                      item.id
                                    )
                                      .then(
                                        (res) => {
                                          Alert.alert(
                                            "Player successfully removed",
                                            "",
                                            [
                                              {
                                                text: "Ok",
                                                onPress: () => {},
                                                style: "cancel",
                                              },
                                            ],
                                            { cancelable: false }
                                          );
                                        },
                                        (err) => {
                                          console.log(err.response.data);
                                          Alert.alert(
                                            "Error occurred while removing player.",
                                            "",
                                            [
                                              {
                                                text: "Ok",
                                                onPress: () => {},
                                                style: "cancel",
                                              },
                                            ],
                                            { cancelable: false }
                                          );
                                        }
                                      )
                                      .catch((err) => {
                                        console.log(err.response.data);
                                        Alert.alert(
                                          "Error occurred while removing player.",
                                          "",
                                          [
                                            {
                                              text: "Ok",
                                              onPress: () => {},
                                              style: "cancel",
                                            },
                                          ],
                                          { cancelable: false }
                                        );
                                      });
                                  },
                                },
                                {
                                  text: "Cancel",
                                  onPress: () => {},
                                  style: "cancel",
                                },
                              ],
                              { cancelable: false }
                            )
                          }
                        >
                          Remove
                        </MyText>
                      </View>
                    )}
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.props.handleLoadMore}
                onEndReachedThreshold={0.1}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  teamInfoContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 26,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  textPlayersContainer: {
    paddingHorizontal: 26,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  textMakeCaptain: {
    color: "#57B0F0",
    fontSize: 14,
    textAlign: "center",
  },
  textRemove: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(ViewTeam);
