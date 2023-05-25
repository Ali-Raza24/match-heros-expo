import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Avatar, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { STATUSES } from "../../../utils/game/invite-status";

import GameService from "../../../services/GameService";
import { useToast } from "react-native-toast-notifications";
import { displayDangerToast, displaySuccessToast } from "../../../utils/toast";

const gameService = new GameService();
export const TeamCard = ({ data, creatorId, onPress }) => {
  const user = useSelector((state) => state.user);
  const gameLobbyState = useSelector((state) => state.gameLobby);
  const toast = useToast();
  if (!data) {
    return null;
  }

  async function switchPlayerTeam(gameId, playerId) {
    if (Number(playerId) === Number(user.id)) {
      return;
    }
    try {
      const response = await gameService.switchGamePlayerTeam(gameId, playerId);
      console.log(switchPlayerTeam.name + " Response ", response.data);
      displaySuccessToast(toast, response.data.message);
    } catch (error) {
      console.log(switchPlayerTeam.name + " Error ", error?.response?.data);
      displayDangerToast(toast, "Couldn't perform this action right now.");
    }
  }

  const displayToggleButtonToCreator = (item) => {
    if (user.id === creatorId) {
      if (!gameLobbyState.creatorRemovePlayer) {
        if (item.status === STATUSES.ACCEPTED) {
          return (
            <TouchableOpacity
              onPress={() => switchPlayerTeam(item.game_id, item.player_id)}
              style={styles.rightIconContainer}
            >
              <Octicons name="arrow-switch" size={24} color="#055091" />
            </TouchableOpacity>
          );
        }
        return <View></View>;
      }
      return (
        <View
          style={[
            styles.rightIconContainer,
            { paddingVertical: 6, paddingHorizontal: 6 },
          ]}
        >
          <MaterialIcons name="do-not-disturb-alt" size={26} color="red" />
        </View>
      );
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={({ index, item, separators }) => {
        return (
          <ListItem containerStyle={styles.container} key={item.id}>
            <TouchableOpacity onPress={() => onPress(item.player_id)}>
              <Image
                style={styles.avatarStyle}
                source={require("../../../../assets/image/default_avatar.jpg")}
              />
            </TouchableOpacity>
            <ListItem.Content style={styles.titleContainer}>
              <ListItem.Title style={styles.titleStyle}>
                {item.player_name}
              </ListItem.Title>
              <ListItem.Title
                style={[
                  {
                    ...styles.statusStyles,
                    color:
                      item.status === STATUSES.ACCEPTED ? "#5FC73D" : "yellow",
                  },
                ]}
              >
                {item.status === STATUSES.ACCEPTED ? "Confirmed" : "Pending"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={"#ffffff"} />
          </ListItem>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  avatarStyle: {
    borderRadius: 100,
    borderWidth: 0,
    width: 45,
    height: 45,
    resizeMode: "cover",
  },
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomColor: "rgba(255,255,255,0.35)",
    justifyContent: "center",
    paddingTop: 10,
    flex: 1,
    paddingBottom: 10,
    height: 100,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  statusStyles: {
    color: "#5FC73D",
    fontWeight: "400",
    fontSize: 18,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleStyle: {
    color: "white",
    fontSize: 16,
  },
  rightIconContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});
