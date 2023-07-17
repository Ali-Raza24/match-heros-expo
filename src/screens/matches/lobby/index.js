import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import useState from "react-usestateref";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { GameTypeAndStartsAt } from "./GameTypeAndStartsAt";
import { GameAddressAndPrice } from "./GameAddressAndPrice";
import { GameOnAndCancel } from "./GameOnAndCancel";
import { PayAndConfirmedPlayers } from "./PayAndConfirmedPlayers";
import { HomeAndAwayTeamList } from "./HomeAndAwayTeam";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Loader } from "../../../component/_shared/Loader";
import { useEffect } from "react";
import GameService from "../../../services/GameService";
import { gameSizes } from "../../../utils/game-types";
import SvgImage from "../../../../assets/signIn.svg";
import FloatingButton from "../../../component/_shared/FloatingButton";
import { useSelector } from "react-redux";
const gameService = new GameService();
export const GameLobbyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  // const authServces = new AuthService();
  const gameId = route.params.gameId;
  const gameCreator = route.params.gameCreator;
  const gameObj = route.params.game;
  const [game, setGame, refGame] = useState(null);
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState();
  const [mounted, setMounted, refMounted] = useState(false);
  useEffect(() => {
    console.log("gameId is in useEffect#@#@#", gameId, gameCreator, user?.id);
    setMounted(true);
    handleGame();
    return () => {
      setMounted(false);
    };
  }, []);

  const handleGame = async () => {
    setLoading(true);
    try {
      // const regex = "/,(?!s*?[{[\"'w])/g";
      // const json = await data.replace(regex, "");
      // const dataModify = await JSON.parse(json);

      const usersList = await gameService
        .matchLobbyPlayersList()
        .catch((error) => console.log("error is:#@#@", error));

      refMounted.current && setGame(usersList?.matchLobby);
      setPlayersList([...usersList?.matchLobby]);
      setLoading(false);
    } catch (error) {
      console.log("GAME LOBBY SCREEN ERROR: ", error?.response?.data, error);
      setLoading(false);
    }
  };
  const handleNavigateToChat = () => {
    return navigation.navigate("Chat", { gameId });
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#5E89E2" />
        <Loader />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <LinearGradient style={{ flex: 1 }} colors={["#5E89E2", "#0E1326"]}> */}
      <StatusBar backgroundColor="#5E89E2" />

      {refGame.current ? (
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
          <View style={styles.container}>
            {/* Content */}
            <View style={styles.content}>
              <View style={{ paddingHorizontal: 10, flex: 1 }}>
                <View
                  style={{
                    paddingBottom: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 0.7,
                    borderBottomColor: "#203761",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 21,
                      color: "#ffffff",
                      textAlign: "center",
                    }}
                  >
                    {gameObj?.numOfReqPlayers} Heroes Required
                  </Text>
                </View>

                {refGame.current && (
                  <HomeAndAwayTeamList
                    gameStatus={refGame.current?.status}
                    gameId={gameId ? gameId : null}
                    creatorId={gameCreator}
                    teams={refGame.current?.teams}
                    playersList={playersList}
                  />
                )}
              </View>
            </View>
          </View>
          {/* </ImageBackground> */}
        </>
      ) : (
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
          <View style={styles.gameNotFoundContainer}>
            <Text style={[styles.whiteText, styles.gameNotFoundText]}>
              Player Not Found.
            </Text>
          </View>
        </>
      )}
      {gameCreator == user?.id && (
        <FloatingButton
          onPress={() =>
            navigation.navigate("InvitePlayersScreen", {
              gameId: gameId,
            })
          }
          // onPress={() => this.props.navigation.navigate('CreateGame')}
        />
      )}
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatTextContainer: {
    position: "absolute",
    top: 15,
    right: 6,
  },
  chatText: {
    color: "#4BBEFC",
    fontWeight: "400",
    fontSize: 18,
  },
  container: {
    marginTop: 14,
    flex: 1,
  },
  content: {
    paddingHorizontal: 14,
    flex: 1,
  },
  fullScreenBackgroundImage: {
    flex: 1,
    width: "99%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  fullScreenImageBackgroundOpacity: {
    opacity: 0.3,
  },
  gameSize: {
    fontSize: 18,
    textAlign: "right",
    color: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "99%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 5,
  },
  headerTitle: {
    flex: 1,
    color: "#ADAAA8",
    fontWeight: "400",
    fontSize: 18,
  },
  logo: {
    width: 100,
    height: 90,
  },
  gameNotFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameNotFoundText: {
    fontWeight: "500",
    fontSize: 20,
  },
  whiteText: {
    color: "white",
  },
});
