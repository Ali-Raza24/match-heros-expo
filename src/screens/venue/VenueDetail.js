import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import TwoWaySlider from "../../component/molecules/TwoWaySlider";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import { gameTypes } from "../../utils/game-types";
import GameCard from "../matches/MatchCard";
import GameService from "../../services/GameService";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
const singleGameData = {
  avg_game_players: null,
  block_booking_id: null,
  booking: {
    block_booking_id: null,
    created_at: "2022-05-06 08:43:36",
    description: null,
    game_id: 3,
    id: 4201,
    interval: 1,
    pitch: {
      created_at: "2022-05-06 08:43:36",
      deleted_at: null,
      details: null,
      id: 1963,
      name: "Glebe north",
      size: null,
      updated_at: "2022-05-06 08:43:36",
      venue: {
        address: "Balbriggan",
        allow_reservation: 1,
        area: null,
        city: {
          county: {
            id: 9,
            name: "Dublin",
          },
          county_id: 9,
          id: 565,
          name: "Balbriggan",
        },
        city_id: 565,
        coordinates: null,
        county: null,
        created_at: "2022-05-06 08:43:36",
        custom_venue: 1,
        deleted_at: null,
        description: null,
        email: null,
        id: 1963,
        image: null,
        name: "Glebe north",
        phone: null,
        surface_type: null,
        terms: null,
        updated_at: "2022-05-06 08:43:36",
        user_id: 36,
        working_hours: null,
      },
      venue_id: 1963,
    },
    pitch_id: 1963,
    starts_at: "2022-05-18 10:00:00",
    status: 0,
    updated_at: "2022-05-06 08:43:36",
    user_id: 36,
  },
  booking_id: 4201,
  conversation: {
    conversationable_id: 3,
    conversationable_type: "game",
    created_at: "2022-05-06 08:43:36",
    id: 3,
    messages: [
      {
        body: "Excellent",
        conversation_id: 3,
        created_at: "2022-05-06 17:47:54",
        id: 3,
        updated_at: "2022-05-06 17:47:54",
        user: {
          avatar: null,
          city: null,
          id: 36,
          name: "John Doe",
        },
        user_id: 36,
      },
      {
        body: "Does thiswork",
        conversation_id: 3,
        created_at: "2022-05-06 08:46:07",
        id: 1,
        updated_at: "2022-05-06 08:46:07",
        user: {
          avatar: null,
          city: null,
          id: 36,
          name: "John Doe",
        },
        user_id: 36,
      },
    ],
    name: "Match Lobby",
    updated_at: "2022-05-06 08:43:36",
  },
  created_at: "2022-05-06 08:43:36",
  creator_id: 36,
  fee_method: null,
  fee_type: null,
  game_fee: "",
  game_repeat: 0,
  game_size: "",
  game_speed: null,
  game_type: "",
  id: 3,
  match_duration: 0,
  starts_at: "2022-05-18 10:00:00",
  status: "accepted",
  teams: [
    {
      city_id: null,
      cover: "cover1.png",
      email: null,
      id: 11,
      is_temp: 1,
      logo: null,
      name: "Home",
      phone: null,
      pivot: {
        game_id: 3,
        home: 1,
        team_id: 11,
      },
      players: [
        {
          availability: null,
          avatar: null,
          city: null,
          city_id: null,
          cover: null,
          created_at: "2022-04-28 09:49:52",
          device_token:
            "fs0QMblURTWdZ-a2nw21Z7:APA91bGCdgIs7Io95_K9PtPZdZfVgpC8d1ysezWm3yApSFiLg0KVW3w5yhrK-ohB1zHWpH7EOWlTBllH5HUZHSju8KQfiOWt_Q-J3F0rDWWsSwG0lkKQoWnKduxKEg4tKFEG5h2WWQ_v",
          device_type: "android",
          dob: null,
          email: "johndoe@gmail.com",
          email_verified_at: null,
          id: 36,
          name: "John Doe",
          pivot: {
            is_captain: 0,
            team_id: 11,
            user_id: 36,
          },
          role_id: 1,
          tokens: 0,
          updated_at: "2022-05-16 10:49:49",
        },
      ],
      user_id: null,
    },
    {
      city_id: null,
      cover: "cover1.png",
      email: null,
      id: 12,
      is_temp: 1,
      logo: null,
      name: "Away",
      phone: null,
      pivot: {
        game_id: 3,
        home: 0,
        team_id: 12,
      },
      players: [],
      user_id: null,
    },
  ],
  tournament_id: null,
  type_id: 1,
  updated_at: "2022-05-06 08:43:36",
  venue_id: null,
};
function VenueDetail(props) {
  const gameService = new GameService();
  const [loading, setLoading] = useState(false);
  const [openGameType, setOpenGameType] = useState(false);
  const [matchValue, setMatchValue] = useState();
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [games, setGames] = useState([]);

  const [startDateTime, setStartDateTime] = useState();
  const [startDateTimeTitle, setStartDateTimeTitle] = useState();
  const [dateTimestates, setStartDateTimeState] = useState({
    isVisibleDatePicker: false,
  });

  const [endDateTime, setEndDateTime] = useState();
  const [endDateTimeTitle, setEndDateTimeTitle] = useState();
  const [enddateTimestates, setEndDateTimeState] = useState({
    isVisibleDatePicker: false,
  });

  const [minimumAge, setMinimumAge] = useState(0);
  const [maximumAge, setMaximumAge] = useState(75);

  const callBack = (min, max) => {
    setMinimumAge(min);
    setMaximumAge(max);
    handleSubmit();
  };
  const handleSubmit = (matchType) => {
    console.log(
      "startDateTime format ",
      startDateTime,
      matchValue,
      matchType?.value
    );
    setLoading(true);
    const data = {
      dateFrom: startDateTime
        ? moment(startDateTime).format("L").replace(/\//gi, "-")
        : "",
      dateTo: endDateTime
        ? moment(endDateTime).format("L").replace(/\//gi, "-")
        : "",
      timeFrom: "",
      timeTo: "",
      location: "",
      minAgeOfOponent: minimumAge || "",
      maxAgeOfOponent: maximumAge || "",
      matchType: matchType?.value || "",
      matchSpeed: "",
    };
    console.log("posted venue search data#@#@", data);
    try {
      gameService
        .searchGame(data)
        .then((res) => {
          console.log("search game response is:#@#@#@", res?.data?.data?.data);
          setLoading(false);
          setGames([...res?.data?.data?.data]);
          // props.navigation.navigate("SearchGameList", {
          //   games: res?.data?.data?.data,
          // });
        })
        .catch((error) => {
          console.log("eror is:#@#@#@#@", error?.response);
          setGames([]);
          setLoading(false);
        });
    } catch (error) {
      console.log("error in try catch game list in venue", error);
      setGames([]);
      setLoading(false);
    }
  };

  const showStartPicker = () => {
    // setIsVisibleDatePicker(true);
    setStartDateTimeState((prev) => ({ ...prev, isVisibleDatePicker: true }));
  };

  const hideStartPicker = () => {
    // setIsVisibleDatePicker(false);
    setStartDateTimeState((prev) => ({ ...prev, isVisibleDatePicker: false }));
  };

  const showEndPicker = () => {
    // setIsVisibleDatePicker(true);
    setEndDateTimeState((prev) => ({ ...prev, isVisibleDatePicker: true }));
  };

  const hideEndPicker = () => {
    // setIsVisibleDatePicker(false);
    setEndDateTimeState((prev) => ({ ...prev, isVisibleDatePicker: false }));
  };

  console.log("venue detail is:##@#@#@", singleGameData?.id);
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
          // contentContainerStyle={{ flex: 1 }}
        >
          <StatusBar backgroundColor="#5E89E2" />

          <View
            style={{
              width: "80%",
              marginTop: 30,
              alignSelf: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => showStartPicker()}
              activeOpacity={0.6}
              style={{ width: "50%" }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  lineHeight: 16,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                Date From:
              </Text>
              <View
                style={{
                  backgroundColor: "#1E2646",
                  width: 137,
                  height: 45,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Image
                  source={require("../../../assets/calender.png")}
                  style={{
                    height: 16,
                    width: 18,
                    resizeMode: "contain",
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#ffffff",
                  }}
                >
                  {startDateTime
                    ? moment(startDateTime).format("DD. MMM YYYY")
                    : "March 2023"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showEndPicker()}
              activeOpacity={0.6}
              style={{ width: "50%" }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  lineHeight: 16,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                End Date:
              </Text>
              <View
                style={{
                  backgroundColor: "#1E2646",
                  width: 137,
                  height: 45,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Image
                  source={require("../../../assets/calender.png")}
                  style={{
                    height: 16,
                    width: 18,
                    resizeMode: "contain",
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#ffffff",
                  }}
                >
                  {endDateTime
                    ? moment(endDateTime).format("DD. MMM YYYY")
                    : "March 2023"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            {dateTimestates.isVisibleDatePicker && (
              <DateTimePicker
                isVisible={dateTimestates.isVisibleDatePicker}
                onConfirm={(datetime) => {
                  setStartDateTimeState((prev) => ({
                    ...prev,
                    isVisibleDatePicker: false,
                  }));
                  let formatdDate = moment(datetime).format("YYYY-MM-DD");
                  setStartDateTime(formatdDate);
                  // console.log("start month date", formatdDate);
                  // props.setFieldValue("starts_at", formatdDate);
                  setStartDateTimeTitle(
                    moment(formatdDate).format("DD. MMM YYYY HH:mm")
                  );
                  handleSubmit();
                }}
                onCancel={hideStartPicker}
                mode={"date"}
                is24Hour={true}
                date={new Date()}
                isDarkModeEnabled={false}
                cancelTextIOS={"Exit"}
                confirmTextIOS={"OK"}
                minuteInterval={30}
              />
            )}
          </View>

          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "80%",
              alignSelf: "center",
              marginTop: 42,
            }}
          >
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  lineHeight: 16,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                Date From:
              </Text>
              <View
                style={{
                  backgroundColor: "#1E2646",
                  width: 137,
                  height: 45,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Image
                  source={require("../../../assets/calender.png")}
                  style={{
                    height: 16,
                    width: 18,
                    resizeMode: "contain",
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#ffffff",
                  }}
                >
                  March 2023
                </Text>
              </View>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  lineHeight: 16,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                Date To:
              </Text>
              <View
                style={{
                  backgroundColor: "#1E2646",
                  width: 137,
                  height: 45,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Image
                  source={require("../../../assets/calender.png")}
                  style={{
                    height: 16,
                    width: 18,
                    resizeMode: "contain",
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#ffffff",
                  }}
                >
                  April 2023
                </Text>
              </View>
            </View>
          </View> */}

          <View>
            {enddateTimestates.isVisibleDatePicker && (
              <DateTimePicker
                isVisible={enddateTimestates.isVisibleDatePicker}
                onConfirm={(datetime) => {
                  setEndDateTimeState((prev) => ({
                    ...prev,
                    isVisibleDatePicker: false,
                  }));
                  let formatdDate = moment(datetime).format("YYYY-MM-DD");
                  setEndDateTime(formatdDate);
                  // props.setFieldValue("starts_at", formatdDate);
                  setEndDateTimeTitle(
                    moment(formatdDate).format("DD. MMM YYYY HH:mm")
                  );
                  handleSubmit();
                }}
                onCancel={hideEndPicker}
                mode={"date"}
                is24Hour={true}
                date={new Date()}
                isDarkModeEnabled={false}
                cancelTextIOS={"Exit"}
                confirmTextIOS={"OK"}
                minuteInterval={30}
              />
            )}
          </View>

          <View
            style={{
              display: "flex",
              marginBottom: 16,
              marginTop: 42,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.36,
                color: "#ffffff",
                marginBottom: 12,
              }}
            >
              Age Bracket
            </Text>
            <View>
              <TwoWaySlider callBack={callBack} />
            </View>
          </View>
          <View
            style={{
              width: "80%",
              display: "flex",
              marginTop: 48,
              alignSelf: "center",
            }}
          >
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{ fontSize: 16, lineHeight: 19.36, color: "#ffffff" }}
              >
                Type of Match
              </Text>
              <DropDownPicker
                open={openGameType}
                items={gameTypes}
                setOpen={setOpenGameType}
                onSelectItem={(matchType) => handleSubmit(matchType)}
                value={matchValue}
                setValue={setMatchValue}
                style={{ borderColor: "#1E2646", backgroundColor: "#1E2646" }}
                textStyle={{ color: "#ffffff" }}
                containerStyle={[
                  styles.dropdownPickerContainer,
                  { borderRadius: 6 },
                ]}
                modalContentContainerStyle={{
                  backgroundColor: "#1E2646",
                  borderColor: "#1E2646",
                  borderWidth: 1,
                  marginVertical: 200,
                  marginHorizontal: 20,
                  borderRadius: 15,
                }}
                modalProps={{
                  transparent: true,
                  presentationStyle: "fullScreen", // for iOS, but raises a warning on android if not present
                }}
                placeholder="Select"
                listMode="MODAL"
                theme="DARK"
              />
              {/* <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setToggleDropDown((p) => !p)}
                style={{
                  height: 45,
                  width: "100%",
                  backgroundColor: "#1E2646",
                  marginVertical: 8,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 45,
                    marginHorizontal: 13,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "center",
                      lineHeight: 19.36,
                      color: "#ffffff",
                    }}
                  >
                    Ireland
                  </Text>
                  <Image
                    source={require("../../../assets/dropdownArrow.png")}
                    resizeMode="contain"
                    style={{ height: 14, width: 14 }}
                  />
                </View>
              </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              zIndex: toggleDropDown ? -999 : 999,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {games?.length > 0 ? (
              games.map((item, index) => (
                <GameCard
                  navigation={props.navigation}
                  cardColor="transparent"
                  dataContainerColor="transparent"
                  locationContainerColor="transparent"
                  showShedow={false}
                  textColor="white"
                  addLine={true}
                  key={item?.id}
                  game={item}
                />
              ))
            ) : (
              <View
                style={{
                  display: "flex",
                  height: Dimensions.get("window").height / 3,
                  width: "100%",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#ffffff" }}
                >
                  No Match Found
                </Text>
              </View>
            )}
            {/* {["Monday", "Tuesday"].map((data, index) => (
              <LinearGradient
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: 158,
                  marginBottom: 5,
                  marginTop: 5,
                  borderRadius: 10,
                  width: "80%",
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
            ))} */}
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
export default VenueDetail;
