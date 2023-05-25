import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";


export default class ChatIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <Image source={require('../../../assets/image/chat.png')} style={styles.icon} />
          {/* <Text style={styles.textStyle}>{badgeNumber > 0 ? badgeNumber : ""}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 30,
    height: 30,
    position: "relative"
  },
  textStyle: {
    position: "absolute",
    top: -5,
    right: 0
  },
  icon: {
    width: 30,
    height: 30
  },
});
