import React from "react";
import { StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
// import Colors from "../../../assets/Colors";

const PrimaryButton = (props) => {
  const { title, onPress, loading, icon, disabled, style, fontStyle, containerViewStyle, backgroundColor } = props;
  return (
    <Button
      buttonStyle={{ ...styles.button, ...style }}
      containerViewStyle={{ ...style, ...containerViewStyle }}
      title={title}
      backgroundColor={backgroundColor ? backgroundColor : "#121212"}
      icon={
        icon && {
          name: 'map-marker',
          type: "font-awesome",
          size: 20,
          color: "white"
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

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    paddingTop: 10,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    height: 45
  }
});

