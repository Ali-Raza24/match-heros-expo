import React from "react";
import { Button } from "react-native-elements";
import Colors from "../../assets/Colors";
import moment from "moment";
import { StyleSheet } from "react-native";

const FlatButton = (props) => {
  const { title, onPress, containerViewStyle, icon, style, fontStyle, color } =
    props;
  return (
    <Button
      color={color}
      buttonStyle={{ ...styles.button, ...style }}
      containerViewStyle={{ ...style, ...containerViewStyle }}
      title={title}
      backgroundColor={color}
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
      // fontFamily={"SourceSansPro-Regular"}
      fontSize={14}
      onPress={onPress}
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
export default FlatButton;
