import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import ToolTip from "react-native-walkthrough-tooltip";
import { StatusBar } from "expo-status-bar";

export const Popup = ({
  showPopup,
  setShowPopup,
  placement = "left",
  popoverText,
  children,
}) => {
  return (
    <View style={PopupStyles.container}>
      <ToolTip
        isVisible={showPopup}
        content={popoverText}
        placement={placement}
        onClose={() => setShowPopup(false)}
        topAdjustment={Platform.OS === "android" ? -StatusBar.currentHeight : 0}
      >
        {children}
      </ToolTip>
    </View>
  );
};

const PopupStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
