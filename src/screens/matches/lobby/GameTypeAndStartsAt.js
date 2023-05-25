import moment from "moment";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { gameTypes } from "../../../utils/game-types";

export const GameTypeAndStartsAt = ({ game_type, starts_at }) => {
  console.log("game type and gameTypes", game_type, gameTypes[0].value);
  const gameType = gameTypes.find((g) => g.value === game_type);
  const day = moment(starts_at).format("dddd").substring(0, 3);
  const fullDate = moment(starts_at).format("L");
  const time = moment(starts_at).format("LT");
  return (
    <View style={styles.container}>
      {/* Game Type */}
      <Text style={[styles.whiteText, styles.gameTypeAndStartsAt]}>
        {gameType?.label}
      </Text>
      {/* Game Starts At */}
      <Text style={[styles.whiteText, styles.gameTypeAndStartsAt]}>
        {/* Wed - 11/4/22 - KO 19:00 */}
        {day} - {fullDate} - KO {time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    marginTop: 0,
  },
  whiteText: {
    color: "white",
  },
  gameTypeAndStartsAt: {
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 2,
  },
});
