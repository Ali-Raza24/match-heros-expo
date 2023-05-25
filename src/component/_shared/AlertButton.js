import React from "react";
import {StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import Colors from "../../assets/Colors";

const AlertButton = (props) => {
  const {title, onPress} = props;
  return (
    <Button
      buttonStyle={styles.button}
      title={title}
      backgroundColor={Colors.alertButton}
      fontSize={15}
      fontWeight="bold"
      onPress={onPress}
      color='#721c24'
    />
  );
};

export default AlertButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    height: 40
  }
});

