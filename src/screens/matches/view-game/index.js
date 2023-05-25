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
import GameService from "../../../services/GameService";
import AuthService from "../../../services/AuthService";
import ImageService from "../../../services/ImageService";
import GameCard from "../MatchCard";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { connect } from "react-redux";
import { ViewGameButton } from "./button";
import SvgImage from "../../../../assets/signIn.svg";
import GreenLinearGradientButton from "../../../component/molecules/GreenLinearGradientButton";
class ViewGame extends Component {
  constructor() {
    super();
    this.GameService = new GameService();
    this.AuthService = new AuthService();
    this.ImageService = new ImageService();
    this.state = {
      game: null,
      loggedUserId: "",
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

  getGame() {
    this.setState({ refreshing: true, statLoading: true, loading: true });
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

  handleGameDelete = async (gameId) => {
    try {
      const response = await this.GameService.deleteGame(gameId);
      console.log("Game Cancel Response", response.data);

      this.props.navigation.navigate("Matches");
      Alert.alert("Game", "Game has been deleted Successfully!");
      // send push notifications -> response.data.deviceTokens
      return;
    } catch (error) {
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
    console.log("View GAME Screen", this.state.gameId);

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
        <StatusBar backgroundColor="#5E89E2" />
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
            />
          }
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
              <GameCard
                navigation={this.props.navigation}
                game={this.state.game}
                noPress={true}
              />
              <View style={{ display: "flex", marginTop: 30 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../../../assets/dollarFive.png")}
                    style={{ height: 83, width: 83, resizeMode: "contain" }}
                  />
                  <View style={{ marginLeft: 12 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 21,
                        color: "#ffffff",
                        textAlign: "left",
                      }}
                    >
                      19:00 Kick Off
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
                      4 Players Required
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ display: "flex", marginTop: 30 }}>
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
                      gameCreator: this.state?.game?.creator_id,
                    })
                  }
                  height={45}
                  loading={false}
                  color={["#1F436E", "#4272B8"]}
                />
              </View>
              {/* <View style={styles.buttonsContainer}>
                {this.renderButtons(this.state.game.id)}
              </View> */}
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(ViewGame);

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: "center",
    marginVertical: 20,
    height: 300,
  },
  deleteGameButtonStyles: {
    justifyContent: "flex-end",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 26,
    paddingVertical: 35,
  },
  infoContainer: {},
  label: {
    paddingTop: 10,
    color: "white",
    // fontFamily: "SourceSansPro-Regular",
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  bookingInfoLabel: {
    color: "white",
    // fontFamily: "SourceSansPro-Regular",
    fontSize: 16,
  },
  chartLabel: {
    color: "white",
  },
  teamName: {
    fontSize: 20,
    textAlign: "center",
    color: "#1a0000",
  },
  previewImage: {
    width: 60,
    height: 60,
    paddingBottom: 50,
  },
  statContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
