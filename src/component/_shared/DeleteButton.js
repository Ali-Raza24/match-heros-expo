import React from "react";
import { StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";

const DeleteButton = (props) => {
  const {
    title,
    onPress,
    loading,
    icon,
    iconStyle,
    disabled,
    style,
    fontStyle,
    containerViewStyle,
  } = props;
  return (
    <Button
      buttonStyle={{ ...styles.button, ...style }}
      containerViewStyle={{ ...style, ...containerViewStyle }}
      title={title}
      backgroundColor="#E25050"
      icon={
        icon && {
          name: "map-marker",
          type: "font-awesome",
          size: 20,
          color: "white",
        }
      }
      //   raised={true}
      textStyle={{ ...fontStyle }}
      // fontFamily={'SourceSansPro-Regular'}
      fontSize={14}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
    />
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  button: {
    paddingTop: 10,
    width: "100%",
    height: 45,
  },
});
