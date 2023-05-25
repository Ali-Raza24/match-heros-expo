import React from "react";
import {StyleSheet, Text} from "react-native";

const TextLink = (props) => {
  const {text, onPress, textStyle} = props;
  return (
    <Text style={{...styles.text, ...textStyle}} onPress={onPress}>{text}</Text>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'white'
  }
});

