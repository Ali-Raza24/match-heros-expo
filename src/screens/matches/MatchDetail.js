import React, { Component } from "react";
import {
  View,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import { LinearGradient } from "expo-linear-gradient";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import ReportMatchModal from "../../component/molecules/ReportMatchModal";

import GameService from "../../services/GameService";
import AuthService from "../../services/AuthService";
import ImageService from "../../services/ImageService";
import { connect } from "react-redux";
import { ViewGameButton } from "../matches/view-game/button";
import { getCities, getCounty } from "../../utils/county-area";
import moment from "moment";
class MatchDetail extends Component {
  constructor() {
    super();
    this.GameService = new GameService();
    this.AuthService = new AuthService();
    this.ImageService = new ImageService();
    this.state = {
      game: null,
      loggedUserId: "",
      isModal: false,
      stats: [],
      loading: false,
      refreshing: false,
      statLoading: false,
      gameId: null,
    };
  }

  componentDidMount() {
    this.getGame();
  }
  setModal = (val) => {
    this.setState({ isModal: val });
  };
  getGame() {
    this.setState({ refreshing: true, loading: true });
    const gameId = this.props.route.params.id;
    console.log("game id in getGame Function", gameId);
    this.GameService.getGame(gameId)
      .then((game) =>
        this.setState({ game: game, loading: false, refreshing: false })
      )
      .catch((error) =>
        console.log(
          "error in getGame in view-game coomponent index file",
          error
        )
      );
    this.AuthService.getUserId()
      .then((id) => this.setState({ loggedUserId: id }))
      .catch((error) =>
        console.log("error in getGame function view-game Component", error)
      );
  }

  onRefresh = () => {
    this.getGame();
  };

  sendGameJoinRequest() {
    this.GameService.playerJoinToGame(this.state.game.id)
      .then(() => {
        Alert.alert(
          "Join request successfully sent.",
          "",
          [{ text: "OK", onPress: () => console.log("Cancel Pressed") }],
          { cancelable: false }
        );
      })
      .catch((err) => {
        console.log("error in view-game index component", err);
      });
  }

  isCreator() {
    return this.props.user.id === this.state.game.creator_id;
  }

  canSendJoinRequest() {
    return !this.isLoggedUserInGame() && this.state.game.type_id === 1;
  }

  isLoggedUserInGame = () => {
    const homeTeam =
      this.state.game.teams.length > 0
        ? [...this.state.game.teams[0].players]
        : [];
    const awayTeam =
      this.state.game.teams.length > 1
        ? [...this.state.game.teams[1].players]
        : [];
    if (homeTeam && homeTeam.length > 0) {
      return homeTeam.find((player) => player.id === this.state.loggedUserId);
    }
    if (awayTeam && awayTeam.length > 0) {
      return awayTeam.find((player) => player.id === this.state.loggedUserId);
    }
    return false;
  };
  handleGameDate() {
    let date;
    this.state.game?.booking
      ? (date = moment(this.state.game?.booking?.starts_at)
          .format("DD. MMM YYYY [at] HH:mm")
          .toString())
      : (date = moment(this.state.game?.starts_at)
          .format("DD. MMM YYYY [at] HH:mm")
          .toString());
    // date = 'Not booked';
    // date = 'Not booked';
    return date;
  }

  handleGamePitch() {
    let pitch;
    this.state.game?.booking && this.state.game?.booking?.pitch
      ? (pitch = (
          <Text>
            {this.state.game?.booking?.pitch?.venue?.name},{" "}
            {
              getCounty(Number(this.state.game?.booking?.pitch?.venue?.county))
                .name
            }{" "}
            {
              getCities(
                Number(this.state.game?.booking?.pitch?.venue?.county),
                Number(this.state.game?.booking?.pitch?.venue?.area)
              ).name
            }
          </Text>
        ))
      : (pitch = <Text>No address</Text>);
    return pitch;
  }
  handleGameDelete = async () => {
    this.setState({ statLoading: true });
    try {
      const response = await this.GameService.deleteGame(this.state.game.id);
      console.log("Game Cancel Response", response.data);
      this.setState({ statLoading: false });
      this.props.navigation.navigate("Matches");
      Alert.alert("Game", "Game has been deleted Successfully!");
      // send push notifications -> response.data.deviceTokens
      return;
    } catch (error) {
      this.setState({ statLoading: false });
      Alert.alert("Game not deleted!", "Something went wrong");
      console.log("Game Cancel Error ", error?.response?.data);
    }
  };
  acceptGameJoinReq() {
    this.GameService.confirmedInvitedPlayers(this.state.game.id)
      .then((res) => {
        Alert.alert(
          "Game Join Successfully!",
          "",
          [{ text: "OK", onPress: () => console.log("Cancel Pressed") }],
          { cancelable: false }
        );
        console.log("response of join Game is:#@#@#@", res);
      })
      .catch((err) => {
        console.log("error in view-game index component", err);
      });
  }
  renderButtons = (gameId) => {
    if (this.isCreator()) {
      return (
        <>
          <ViewGameButton
            onPress={() =>
              this.props.navigation.navigate("EditGame", { gameId: gameId })
            }
            textColor={"#2A3D68"}
            buttonBackground={"white"}
            text={"Edit Match"}
          />

          <ViewGameButton
            onPress={() =>
              this.props.navigation.navigate("GameLobby", {
                gameId: gameId,
                gameCreator: this.state.game.creator_id,
              })
            }
            textColor={"white"}
            buttonBackground={"#56C1FF"}
            text={"Enter Match Lobby"}
          />

          <ViewGameButton
            onPress={() =>
              this.props.navigation.navigate("Chat", { gameId: gameId })
            }
            textColor={"white"}
            buttonBackground={"#00AB8E"}
            text={"Match Chat"}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: 50,
              width: "80%",
            }}
          >
            <ViewGameButton
              onPress={() => this.handleGameDelete(gameId)}
              customStyles={{ width: "100%" }}
              textColor={"#EE220C"}
              buttonBackground={"#000"}
              text={"Delete Game"}
            />
          </View>
        </>
      );
    } else if (this.isLoggedUserInGame()) {
      return (
        <View style={{ marginTop: 60, width: "80%" }}>
          <ViewGameButton
            onPress={() =>
              this.props.navigation.navigate("GameLobby", {
                gameId: gameId,
                gameCreator: this.state.game.creator_id,
              })
            }
            customStyles={{ width: "100%" }}
            textColor={"white"}
            buttonBackground={"#56C1FF"}
            text={"Enter Match Lobby"}
          />

          <ViewGameButton
            onPress={() =>
              this.props.navigation.navigate("Chat", { gameId: gameId })
            }
            customStyles={{ width: "100%" }}
            textColor={"white"}
            buttonBackground={"#00AB8E"}
            text={"Match Chat"}
          />
        </View>
      );
    } else {
      return (
        <View style={{ marginTop: 60, width: "80%" }}>
          <ViewGameButton
            onPress={() =>
              this.props.navigation.navigate("GameLobby", {
                gameId: gameId,
                gameCreator: this.state.game.creator_id,
              })
            }
            customStyles={{ width: "100%" }}
            textColor={"white"}
            buttonBackground={"#56C1FF"}
            text={"Enter Match Lobby"}
          />
        </View>
      );
    }
  };
  render() {
    const showSpinner = this.state.loading;
    console.log(
      "View GAME Screen",
      this.state?.game?.id,
      this.state?.game?.numOfReqPlayers,
      this.state?.game?.starts_at.split(" ")[1],
      this.state?.game?.game_fee
    );
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
    if (!this.state.game && !this.state.loading) {
      console.log("view game in if block", this.state.game, this.state.loading);
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Game Not Found</Text>
        </View>
      );
    }
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
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{}}
            contentContainerStyle={{ flex: 1 }}
          >
            <StatusBar backgroundColor="#5E89E2" />
            <View
              style={{ display: "flex", width: "80%", alignSelf: "center" }}
            >
              {this.isCreator() ? (
                <LinearGradient
                  style={{
                    height: 158,
                    marginBottom: 5,
                    marginTop: 5,
                    borderRadius: 10,
                    width: Dimensions.get("window").width - 52,
                  }}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={[
                    "#BF9941",
                    "#E3B343",
                    "#E1AC38",
                    "#EBCA69",
                    "#F2DD86",
                    "#F7EA9C",
                    "#FAF2A8",
                    "#FBF5AD",
                    "#F9F0A6",
                    "#F5E592",
                    "#EFD373",
                    "#E9C155",
                  ].reverse()}
                >
                  <TouchableOpacity
                    key={this.state.game?.id}
                    style={{ ...this.styles.cardStyle }}
                    disabled={true}

                    // onPress={() => !this.props.noPress && this.props.navigation.navigate("ViewGame", {
                    //   id: this.props.game.id,
                    //   gameCreator: this.props.game.creator_id,
                    //   canSee: this.isPlayerInGame()
                    // })}
                  >
                    <View
                      style={{ flex: 1, padding: 10 }}
                      // source={require('../../../../assets/image/roundedGameCardBackground.png')}
                    >
                      <View
                        style={{
                          ...this.styles.line,
                          ...this.styles.topSectionStyle,
                        }}
                      >
                        <View style={{ height: 77, width: 77, zIndex: 999 }}>
                          <Image
                            source={require("../../../assets/cardLogo.png")}
                            style={{
                              height: 77,
                              width: 77,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <View style={{ ...this.styles.dateContainer }}>
                          <Text style={this.styles.dateTextStyle}>
                            {this.handleGameDate()}
                          </Text>

                          <Text style={this.styles.dateTextStyle}>
                            {this.state.game?.game_type || "Social Game"}
                          </Text>
                          <LinearGradient
                            style={{
                              marginTop: 4,
                            }}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={["#BF9941", "#BF9941", "#BF9941"].reverse()}
                          >
                            <Text
                              style={{
                                ...this.styles.dateTextStyle,
                                color: "#ffffff",
                              }}
                            >
                              {this.state.game?.numOfReqPlayers} Players
                              Required
                            </Text>
                          </LinearGradient>
                          {/* <Text style={this.styles.dateTextStyle}>2 Players Required</Text> */}
                          <View style={{ marginTop: 6 }}>
                            <Text
                              style={{
                                ...this.styles.dateTextStyle,
                                fontSize: 20,
                                lineHeight: 24,
                              }}
                            >
                              {this.state.game?.booking?.pitch?.venue?.name ||
                                "Glebe North Astro"}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={this.styles.locationContainer}>
                        <Text style={this.styles.addressTextStyle}>
                          {this.handleGamePitch()}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <LinearGradient
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: 196,
                    marginBottom: 5,
                    marginTop: 5,
                    borderRadius: 10,
                    width: "100%",
                    alignSelf: "center",
                  }}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  //   key={index}
                  colors={[
                    "#BF9941",
                    "#E3B343",
                    "#E1AC38",
                    "#EBCA69",
                    "#F2DD86",
                    "#F7EA9C",
                    "#FAF2A8",
                    "#FBF5AD",
                    "#F9F0A6",
                    "#F5E592",
                    "#EFD373",
                    "#E9C155",
                  ].reverse()}
                >
                  <View style={{ ...styles.cardStyle }}>
                    <View style={{}}>
                      <View
                        style={{
                          display: "flex",
                          borderBottomWidth: 0.8,
                          borderBottomColor: "#A7852A",
                          paddingBottom: 22,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ height: 77, width: 77, zIndex: 999 }}>
                          <Image
                            source={require("../../../assets/cardLogo.png")}
                            style={{
                              height: 77,
                              width: 77,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <View style={{ display: "flex" }}>
                          {/* <Text style={styles.dateTextStyle}>Social Game</Text> */}
                          <Text
                            style={{
                              ...styles.dateTextStyle,
                              fontSize: 20,
                              lineHeight: 24,
                            }}
                          >
                            Glebe North Astro
                          </Text>
                          {/* <View style={{marginTop:6}}>
              <Text style={{...styles.dateTextStyle,color:'#111931'}}>2 Players Required</Text>  
              </View> */}
                        </View>
                      </View>
                      <View style={{ paddingTop: 12, paddingHorizontal: 12 }}>
                        <Text
                          style={{
                            fontSize: 24,
                            lineHeight: 28,
                            fontWeight: "bold",
                          }}
                        >
                          Social Match
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#111931",
                              fontWeight: "bold",
                            }}
                          >
                            Wednesday |{" "}
                            {this.state?.game?.starts_at?.split(" ")[0]}
                          </Text>
                          <LinearGradient
                            style={{
                              height: 30,
                              width: 81,
                              borderRadius: 6,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={["#A37817", "#A37817"]}
                          >
                            <TouchableOpacity
                              style={{
                                height: 30,
                                width: 81,
                                borderRadius: 6,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => this.setState({ isModal: true })}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  color: "#ffffff",
                                }}
                              >
                                Report
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>
                        </View>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              )}
              <View style={{ display: "flex", marginTop: 30 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 83,
                      height: 83,
                      borderRadius: 50,
                      borderColor: "#E4B345",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      ${this.state?.game?.game_fee}
                    </Text>
                  </View>
                  {/* <Image
                    source={require("../../../assets/dollarFive.png")}
                    style={{ height: 83, width: 83, resizeMode: "contain" }}
                  /> */}
                  <View style={{ marginLeft: 12 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 21,
                        color: "#ffffff",
                        textAlign: "left",
                      }}
                    >
                      {this.state?.game?.starts_at?.split(" ")[1]} Kick Off
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 21,
                        fontWeight: "bold",
                        color: "#ffffff",
                        textAlign: "left",
                      }}
                    >
                      {this.state?.game?.numOfReqPlayers} Players Required
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ display: "flex", marginTop: 30 }}>
                {this.isCreator() ? null : (
                  <>
                    <GreenLinearGradientButton
                      title={"Join Match".toUpperCase()}
                      onSelect={() => this.acceptGameJoinReq()}
                      height={45}
                      loading={false}
                      color={["#0B8140", "#0A5129"]}
                    />

                    <GreenLinearGradientButton
                      title={"View Match Organiser".toUpperCase()}
                      onSelect={() =>
                        this.props.navigation.navigate("GameLobby", {
                          gameId: this.state?.game?.id,
                          gameCreator: this.state?.game?.player_ids,
                          game: this.state.game,
                        })
                      }
                      height={45}
                      loading={false}
                      color={["#1F436E", "#4272B8"]}
                    />
                  </>
                )}
                {this.isCreator() && (
                  <>
                    <GreenLinearGradientButton
                      title={"Edit Match".toUpperCase()}
                      onSelect={() => console.log("edit match called!")}
                      height={45}
                      loading={false}
                      color={["#1F436E", "#203761"]}
                    />
                    <GreenLinearGradientButton
                      title={"Delete Match".toUpperCase()}
                      onSelect={this.handleGameDelete}
                      height={45}
                      loading={this.state.statLoading}
                      color={["#CB3223", "#CB3223"]}
                    />
                  </>
                )}
              </View>
              {this.state.isModal && (
                <ReportMatchModal
                  isModal={this.state.isModal}
                  setIsModal={this.setModal}
                  gameId={this.state?.game?.id}
                />
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  styles = StyleSheet.create({
    cardStyle: {
      height: 196,
      marginBottom: 5,
      marginTop: 30,
      borderRadius: 10,
    },
    topSectionStyle: {
      flex: 4,
      flexDirection: "row",
    },
    line: {
      borderBottomWidth: 0.6,
      borderBottomColor: "#A7852A",
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: { x: 0, y: 3 },
      shadowOpacity: 2,
      shadowRadius: 3.84,
      elevation: 6,
    },
    dateTextStyle: {
      fontSize: 16,
      color: "#111931",
      marginLeft: 18,
      fontWeight: "bold",
      lineHeight: 19,
    },
    scoreStyle: {
      color: "black",
      fontSize: 30,
      //   fontFamily: 'SourceSansPro-Regular'
    },
    teamNameStyle: {
      color: "black",
      fontSize: 16,
      //   fontFamily: 'AvenirNextLTPro-Regular'
    },
    leftTeamContainer: {
      width: "40%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 10,
    },
    resultContainer: {
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    rightTeamContainer: {
      width: "40%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 10,
    },
    previewImage: {
      width: 75,
      height: 75,
    },
    teamNameContainer: {
      paddingBottom: 10,
    },
    dateContainer: {
      flex: 1,
      left: -9,
    },
    locationContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
      height: 45,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    teamsContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    addressTextStyle: {
      color: "black",
      fontSize: 14,
    },
    friendlyGameLabel: {
      fontSize: 24,
    },
    crossLine: {
      borderBottomWidth: 1,
      width: "30%",
      height: "100%",
    },
  });
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(MatchDetail);
