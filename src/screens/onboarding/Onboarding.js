import React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
// import {Button} from 'react-native-elements'
import Onboardingsvg from "../../../assets/onboarding.svg";
// import {LinearGradient} from 'expo-linear-gradient';
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import BlueLinearGradientButton from "../../component/molecules/BlueLinearGradientButton";

function Onboarding(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />
      <Onboardingsvg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
      />
      <View
        style={{
          flex: 0.45,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: 22 }}>
          <Text
            style={{
              fontSize: 35,
              lineHeight: 58,
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Welcome to
          </Text>
        </View>
        <Image
          source={require("../../../assets/logo.png")}
          style={{ resizeMode: "contain" }}
        />
      </View>
      <View
        style={{
          flex: 0.35,
          display: "flex",
          justifyContent: "center",
          width: "80%",
          alignSelf: "center",
          // alignItems: "center",
        }}
      >
        <BlueLinearGradientButton
          title={"REGISTER"}
          onSelect={() => props.navigation.navigate("SignUp")}
          height={60}
        />

        <GreenLinearGradientButton
          title={"SIGN IN"}
          onSelect={() => props.navigation.navigate("SignIn")}
          height={60}
          color={["#0B8140", "#0A5129"]}
        />
      </View>
    </SafeAreaView>
  );
}

export default Onboarding;
