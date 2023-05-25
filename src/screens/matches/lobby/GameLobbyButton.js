import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";

export const GameLobbyButton = ({
  textColor,
  buttonBackground,
  text,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyles, { backgroundColor: buttonBackground }]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginVertical: 4,
  },
  buttonText: {
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
  },
});
