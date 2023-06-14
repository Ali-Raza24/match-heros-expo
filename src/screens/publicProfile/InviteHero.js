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
function InviteHero(props) {
  const playerId = props?.route?.params?.playerId;
  const onClickPlayerId = props?.route?.params?.onClickPlayerId;
  console.log("Player id is in invite hero List:@#@#@#", playerId);
  const gameService = new GameService();
  const [myMatches, setMyMatches] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getMyGames();
  }, []);
  const getMyGames = async () => {
    setLoading(true);
    gameService
      .getUserGames(playerId)
      .then((games) => {
        // console.log("user match is:#@#@#@", games?.data?.length);
        setMyMatches(games?.data);
        setLoading(false);
        // this.setState({
        //   myGames: games.data,
        //   myGamesRefreshing: false,
        //   loading: false,
        // });
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
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
        {/* <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}> */}
        <StatusBar backgroundColor="#5E89E2" />
        {loading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <MyGames
            refreshing={false}
            onRefresh={() => console.log("on invite players Match lists")}
            games={myMatches}
            navigation={props.navigation}
            fromInviteHeroMatch={true}
            onClickPlayerId={onClickPlayerId}
          />
        )}
        {/* <View style={{ display: "flex", width: "80%", alignSelf: "center" }}>
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
              {["Monday"].map((data, index) => (
                <LinearGradient
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: 158,
                    marginBottom: 5,
                    marginTop: 5,
                    borderRadius: 10,
                    width: "100%",
                    alignSelf: "center",
                  }}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  key={index}
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
                  <TouchableOpacity style={{ ...styles.cardStyle }}>
                    <View style={{ flex: 1, padding: 10 }}>
                      <View
                        style={{
                          ...styles.topSectionStyle,
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
                        <View style={{ ...styles.dateContainer }}>
                          <Text style={styles.dateTextStyle}>Social Game</Text>
                          <Text
                            style={{
                              ...styles.dateTextStyle,
                              fontSize: 20,
                              lineHeight: 24,
                            }}
                          >
                            Glebe North Astro
                          </Text>
                          <View style={{ marginTop: 6 }}>
                            <Text
                              style={{
                                ...styles.dateTextStyle,
                                color: "#111931",
                              }}
                            >
                              2 Players Required
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={{ position: "absolute", top: 10, right: 10 }}>
                    <LinearGradient
                      style={{
                        paddingHorizontal: 12,
                      }}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#BF9941", "#BF9941", "#BF9941"]}
                    >
                      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                        {data}
                      </Text>
                    </LinearGradient>
                  </View>
                </LinearGradient>
              ))}
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
                />
              </View>
              <GreenLinearGradientButton
                title={"Invite".toUpperCase()}
                onSelect={() => setIsModal(true)}
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={false}
                color={["#1F436E", "#4272B8"]}
              />
            </View>
            {isModal && (
              <InviteSuccessModal isModal={isModal} setIsModal={setIsModal} />
            )}
          </View> */}
        {/* </ScrollView> */}
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
export default InviteHero;
