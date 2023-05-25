import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDeletedGameIdAction } from "../../../redux/actions/game.action";
import GameService from "../../../services/GameService";
import { useToast } from "react-native-toast-notifications";

const gameService = new GameService();

export const GameOnAndCancel = ({ gameId, creatorId }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const currentUserId = useSelector((state) => state.user?.id);

  const handleCancelGame = async () => {
    try {
      const response = await gameService.deleteGame(gameId);
      console.log("Game Cancel Response", response.data);
      dispatch(setDeletedGameIdAction(gameId));
      navigation.navigate("Matches");
      toast.show("The game has been cancelled.", {
        type: "success",
        placement: "top",
      });
      // send push notifications -> response.data.deviceTokens
      return;
    } catch (error) {
      console.log("Game Cancel Error ", error?.response?.data);
    }
  };

  const handleGameOn = async () => {
    try {
      const response = await gameService.gameOn(gameId);
      toast.show("Game is ON now.", {
        type: "success",
        placement: "top",
      });
      // send push notifications -> response.data.deviceToken
      console.log("Game On Response", response.data);
      return;
    } catch (error) {
      console.log("Game On Error ", error?.response?.data);
    }
  };

  if (currentUserId !== creatorId) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGameOn}>
        <Text style={[styles.on]}>Game On</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancelGame}>
        <Text style={[styles.cancel]}>Cancel Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  on: {
    fontSize: 18,
    // color: '#45662A',
    color: "white",
  },
  cancel: {
    fontSize: 18,
    color: "#D02927",
  },
});
