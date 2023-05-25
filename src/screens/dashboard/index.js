import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
function Dashboard(props) {
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
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Heros")}
            activeOpacity={0.6}
            style={{ height: 220, width: "90%", alignSelf: "center" }}
          >
            <Image
              source={require("../../../assets/dashboardHero.png")}
              style={{ resizeMode: "stretch", height: 250, width: "100%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Matches")}
            activeOpacity={0.6}
            style={{ height: 220, width: "90%", alignSelf: "center" }}
          >
            <Image
              source={require("../../../assets/dashboardMatch.png")}
              style={{ resizeMode: "stretch", height: 250, width: "100%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Venues")}
            activeOpacity={0.6}
            style={{ height: 250, width: "90%", alignSelf: "center" }}
          >
            <Image
              source={require("../../../assets/dashboardPitch.png")}
              style={{ resizeMode: "stretch", height: 250, width: "100%" }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default Dashboard;
