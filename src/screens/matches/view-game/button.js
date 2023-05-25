import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ViewGameButton = ({
  text,
  onPress,
  buttonBackground,
  textColor,
  customStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonStyles,
        { backgroundColor: buttonBackground },
        customStyles,
      ]}
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
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
});
