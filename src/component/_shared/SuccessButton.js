import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../../assets/Colors";

const SuccessButton = (props) => {
  const {
    title,
    onPress,
    icon,
    outline,
    transparent,
    customStyle,
    textCustomStyle,
    disabled,
  } = props;
  return (
    <Button
      buttonStyle={[styles.button, customStyle]}
      textStyle={[textCustomStyle]}
      title={title}
      disabled={disabled}
      outline={outline}
      transparent={transparent}
      backgroundColor={"#0A5129"}
      fontSize={18}
      fontWeight="bold"
      onPress={onPress}
      icon={icon}
    />
  );
};

export default SuccessButton;

const styles = StyleSheet.create({
  button: {
    height: 45,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
});
