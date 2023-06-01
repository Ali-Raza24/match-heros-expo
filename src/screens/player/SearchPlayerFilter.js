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
import { useRoute } from "@react-navigation/native";
const PlayerSearchScreen = (props) => {
  const route = useRoute();

  const [countyOpen, setCountyOpen] = useState(false);
  const [ageOfBracketOpen, setAgeBracketOpen] = useState(false);
  const [dayOfGameOpen, setDayOfGameOpen] = useState(false);
  const [timeOfGameOpen, setTimeOfGameOpen] = useState(false);
  const [minimumAge, setMinimumAge] = useState(0);
  const [maximumAge, setMaximumAge] = useState(75);
  const [playerName, setPlayerName] = useState("");
  const [matchLocation, setMatchLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);
  const inputRefs = useRef(null);
  const state = useSelector((store) => store.playerSearch);
  const dispatch = useDispatch();
  // route.params.onSearch();
  const callBack = (min, max) => {
    setMinimumAge(Number(min));
    setMaximumAge(Number(max));
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
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          marginBottom: 32,
        }}
      >
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />
          {/* <Text style={styles.playerSearchText}>Player Search</Text> */}

          <View
            style={{
              flex: 1,
              marginTop: 34,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <TextInputField
              placeHolder={"Name"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#636C92"}
              profile={true}
              // ref={inputRefs}
              onSubmitEditing={() => console.log("first")}
              value={playerName}
              onChangeText={(text) => setPlayerName(text)}
            />
            <TextInputField
              placeHolder={"Match Location"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#636C92"}
              profile={true}
              // ref={inputRefs}
              onSubmitEditing={() => console.log("first")}
              value={matchLocation}
              onChangeText={(text) => setMatchLocation(text)}
            />
            <Text style={{ fontSize: 16, lineHeight: 19.36, color: "#ffffff" }}>
              Prefer age for oponents
            </Text>
            <View style={{ height: 69 }}>
              <TwoWaySlider callBack={callBack} />
            </View>
            <View>
              <Text
                style={{ fontSize: 16, lineHeight: 19.36, color: "#ffffff" }}
              >
                Day of Match
              </Text>
              <View
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (days.includes(day)) {
                        setDays(days.filter((d) => d != day));
                      } else {
                        setDays([...days, day]);
                      }
                    }}
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 25,
                      width: "50%",
                    }}
                  >
                    <Image
                      source={
                        days.includes(day)
                          ? require("../../../assets/checkedGreen.png")
                          : require("../../../assets/emptyBox.png")
                      }
                      style={{ resizeMode: "contain", height: 26, width: 26 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        lineHeight: 19,
                        color: "#ffffff",
                        textAlign: "center",
                        marginLeft: 12,
                      }}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{ marginTop: 6 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 14,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  Start Time
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#ffffff",
                    textAlign: "center",
                    marginLeft: 26,
                  }}
                >
                  End Time
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <TextInput
                  style={{
                    height: 45,
                    width: 79,
                    backgroundColor: "#1E2646",
                    borderRadius: 6,
                    paddingHorizontal: 5,
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                  onChangeText={(text) => setStartTime(text)}
                />
                <TextInput
                  style={{
                    height: 45,
                    width: 79,
                    backgroundColor: "#1E2646",
                    marginLeft: 12,
                    borderRadius: 6,
                    paddingHorizontal: 5,
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                  onChangeText={(text) => setEndTime(text)}
                />
                {/* <TouchableOpacity activeOpacity={0.6} style={{height:56,width:56,marginLeft:16}}>
            <Image source={require("../../../assets/plusGreen.png")} style={{resizeMode:'contain',height:56,width:56}}/>
            </TouchableOpacity> */}
              </View>
            </View>
            <View style={{ marginTop: 32 }}>
              <GreenLinearGradientButton
                title={"Search"}
                // onSelect={this.handleSubmit}
                onSelect={() => props.navigation.goBack()}
                height={45}
                loading={false}
                disabled={
                  playerName.length == 0 ||
                  matchLocation.length == 0 ||
                  days?.length == 0
                }
                color={["#0B8140", "#0A5129"]}
              />
              <BlueLinearGradientButton
                title={"Clear"}
                onSelect={() => dispatch(playerSearchClearAction())}
                height={45}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default PlayerSearchScreen;
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
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
  },
});
