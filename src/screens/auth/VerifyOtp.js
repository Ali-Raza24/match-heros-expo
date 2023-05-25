import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import TextInputField from "../../component/molecules/TextInputField";
import { Button } from "react-native-elements";
import SvgImage from "../../../assets/signIn.svg";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import OTPComponent from "../../component/molecules/OTPComponent";
function VerifyOtp(props) {
  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={{
          flex: 0.5,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={() => props.navigation.goBack()}
      >
        {/* <View style={{}}> */}
        <Image
          source={require("../../../assets/arrowGreen.png")}
          style={{
            // marginLeft: 6,
            transform: [{ rotate: "180deg" }],
            marginRight: 6,
          }}
        />
        <Text
          style={{
            lineHeight: 19,
            fontSize: 16,
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Back
        </Text>
        {/* </View> */}
      </TouchableOpacity>
    );
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

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView
          style={{ flex: 1, height: Dimensions.get("window").height }}
        >
          <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />
          <View
            style={{
              flex: 0.12,
              justifyContent: "flex-end",
              width: "80%",
              alignSelf: "center",
            }}
          >
            {renderHeader()}
          </View>
          <View
            style={{
              flex: 0.49,
              justifyContent: "flex-end",
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                lineHeight: 45,
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              Verification
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 19, color: "#ffffff" }}>
              Enter code sent via email
            </Text>
            <View style={{ marginTop: 20 }}>
              <OTPComponent />
              {/* <TextInputField placeHolder={"Enter email address"} /> */}
              <GreenLinearGradientButton
                title={"Verify"}
                onSelect={() => props.navigation.navigate("NewPassword")}
                height={45}
                color={["#0B8140", "#0A5129"]}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default VerifyOtp;
