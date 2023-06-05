import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import SvgImage from "../../../assets/signIn.svg";
function CancellationPolicy() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <SvgImage
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
      />
      <Text style={{ fontSize: 20, color: "#ffffff", fontWeight: "bold" }}>
        Coming Soon!
      </Text>
    </SafeAreaView>
  );
}

export default CancellationPolicy;
