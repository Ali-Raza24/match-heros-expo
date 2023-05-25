import React from "react";
import {StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import Colors from "../../assets/Colors";

const SecondaryButton = (props) => {
  const {title, onPress} = props;
  return (
    <Button
      buttonStyle={styles.button}
      title={title}
      backgroundColor={Colors.secondaryButton}
      fontSize={15}
      fontWeight="bold"
      onPress={onPress}
      color='#1c7ae9'
    />
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    height: 40
  }
});

