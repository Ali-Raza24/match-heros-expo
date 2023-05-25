import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export const PayAndConfirmedPlayers = () => {
  const gameLobbyState = useSelector((state) => state.gameLobby);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pay Via Five-a-Side App</Text>
      <Text style={styles.text}>
        {gameLobbyState.confirmedPlayers.length} Confirmed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    color: "white",
  },
});
