import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ErrorText({ message }) {
  return <Text style={styles.text}>{message}</Text>;
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#ff5e54",
    textAlign: "center",
  },
});
