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
  const [availabilityArray, setAvailabilityArray] = useState([
    {
      day: "Sunday",
      endTime: "4:00",

      startTime: "5:00",
    },
    {
      day: "Monday",
      endTime: "3:00",

      startTime: "6:00",
    },
    {
      day: "Tuesday",
      endTime: "7:00",
      startTime: "6:00",
    },
    {
      day: "Wednesday",
      endTime: "11:00",

      startTime: "1:00",
    },
    {
      day: "Thursday",
      endTime: "10:00",

      startTime: "2:00",
    },
    {
      day: "Friday",
      endTime: "2:00",

      startTime: "5:00",
    },
    {
      day: "Saturday",
      endTime: "3:00",

      startTime: "6:00",
    },
  ]);
  const [checkedDaysList, setCheckedDaysList] = useState([]);
  const [userAvailability, setUserAvailability] = useState([]);
  console.log("availability array is :#@#@#@#@", userAvailability);
  const handleAvailabilitySubmit = () => {
    const data = {
      avalibility: userAvailability,
    };
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
                            onChangeText={(text) =>
                              data.setState((dat) => ({
                                ...dat,
                                startTime: text,
                              }))
                            }
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
                            onChangeText={(text) =>
                              data.setState((dat) => ({
                                ...dat,
                                endTime: text,
                              }))
                            }
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
