import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet } from "react-native";

const TransparentButton = (props) => {
  const { title, onPress, loading, icon, disabled, style, containerViewStyle } =
    props;

  return (
    <Button
      buttonStyle={{ ...styles.transparentButton, ...style }}
      containerViewStyle={{ ...style, ...containerViewStyle }}
      title={title}
      transparent
      icon={
        icon && {
          name: "map-marker",
          type: "font-awesome",
          size: 20,
          color: "white",
        }
      }
      outline
      // fontFamily={'SourceSansPro-Regular'}
      fontSize={14}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
    />
  );
};
const styles = StyleSheet.create({
  transparentButton: {
    paddingTop: 10,
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "white",
  },
});
export default TransparentButton;
