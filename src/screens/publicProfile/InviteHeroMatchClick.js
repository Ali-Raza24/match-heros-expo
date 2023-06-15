import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import { LinearGradient } from "expo-linear-gradient";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import InviteSuccessModal from "../../component/molecules/InviteSuccessModal";
import GameService from "../../services/GameService";
import MyGames from "../matches/MyMatch";
import moment from "moment";
import { getCities, getCounty } from "../../utils/county-area";
function InviteHeroMatchClick(props) {
  const game = props?.route?.params?.game;
  const onClickPlayerId = props?.route?.params?.onClickPlayerId;
  const gameService = new GameService();
  const [myMatches, setMyMatches] = useState([]);
  const [matchFee, setMatchFee] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  //   useEffect(() => {
  //     getMyGames();
  //   }, []);
  //   const getMyGames = async () => {
  //     setLoading(true);
  //     gameService
  //       .getUserGames(playerId)
  //       .then((games) => {
  //         console.log("user match is:#@#@#@", games?.data);
  //         setMyMatches(games?.data);
  //         setLoading(false);
  //         // this.setState({
  //         //   myGames: games.data,
  //         //   myGamesRefreshing: false,
  //         //   loading: false,
  //         // });
  //       })
  //       .catch((err) => {
  //         console.log("err", err);
  //         setLoading(false);
  //       });
  //   };

  const handleInvitePlayerInvitation = async () => {
    setLoading(true);
    const data = {
      game_id: game?.id,
      inviteeable_id: onClickPlayerId,
      fee: matchFee,
    };
    console.log("data before calling invitePlayerToMatch API is :@!@!@", data);
    gameService
      .inviteHeroToMatch(data)
      .then(() => {
        setIsModal(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        alert("Something went wrong!");
      });
  };
  const handleGameDate = () => {
    let date;
    game?.booking
      ? (date = moment(game?.booking?.starts_at)
          .format("DD. MMM YYYY [at] HH:mm")
          .toString())
      : (date = moment(game?.starts_at)
          .format("DD. MMM YYYY [at] HH:mm")
          .toString());
    // date = 'Not booked';
    // date = 'Not booked';
    return date;
  };

  const handleGamePitch = () => {
    let pitch;
    game?.booking && game?.booking?.pitch
      ? (pitch = (
          <Text>
            {game?.booking?.pitch?.venue?.name},{" "}
            {getCounty(Number(game?.booking?.pitch?.venue?.county)).name}{" "}
            {
              getCities(
                Number(game?.booking?.pitch?.venue?.county),
                Number(game?.booking?.pitch?.venue?.area)
              ).name
            }
          </Text>
        ))
      : (pitch = <Text>No address</Text>);
    return pitch;
  };
  const callBack = () => {
    props.navigation.goBack();
  };
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

          <View style={{ display: "flex", width: "80%", alignSelf: "center" }}>
            <View style={{ width: "100%", marginTop: 22 }}>
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 34,
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                Choose Match
              </Text>
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
                  key={game?.id}
                  style={{ ...styles.cardStyle }}
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
                    <View style={{ ...styles.line, ...styles.topSectionStyle }}>
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
                      <View style={{ ...styles.dateContainer }}>
                        <Text style={styles.dateTextStyle}>
                          {handleGameDate()}
                        </Text>

                        <Text style={styles.dateTextStyle}>
                          {game?.game_type || "Social Game"}
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
                              ...styles.dateTextStyle,
                              color: "#ffffff",
                            }}
                          >
                            {game?.numOfReqPlayers} Players Required
                          </Text>
                        </LinearGradient>
                        {/* <Text style={this.styles.dateTextStyle}>2 Players Required</Text> */}
                        <View style={{ marginTop: 6 }}>
                          <Text
                            style={{
                              ...styles.dateTextStyle,
                              fontSize: 20,
                              lineHeight: 24,
                            }}
                          >
                            {game?.booking?.pitch?.venue?.name ||
                              "Glebe North Astro"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.locationContainer}>
                      <Text style={styles.addressTextStyle}>
                        {handleGamePitch()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "center",
                  marginTop: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#ffffff",
                    lineHeight: 29,
                    fontSize: 16,
                  }}
                >
                  Fee
                </Text>
                <TextInput
                  style={{
                    height: 45,
                    width: "100%",
                    backgroundColor: "#414B76",
                    borderRadius: 6,
                    textAlign: "center",
                    color: "#ffffff",
                  }}
                  keyboardType="number-pad"
                  onChangeText={(text) => setMatchFee(text)}
                />
              </View>
              <GreenLinearGradientButton
                title={"Invite".toUpperCase()}
                onSelect={handleInvitePlayerInvitation}
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={false}
                color={["#1F436E", "#4272B8"]}
              />
            </View>
            {isModal && (
              <InviteSuccessModal
                isModal={isModal}
                setIsModal={setIsModal}
                callBack={callBack}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  cardStyle: {
    height: 158,
    marginBottom: 5,
    marginTop: 5,
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
export default InviteHeroMatchClick;
