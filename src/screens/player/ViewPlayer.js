import React, { Component } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
  Alert,
} from "react-native";
import { ListItem, Text } from "react-native-elements";
import PlayerService from "../../services/PlayerService";
import config from "../../../config";
import ImageService from "../../services/ImageService";
import moment from "moment";
import TeamService from "../../services/TeamService";
import HeaderView from "../../component/_shared/HeaderView";
import TransparentButton from "../../component/_shared/TransparentButton";
import PrimaryButton from "../../component/_shared/PrimaryButton";
import { LinearGradient } from "expo-linear-gradient";
// import BadgeIcon from "../../_shared/BadgeIcon";
// import { getStatusBarHeight } from "react-native-status-bar-height";
import Colors from "../../../assets/Colors";
import { STATUSES } from "../../utils/game/invite-status";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
class ViewPlayer extends Component {
  constructor(props) {
    super(props);
    this.teamImagesUrl = config.TEAM_IMAGES_URL;
    this.PlayerService = new PlayerService();
    this.ImageService = new ImageService();
    this.TeamService = new TeamService();
    this.state = {
      playerId: "",
      name: "",
      email: "",
      avatar_image: null,
      cover_image: null,
      cover: "",
      dob: "",
      county_id: "",
      city_id: "",
      city: "",
      county: "",
      id: "",
      teams: [],
      refreshing: false,
      addPlayerObj: {
        text: "Add Player",
        loading: false,
        status: "",
      },
    };
  }

  componentDidMount() {
    const id = this.props.route.params.id;
    this.setState({ playerId: id }, () => {
      this.getPlayer();
      this.getPlayerTeams();
    });
    if (id) {
      this.checkIfUserAlreadySentTeammateInvitationToPlayer(id);
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getPlayer().then(() => this.setState({ refreshing: false }));
  };

  getPlayer() {
    return this.PlayerService.getPlayer(this.state.playerId)
      .then((response) => {
        this.setUser(response);
        console.log("view players response from api", response.name);
      })
      .catch((error) => {
        console.log("Api call error", error.response);
      });
  }

  getPlayerTeams() {
    this.TeamService.getUserTeams(this.state.playerId)
      .then((userTeams) => this.setState({ teams: userTeams }))
      .catch((error) => {
        console.log("Api call error", error.response);
      });
  }

  setUser(data) {
    console.log("date in player profile is:!.....", data?.dob);
    this.setState({
      name: data.name,
      email: data.email,
      id: data.id,
      avatar_image: data.images.avatar,
      cover_image: data.images.cover,
      cover: data.images.cover,
      dob: moment(new Date(data?.dob)).year(),
      city_id: data.location ? data.location.city.id : "",
      county_id: data.location ? data.location.county.id : "",
      city: data.location ? data.location.city.name : "",
      county: data.location ? data.location.county.name : "",
    });
  }

  playerInfo = () => {
    const list = [
      {
        title: this.state.dob ? this.state.dob : "Year of Birth",
        icon: (
          <Image
            source={require("../../../assets/image/calendar.png")}
            style={{ width: 16, height: 16, marginRight: 22 }}
          />
        ),
      },
      {
        title:
          this.state.county && this.state.city
            ? `${this.state.county}, ${this.state.city}`
            : "Location",
        icon: (
          <Image
            source={require("../../../assets/image/location.png")}
            style={{ width: 16, height: 16, marginRight: 22 }}
          />
        ),
      },
    ];

    return (
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            // title={item.title}
            // titleStyle={{
            //   color: "white",
            //   fontSize: 16,
            //   fontFamily: "SourceSansPro-Regular",
            // }}
            // leftIcon={item.icon}
            // hideChevron
            containerStyle={{
              paddingTop: 15,
              paddingBottom: 15,
              borderBottomColor: "rgba(255,255,255,0.35)",
            }}
          >
            <ListItem.Content>
              <ListItem.Title
                style={{
                  color: "white",
                  fontSize: 16,
                }}
              >
                {item?.title}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron size={22} />
          </ListItem>
        ))}
      </View>
    );
  };

  addPlayerAsTeammate = async (playerId) => {
    try {
      this.setState({
        addPlayerObj: { ...this.state.addPlayerObj, loading: true },
      });
      const response = await this.PlayerService.addPlayerAsTeammate(playerId);
      Alert.alert(response.data.message);
      this.setState({
        addPlayerObj: {
          loading: false,
          text: "Request Pending",
          status: STATUSES.PENDING,
        },
      });
      return;
    } catch (error) {
      console.log("addPlayerAsTeammate Error", error?.response?.data);
    }
  };

  checkIfUserAlreadySentTeammateInvitationToPlayer = async (playerId) => {
    console.log("PlayerID in ViewPlayer Component", playerId);
    this.setState({
      addPlayerObj: { ...this.state.addPlayerObj, loading: true },
    });
    try {
      const response = await this.PlayerService.sentPlayerRequestStatus(
        playerId
      );
      console.log("sent Player Request status", response.status);
      if (response.data.status === STATUSES.PENDING) {
        this.setState({
          addPlayerObj: {
            ...this.state.addPlayerObj,
            text: "Pending",
            loading: false,
          },
        });
        return;
      }
      if (response.data.status === STATUSES.ACCEPTED) {
        this.setState({
          addPlayerObj: {
            ...this.state.addPlayerObj,
            text: "Delete Player",
            loading: false,
          },
        });
        return;
      }
    } catch (error) {
      console.log(
        "checkIfUserAlreadySentTeammateInvitationToPlayer ERROR",
        error?.response?.data
      );
    }
    this.setState({
      addPlayerObj: { ...this.state.addPlayerObj, loading: false },
    });
  };

  handleAddTeammate = async (playerId) => {
    if (!this.state.addPlayerObj.status) {
      this.addPlayerAsTeammate(playerId);
      return;
    }
    // Perform actions on differnt status
  };

  render() {
    const showSpinner = this.state.name === "";
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
          <LinearGradient
            style={{ flex: 1, width: "100%" }}
            colors={["#5E89E2", "#0E1326"]}
          >
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
          </LinearGradient>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" translucent />
          <HeaderView
            cover={
              this.state.cover
                ? this.ImageService.getCoverUri(this.state.cover)
                : this.ImageService.getCoverUri("cover1.png")
            }
            avatar={require("../../../assets/image/default_avatar.jpg")}
            // avatar={this.ImageService.getPlayerAvatarUri(
            //   this.state.avatar_image,
            //   this.state.id
            // )}
            title={this.state.name ? this.state.name : " "}
            // subtitle={this.state.email? this.state.email:' '}
          />
          <LinearGradient style={{ flex: 1 }} colors={["#4A7ADD", "#0E1326"]}>
            <View style={styles.mainContainer}>
              <View style={styles.info}>{this.playerInfo()}</View>

              <View>
                <Text style={styles.label}>Teams:</Text>
                <FlatList
                  horizontal={true}
                  listEmptyComponent={
                    <Text style={{ color: "white" }}>
                      There are no matches today.
                    </Text>
                  }
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  style={{
                    backgroundColor: "transparent",
                    marginTop: 5,
                    flexGrow: 0,
                  }}
                  data={this.state.teams}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.singleTeam}
                      onPress={() =>
                        this.props.navigation.push("ViewTeam", { id: item.id })
                      }
                    >
                      <Image
                        source={require("../../../assets/image/default_avatar.jpg")}
                        // source={this.ImageService.getTeamUriImage(
                        //   item.id,
                        //   item.images.logo
                        // )}
                        style={styles.previewImage}
                      />
                      <Text style={{ ...styles.label, textAlign: "center" }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              <View style={styles.buttons}>
                <View style={styles.buttonContainer}>
                  <TransparentButton
                    containerViewStyle={{ width: "100%" }}
                    onPress={() =>
                      this.props.navigation.push("ProfileTransferTokens", {
                        playerId: this.state.id,
                      })
                    }
                    title="Transfer Credits"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    containerViewStyle={{ width: "100%" }}
                    onPress={() => {
                      console.log(
                        "on Click Player to sent invite",
                        this.state.name
                      );
                      this.props.navigation.navigate(
                        "InvitePlayerFromProfile",
                        {
                          name: this.state.name,
                          id: this.state.id,
                        }
                      );
                    }}
                    title="Invite Player"
                  />
                  {this.state.id !== this.props.currentUserId && (
                    <PrimaryButton
                      containerViewStyle={{ width: "100%", marginTop: 10 }}
                      backgroundColor={Colors.green}
                      onPress={() => this.handleAddTeammate(this.state.id)}
                      loading={this.state.addPlayerObj.loading}
                      title={this.state.addPlayerObj.text}
                    />
                  )}
                </View>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user?.id,
  };
};
export default connect(mapStateToProps)(ViewPlayer);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    paddingHorizontal: 26,
  },
  playerInfoContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 11,
    marginRight: 11,
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 5,
  },
  info: {
    paddingVertical: 25,
  },
  label: {
    color: "white",
    fontSize: 16,
    // fontFamily: "SourceSansPro-Regular",
  },
  teams: {
    height: 95,
    paddingVertical: 10,
  },
  previewImage: {
    width: 60,
    height: 60,
  },
  singleTeam: {
    width: 76,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    marginBottom: 14,
  },
});
