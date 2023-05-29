import React, { Component } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";
import PlayerService from "../../services/PlayerService";
import config from "../../../config";
import ImageService from "../../services/ImageService";
import moment from "moment";
import TeamService from "../../services/TeamService";
import { STATUSES } from "../../utils/game/invite-status";
import SvgImage from "../../../assets/signIn.svg";
import { LinearGradient } from "expo-linear-gradient";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import { connect } from "react-redux";
class PublicProfile extends Component {
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
    } else {
      alert("Invitation already sent!");
    }
    // Perform actions on differnt status
  };

  render() {
    const routes = this.props.navigation.getState()?.routes;
    const prevRoute = routes[routes?.length - 2];
    console.log("prevRoutes is:#@#@#@# Heros", prevRoute?.name);
    console.log("country and city is:", this.state.county, this.state.city);
    return (
      <>
        <SvgImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 16,
            bottom: 0,
          }}
        />
        <SafeAreaView
          style={{ flex: 1, height: Dimensions.get("window").height }}
        >
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
            <StatusBar backgroundColor="#5E89E2" />
            <View style={{ flex: 1, marginBottom: 12 }}>
              <View
                style={{
                  flex: 0.33,
                  marginTop: 14,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "80%",
                  alignSelf: "center",
                }}
              >
                <Image
                  source={require("../../../assets/cardLogo.png")}
                  style={{ height: 134, width: 134, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 29,
                    color: "#ffffff",
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  {this.state.name || "James Haley"}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.4,
                  width: "80%",
                  alignSelf: "center",
                  marginTop: 34,
                }}
              >
                {[
                  { title: "Matches Played", value: "8" },
                  { title: "Matches Organized", value: "3" },
                  { title: "Preferred age of opponents", value: "28-40" },
                ].map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      height: 45,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTopWidth: 0.5,
                      borderColor: "#ffffff",
                      borderBottomWidth: 0.5,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {/* <Image source={require('../../../assets/tokenStack.png')} style={{resizeMode:'contain',height:22,width:22}}/> */}
                      <Text
                        style={{
                          fontSize: 15,
                          lineHeight: 19,
                          fontWeight: "bold",
                          color: "#ffffff",
                          textAlign: "left",
                        }}
                      >
                        {data.title}
                      </Text>
                    </View>
                    <LinearGradient
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 9,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 4,
                      }}
                      colors={["#0B8140", "#0A5129"]}
                    >
                      <Text style={{ color: "#ffffff" }}>{data.value}</Text>
                    </LinearGradient>
                    {/* <Image source={require('../../../assets/leftArrow.png')} style={{resizeMode:'contain',height:14,width:14}}/> */}
                  </TouchableOpacity>
                ))}
                <View style={{ display: "flex", marginTop: 6 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      lineHeight: 49,
                      color: "#ffffff",
                    }}
                  >
                    Location:{" "}
                    {this.state.county + " " + this.state.city || "Location"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      lineHeight: 19,
                      color: "#ffffff",
                    }}
                  >
                    Prefered Location:{" "}
                    {this.state.county + " " + this.state.city || "Location"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flex: 0.27,
                  width: "80%",
                  alignSelf: "center",
                }}
              >
                <GreenLinearGradientButton
                  title={"Invite Hero to Match".toUpperCase()}
                  onSelect={() => this.props.navigation.navigate("InviteHero")}
                  // onSelect={() => this.props.navigation.navigate("Profile")}
                  height={45}
                  loading={false}
                  color={["#1E2646", "#1E2646"]}
                />
                {prevRoute?.name == "Heros" && (
                  <GreenLinearGradientButton
                    title={"Add as Teammate".toUpperCase()}
                    onSelect={() => this.handleAddTeammate(this.state.id)}
                    // onSelect={() => props.navigation.navigate("InviteHero")}
                    // onSelect={() => this.props.navigation.navigate("Profile")}
                    height={45}
                    loading={false}
                    color={["#0B8140", "#0A5129"]}
                  />
                )}
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ marginTop: 16 }}
                  onPress={() =>
                    this.props.navigation.navigate("TransferPayment")
                  }
                >
                  <Image
                    source={require("../../../assets/transferLogoButton.png")}
                    style={{ resizeMode: "contain", width: "100%", height: 45 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUserId: state.user?.id,
  };
};
export default connect(mapStateToProps)(PublicProfile);
