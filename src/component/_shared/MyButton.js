import React from "react";
import { Button } from "react-native-elements";
import Colors from "../../../assets/Colors";

const MyButton = (props) => {
  const { title, onPress } = props;
  return (
    <Button
      buttonStyle={{ paddingLeft: 20, paddingRight: 20, borderRadius: 5 }}
      title={title}
      backgroundColor={Colors.blue}
      // raised={true}
      fontSize={30}
      fontWeight="bold"
      onPress={onPress}
    />
  );
};

export default MyButton;