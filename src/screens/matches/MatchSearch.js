import {
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Input } from "react-native-elements";
import { COLORS } from "../../utils/colors";
import { useState, useRef } from "react";
import { avgAgePlayersList } from "../../utils/game/avg-player-age";
// import DropDownPicker from 'react-native-dropdown-picker';
import SuccessButton from "../../component/_shared/SuccessButton";
import { useDispatch, useSelector } from "react-redux";
import {
  playerSearchClearAction,
  playerSearchSetAgeBracketAction,
  playerSearchSetCountyIdAction,
  playerSearchSetDayOfGameAction,
  playerSearchSetTimeOfGameAction,
  playerSearchSetUsernameAction,
} from "../../redux/actions/playerSearch.action";
import counties from "../../component/_shared/Counties";
import { WEEK_DAYS } from "../../utils/days";
import { totalAvailabilityHours } from "../../utils/player";
import SvgImage from "../../../assets/signIn.svg";
import TextInputField from "../../component/molecules/TextInputField";
import TwoWaySlider from "../../component/molecules/TwoWaySlider";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import BlueLinearGradientButton from "../../component/molecules/BlueLinearGradientButton";
import DropDownPicker from "react-native-dropdown-picker";
import GameService from "../../services/GameService";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
const MatchSearch = (props) => {
  const gameService = new GameService();
  const [countyOpen, setCountyOpen] = useState(false);
  const [ageOfBracketOpen, setAgeBracketOpen] = useState(false);
  const [dayOfGameOpen, setDayOfGameOpen] = useState(false);
  const [timeOfGameOpen, setTimeOfGameOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [location, setLocation] = useState("");
  const [minimumAge, setMinimumAge] = useState(0);
  const [maximumAge, setMaximumAge] = useState(75);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef(null);
  const state = useSelector((store) => store.playerSearch);
  const dispatch = useDispatch();

  const [openGameType, setOpenGameType] = useState(false);
  const [matchType, setMatchType] = useState("");
  const [matchtypes, setMatchTypes] = useState([
    { label: "Social Match", value: "Social Match" },
    { label: "Futsal", value: "Futsal" },
    { label: "Women's Football", value: "Women's Football" },
  ]);
  const [openMatchSpeed, setOpenMatchSpeed] = useState(false);
  const [matchSped, setMatchSpeed] = useState("");
  const [matchSpeeds, setMatchSpeeds] = useState([
    { label: "Slow", value: "Slow" },
    { label: "Moderate", value: "Moderate" },
    { label: "Fast", value: "Fast" },
  ]);
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
  console.log(
    "startDateTime in search Match Screen",
    startDateTime && startDateTime.split(" ")[1].substr(0, 5),
    startDateTime && moment(startDateTime).format("L").replace(/\//gi, "-"),
    matchType,
    matchSped
  );
  const handleSubmit = () => {
    setLoading(true);
    const data = {
      dateFrom: startDateTime
        ? moment(startDateTime).format("L").replace(/\//gi, "-")
        : "",
      dateTo: endDateTime
        ? moment(endDateTime).format("L").replace(/\//gi, "-")
        : "",
      timeFrom: startDateTime
        ? startDateTime.split(" ")[1].substr(0, 5)
        : "00:00",
      timeTo: endDateTime ? endDateTime.split(" ")[1].substr(0, 5) : "00:00",
      location: location,
      minAgeOfOponent: minimumAge,
      maxAgeOfOponent: maximumAge,
      matchType: matchType,
      matchSpeed: matchSped,
    };
    try {
      gameService
        .searchGame(data)
        .then((res) => {
          console.log(
            "search player response is:#@#@#@",
            res?.data?.data?.data
          );
          setLoading(false);
          props.navigation.navigate("SearchGameList", {
            games: res?.data?.data?.data,
          });
        })
        .catch((error) => {
          console.log("eror is:#@#@#@#@", error);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const callBack = (min, max) => {
    setMinimumAge(Number(min));
    setMaximumAge(Number(max));
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
        <ScrollView contentInsetAdjustmentBehavior="automatic">
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
                Start Date:
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
                Start Time:
              </Text>
              <View
                style={{
                  backgroundColor: "#1E2646",
                  width: 97,
                  height: 45,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#ffffff",
                  }}
                >
                  {startDateTime
                    ? moment(startDateTime).format("HH:mm")
                    : "08:00"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

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
                End Time:
              </Text>
              <View
                style={{
                  backgroundColor: "#1E2646",
                  width: 97,
                  height: 45,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#ffffff",
                  }}
                >
                  {endDateTime ? moment(endDateTime).format("HH:mm") : "08:00"}
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
                  let formatdDate = moment(datetime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  );
                  setStartDateTime(formatdDate);
                  // props.setFieldValue("starts_at", formatdDate);
                  setStartDateTimeTitle(
                    moment(formatdDate).format("DD. MMM YYYY HH:mm")
                  );
                }}
                onCancel={hideStartPicker}
                mode={"datetime"}
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
          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "80%",
              alignSelf: "center",
              marginTop: 22,
            }}
          >
            <View style={{ width: "33%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  lineHeight: 16,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                Time From:
              </Text>
              <View
                style={{
                  backgroundColor: "#1E2646",
                  width: 79,
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
                  00:08
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
                Time To:
              </Text>
              <View
                style={{
                  backgroundColor: "#1E2646",
                  width: 79,
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
                  00:09
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
                  let formatdDate = moment(datetime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  );
                  setEndDateTime(formatdDate);
                  // props.setFieldValue("starts_at", formatdDate);
                  setEndDateTimeTitle(
                    moment(formatdDate).format("DD. MMM YYYY HH:mm")
                  );
                }}
                onCancel={hideEndPicker}
                mode={"datetime"}
                is24Hour={true}
                date={new Date()}
                isDarkModeEnabled={false}
                cancelTextIOS={"Exit"}
                confirmTextIOS={"OK"}
                minuteInterval={30}
              />
            )}
          </View>

          <View style={{ width: "80%", alignSelf: "center", marginTop: 25 }}>
            <TextInputField
              placeHolder={"Location"}
              keyboardType={"default"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#636C92"}
              profile={true}
              // ref={inputRefs}
              onSubmitEditing={() => console.log("first")}
              value={state.player}
              onChangeText={(text) => setLocation(text)}
            />
          </View>
          <View style={{ display: "flex" }}>
            <View
              style={{
                width: "80%",
                alignSelf: "center",
                height: 79,
                marginBottom: 10,
              }}
            >
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    lineHeight: 19.36,
                    color: "#ffffff",
                  }}
                >
                  Travel Distance
                </Text>
              </View>
              <TwoWaySlider callBack={() => console.log("travell distance")} />
            </View>
            <View style={{ width: "80%", alignSelf: "center", height: 79 }}>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    lineHeight: 19.36,
                    color: "#ffffff",
                  }}
                >
                  Preferred age of opponents
                </Text>
              </View>
              <TwoWaySlider callBack={callBack} />
            </View>
          </View>
          <View>
            <View style={{ width: "80%", alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  lineHeight: 19.36,
                  color: "#ffffff",
                }}
              >
                Match Type
              </Text>

              <DropDownPicker
                open={openGameType}
                items={matchtypes}
                setOpen={setOpenGameType}
                value={matchType}
                setValue={setMatchType}
                setItems={setMatchTypes}
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
                placeholder="Type of match"
                listMode="MODAL"
                theme="DARK"
              />
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <View style={{ width: "80%", alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  lineHeight: 19.36,
                  color: "#ffffff",
                }}
              >
                Speed of Match
              </Text>

              <DropDownPicker
                open={openMatchSpeed}
                items={matchSpeeds}
                setOpen={setOpenMatchSpeed}
                value={matchSped}
                setValue={setMatchSpeed}
                setItems={setMatchSpeeds}
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
                placeholder="Speed of match"
                listMode="MODAL"
                theme="DARK"
              />
            </View>
          </View>
          <View
            style={{ marginVertical: 32, width: "80%", alignSelf: "center" }}
          >
            {/* {loading ? (
              <ActivityIndicator size={"small"} />
            ) : ( */}
            <GreenLinearGradientButton
              title={"Search"}
              onSelect={handleSubmit}
              // onSelect={() => console.log("navigate to new result screen")}
              height={45}
              loading={loading}
              // disabled={Object.values(state).every(
              //   (value) => value === null || value === ""
              // )}
              color={["#0B8140", "#0A5129"]}
            />
            {/* )} */}
            <BlueLinearGradientButton
              title={"Clear"}
              onSelect={() => props.navigation.goBack()}
              height={45}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default MatchSearch;
const styles = StyleSheet.create({
  buttonCustomStyles: {
    width: 200,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 70,
  },
  cardContainer: {
    width: "80%",
    flex: 1,
    marginVertical: 12,
    paddingVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  card: {
    width: "90%",
    marginVertical: 12,
    paddingVertical: 12,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 7,
    backgroundColor: "white",
  },
  cardText: {
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
    color: COLORS.textBlueColor,
  },
  playerSearchText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "300",
  },
  textInputStylesContainer: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 7,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  dropdownPickerContainer: {
    zIndex: 999,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
  },
});
