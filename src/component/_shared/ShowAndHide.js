import React, { Component } from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

class ShowAndHide extends Component {
  render() {

    return (
      <TouchableOpacity style={{ ...this.props.style }} onPress={this.props.onPress}>
        {this.props.hide ?
          <Image source={require('../../../assets/hideEye.png')} style={styles.hide} />

          :
          <Image source={require('../../../assets/showEye.png')} style={styles.show} />


        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  show: {
    width: 19.6,
    height: 12
  },
  hide: {
    width: 19.6,
    height: 16
  },
});

export default ShowAndHide;