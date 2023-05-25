import React from "react";
import {ImageBackground, View, StyleSheet} from "react-native";

const Cover = (props) => {
  const {cover} = props;
  return (
    <View style={styles.coverContainer}>
      <ImageBackground
        source={cover}
        style={styles.backgroundContainer}>
      </ImageBackground>
    </View>
  );
};

export default Cover;

const styles = StyleSheet.create({
  coverContainer: {
    height: 200,
    position: "relative"
  },
  backgroundContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});