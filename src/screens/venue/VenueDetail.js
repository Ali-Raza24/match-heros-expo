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
import DateTimePicker from "@react-native-community/datetimepicker";
import TwoWaySlider from "../../component/molecules/TwoWaySlider";
import { LinearGradient } from "expo-linear-gradient";
function VenueDetail() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
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
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{}}
          // contentContainerStyle={{ flex: 1 }}
        >
          <StatusBar backgroundColor="#5E89E2" />

          <View
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
              <TwoWaySlider
                callBack={() => console.log("callBack from venue Detail")}
              />
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
            <View style={{}}>
              <Text
                style={{ fontSize: 16, lineHeight: 19.36, color: "#ffffff" }}
              >
                Select
              </Text>
              <TouchableOpacity
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
              </TouchableOpacity>
              {toggleDropDown && (
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    backgroundColor: "#1E2646",
                    height: Dimensions.get("window").height / 4,
                    top: 75,
                    zIndex: 999,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setToggleDropDown((p) => !p)}
                    style={{
                      height: 45,
                      width: "100%",
                      backgroundColor: "#2C365C",
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
                        source={require("../../../assets/whiteTick.png")}
                        resizeMode="contain"
                        style={{ height: 14, width: 14 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View
            style={{ display: "flex", zIndex: toggleDropDown ? -999 : 999 }}
          >
            {["Monday", "Tuesday"].map((data, index) => (
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
            ))}
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
