import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import AuthService from "../../services/AuthService";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";

function Availability(props) {
  const authService = new AuthService();
  const [monday, setMonday] = useState({ startTime: "", endTime: "" });
  const [start, setStartTime] = useState({ startMTime: "", endMTime: "", startTTime: "", endTTime: "", startWTime: "", endWTime: "", startTHTime: "", endTHTime: "", startFTime: "", endFTime: "", startSTime: "", endSTime: "", startSUNTime: "", endSUNTime: "" });
  const [availabilityArray, setAvailabilityArray] = useState([
    {
      day: "Monday",
      endTime: start.endMTime,

      startTime: start.startMTime,
    },
    {
      day: "Tuesday",
      endTime: start.endTTime,

      startTime: start.startTTime,
    },
    {
      day: "Wednesday",
      endTime: start.endWTime,

      startTime: start.startWTime,
    },
    {
      day: "Thursday",
      endTime: start.endTHTime,

      startTime: start.startTHTime,
    },
    {
      day: "Friday",
      endTime: start.endFTime,

      startTime: start.startFTime,
    },
    {
      day: "Saturday",
      endTime: start.endSTime,

      startTime: start.startSTime,
    },
    {
      day: "Sunday",
      endTime: start.endSUNTime,

      startTime: start.startSUNTime,
    },
  ]);
  const [checkedDaysList, setCheckedDaysList] = useState([]);
  const [userAvailability, setUserAvailability] = useState([]);

  let arrayAv = [
    start.endMTime && start.startMTime && {
      day: "Monday",
      endTime: start.endMTime,

      startTime: start.startMTime,
    },
    start.endTTime && start.startTTime && {
      day: "Tuesday",
      endTime: start.endTTime,

      startTime: start.startTTime,
    },
    start.endWTime && start.startWTime && {
      day: "Wednesday",
      endTime: start.endWTime,

      startTime: start.startWTime,
    },
    start.endTHTime && start.startTHTime && {
      day: "Thursday",
      endTime: start.endTHTime,

      startTime: start.startTHTime,
    },
    start.endFTime && start.startFTime && {
      day: "Friday",
      endTime: start.endFTime,

      startTime: start.startFTime,
    },
    start.endSTime && start.startSTime && {
      day: "Saturday",
      endTime: start.endSTime,

      startTime: start.startSTime,
    },
    start.endSUNTime && start.startSUNTime && {
      day: "Sunday",
      endTime: start.endSUNTime,

      startTime: start.startSUNTime,
    },
  ];
  let newAvailArray = []
  for (let i = 0; i < arrayAv.length; i++) {
    if (arrayAv[i] != "") {
      newAvailArray.push(arrayAv[i])
    }
  }

  console.log("availability array is :#@#@#@#@", userAvailability, newAvailArray);
  const handleAvailabilitySubmit = () => {
    const data = {
      avalibility: newAvailArray,
    };
    if (newAvailArray.length == 0) {
      alert("Please set your Availability Start and End Time properly!")
    } else {
      try {
        authService
          ?.postAvailability(data)
          .then(
            (response) => {
              console.log(
                "success response of post availability API is:#@#@",
                response
              );

              // this.setState({ buttonLoading: false });
              Alert.alert(
                "Availability submitted successfully!",
                "",
                [{ text: "OK", onPress: () => props.navigation.goBack() }],
                { cancelable: false }
              );
              // props.navigation.navigate("Availability");
            },
            (error) => {
              console.log("Availability Api call error", error?.response, error);
              Alert.alert(
                "Availability submitted successfully!",
                "",
                [{ text: "OK", onPress: () => props.navigation.goBack() }],
                { cancelable: false }
              );
            }
          )
          .catch((error) => {
            console.log(
              "Availability Api call errorsssss",
              error?.response,
              error
            );
            Alert.alert(
              "Availability submitted successfully!",
              "",
              [{ text: "OK", onPress: () => props.navigation.goBack() }],
              { cancelable: false }
            );
          });
      } catch (e) {
        console.log("API error is:#@#@#@#", e, e?.response);
        alert("API error is:#@#@#@#", e);
      }
    }
  };
  function formatTimeString(x) {
    x = x.replace(
      /^([1-9]\/|[2-9])$/g, '0$1' // 3 > 03
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1' // 11 > 11
    ).replace(
      /^([0-1])([3-9])$/g, '0$1$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and /
    ).replace(
      /\/\//g, '' // Remove forward slashes
    );

    // Add the time format "00:00"
    const hours = x.substr(0, 2);
    const minutes = x.substr(2, 2);
    x = hours.padStart(2, '0') + ':' + minutes.padStart(2, '0');

    return x;
  }
  const handleStartTime = (text, startTime, endTime) => {
    setStartTime({ ...start, [startTime]: formatTimeString(text), [endTime]: start[endTime] })
  }
  const handleEndTime = (text, startTime, endTime) => {
    setStartTime({ ...start, [startTime]: start[startTime], [endTime]: formatTimeString(text) })
  }
  console.log("start time is:#@#@", start)
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
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                textAlign: "left",
                fontSize: 18,
                lineHeight: 21,
              }}
            >
              Please enter your availability
            </Text>
            {availabilityArray.map((data, i) => (
              <View key={data?.day}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (checkedDaysList.includes(data.day)) {
                        const newDaysList = checkedDaysList.filter(
                          (day) => day != data.day
                        );
                        const newUserAvailability = userAvailability.filter(
                          (dataObj) => dataObj.day != data.day
                        );
                        setCheckedDaysList(newDaysList);
                        setUserAvailability(newUserAvailability);
                      } else {
                        setCheckedDaysList([...checkedDaysList, data.day]);
                        setUserAvailability([...userAvailability, data]);
                      }
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={
                        checkedDaysList.includes(data.day)
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
                      {data?.day}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* {availabilityArray[keyName].map((data, index) => ( */}
                <View style={{ display: "flex" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {checkedDaysList.includes(data.day) && (
                      <View>
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
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                              let startTime = i == 0 ? "startMTime" : i == 1 ? "startTTime" : i == 2 ? "startWTime" : i == 3 ? "startTHTime" : i == 4 ? "startFTime" : i == 5 ? "startSTime" : "startSUNTime";
                              let endTime = i == 0 ? "endMTime" : i == 1 ? "endTTime" : i == 2 ? "endWTime" : i == 3 ? "endTHTime" : i == 4 ? "endFTime" : i == 5 ? "endSTime" : "endSUNTime";
                              handleStartTime(text, startTime, endTime)
                            }}
                            value={i == 0 ? start.startMTime : i == 1 ? start.startTTime : i == 2 ? start.startWTime : i == 3 ? start.startTHTime : i == 4 ? start.startFTime : i == 5 ? start.startSTime : start.startSUNTime}
                          // onChangeText={(text) =>
                          //   data.setState((dat) => ({
                          //     ...dat,
                          //     startTime: text,
                          //   }))
                          // }
                          // onChangeText={(text) => {
                          //   const item = {
                          //     // day: data.day,
                          //     startTime: text,
                          //     // endTime: data.endTime,
                          //     // id: data.id,
                          //   };
                          //   setUserAvailability([
                          //     ...userAvailability,
                          //     { ...data, startTime: text },
                          //   ]);
                          // }}
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
                            keyboardType="number-pad"

                            onChangeText={(text) => {
                              let startTime = i == 0 ? "startMTime" : i == 1 ? "startTTime" : i == 2 ? "startWTime" : i == 3 ? "startTHTime" : i == 4 ? "startFTime" : i == 5 ? "startSTime" : "startSUNTime";
                              let endTime = i == 0 ? "endMTime" : i == 1 ? "endTTime" : i == 2 ? "endWTime" : i == 3 ? "endTHTime" : i == 4 ? "endFTime" : i == 5 ? "endSTime" : "endSUNTime";
                              handleEndTime(text, startTime, endTime)

                            }}
                            value={i == 0 ? start.endMTime : i == 1 ? start.endTTime : i == 2 ? start.endWTime : i == 3 ? start.endTHTime : i == 4 ? start.endFTime : i == 5 ? start.endSTime : start.endSUNTime}
                          // onChangeText={(text) => {
                          //   const item = {
                          //     day: data.day,
                          //     startTime: data.startTime,
                          //     endTime: text,
                          //     id: data.id,
                          //   };
                          //   setUserAvailability([
                          //     ...userAvailability,
                          //     ...item,
                          //   ]);
                          // }}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
            <GreenLinearGradientButton
              title={"NEXT"}
              disabled={userAvailability.length > 0 ? false : true}
              // onSelect={() => props.navigation.navigate("MainProfile")}
              onSelect={handleAvailabilitySubmit}
              height={45}
              color={
                userAvailability.length > 0
                  ? ["#0B8140", "#0A5129"]
                  : ["#d3d8e0", "#d3d8e0"]
              }
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default Availability;
