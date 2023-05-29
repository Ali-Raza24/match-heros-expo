import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
function Availability(props) {
  const [availabilityArray, setAvailabilityArray] = useState([
    {
      day: "Friday",
      endTime: "",
      id: 1,
      startTime: "",
    },
    {
      day: "Monday",
      endTime: "",
      id: 2,
      startTime: "",
    },
    {
      day: "Saturday",
      endTime: "",
      id: 3,
      startTime: "",
    },
    {
      day: "Sunday",
      endTime: "",
      id: 4,
      startTime: "",
    },
    {
      day: "Thursday",
      endTime: "",
      id: 5,
      startTime: "",
    },
    {
      day: "Tuesday",
      endTime: "",
      id: 6,
      startTime: "",
    },
    {
      day: "Wednesday",
      endTime: "",
      id: 7,
      startTime: "",
    },
  ]);
  const [checkedDaysList, setCheckedDaysList] = useState([]);
  console.log("availability array is :#@#@#@#@", availabilityArray);
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
              <View key={data?.id}>
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
                        setCheckedDaysList(newDaysList);
                      } else {
                        setCheckedDaysList([...checkedDaysList, data.day]);
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
              // onSelect={() => props.navigation.navigate("MainProfile")}
              onSelect={() => props.navigation.goBack()}
              height={45}
              color={["#0B8140", "#0A5129"]}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default Availability;
