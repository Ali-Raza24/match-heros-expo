import {Text} from "react-native";
import React from "react";

const MyText = (props) => {
  return (
    <Text style={props.myStyle} onPress={props.onPress}>{props.children}</Text>
  );
};

export default MyText;