import React from "react";
import {Image, View, StyleSheet} from "react-native";
import Colors from "../../assets/Colors";

const Avatar = (props) => {
  const {avatar} = props;
  return (
    <View style={styles.avatarContainer}>
      <Image
        source={avatar}
        style={styles.previewImage}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  previewImage: {
    width: 130,
    height: 130,
    borderWidth: 3,
    borderColor: Colors.blue,
    borderRadius: 5
  },
  avatarContainer: {
    marginTop: -65,
    alignItems: "center"
  }
});