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
  const [availabilityArray, setAvailabilityArray] = useState({
    Monday: [{ id: 1, startTime: "", endTime: "" }],
    Tuesday: [{ id: 1, startTime: "", endTime: "" }],
    Wednesday: [{ id: 1, startTime: "", endTime: "" }],
    Thursday: [{ id: 1, startTime: "", endTime: "" }],
    Friday: [{ id: 1, startTime: "", endTime: "" }],
    Saturday: [{ id: 1, startTime: "", endTime: "" }],
    Sunday: [{ id: 1, startTime: "", endTime: "" }],
  });
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
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
            {Object.keys(availabilityArray).map((keyName, i) => (
              <View key={i}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/checkedGreen.png")}
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
                      {keyName}
                    </Text>
                  </View>
                  {/* <TouchableOpacity 
            onPress={() => {
           setAvailabilityArray((prevState) => {
            const team = [...prevState[keyName],{id:4,startTime:""}];
            const newObj = {};
          const keysObj =  Object.keys(availabilityArray)
          keysObj.map((x) => {
            if(x == keyName){ 
            newObj[x] = team
            }else{
              newObj[x] = availabilityArray[x]
            }
          })
            return newObj ;
          });
            }}
            activeOpacity={0.6} style={{height:56,width:56,marginLeft:16}}>
            <Image source={require("../../../assets/plusGreen.png")} style={{resizeMode:'contain',height:56,width:56}}/>
            </TouchableOpacity> */}
                </View>
                {availabilityArray[keyName].map((data, index) => (
                  <View style={{ display: "flex" }} key={index}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
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
                      {index != 0 && (
                        <TouchableOpacity
                          style={{
                            height: 10,
                            width: 30,
                            backgroundColor: "red",
                            marginRight: 13,
                            borderRadius: 4,
                          }}
                        ></TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}
            <GreenLinearGradientButton
              title={"NEXT"}
              onSelect={() => props.navigation.navigate("MainProfile")}
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
