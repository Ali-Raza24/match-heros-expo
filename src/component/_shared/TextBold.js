import React from "react";
import {StyleSheet, Text} from "react-native";

const TextBold = (props) => {
  const {text, style} = props;
  return (
    <Text style={{...styles.text, ...style}}>{text}</Text>
  );
};

export default TextBold;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

