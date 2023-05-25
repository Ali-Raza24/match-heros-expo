import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../../assets/Colors";

const DefaultButton = (props) => {
  const { title, onPress, icon } = props;
  return (
    <Button
      buttonStyle={styles.button}
      title={title}
      backgroundColor={Colors.defaultButton}
      fontSize={15}
      fontWeight="bold"
      onPress={onPress}
      color='#27282c'
      icon={icon}
    />
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  button: {
    height: 40,
    padding: 10,
    width: '100%',
    marginHorizontal: -10,
    alignItems: 'center'
  }
});

