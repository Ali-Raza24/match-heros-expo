import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback, View, StyleSheet } from "react-native";

class FloatingButton extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.floatingButton}>
          <Image source={require("../../../assets/image/add.png")} style={{ width: 55, height: 55 }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 28,
    right: 26,
    backgroundColor: "#0B8140"
  },
})
export default FloatingButton;