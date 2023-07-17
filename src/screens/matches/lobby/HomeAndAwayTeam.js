import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Loader } from "../../../component/_shared/Loader";
import { AwayTeam } from "./AwayTeam";
import { TeamData } from "./data";
import { GameLobbyButton } from "./GameLobbyButton";
import { HomeTeam } from "./HomeTeam";
import GameService from "../../../services/GameService";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  allConfirmedPlayers,
  allInvitedPlayersAction,
  cancelRemovePlayerFromGameLobby,
  removePlayerFromGameLobby,
} from "../../../redux/actions/gamelobby.action";
import Colors from "../../../../assets/Colors";
import { STATUSES } from "../../../utils/game/invite-status";
import { displayDangerToast, displaySuccessToast } from "../../../utils/toast";
import { unionBy } from "lodash";
import PlayerService from "../../../services/PlayerService";
import MatchLobbyPlayerCard from "./MatchLobbyPlayerCard";

const playerService = new PlayerService();
const gameService = new GameService();
export const HomeAndAwayTeamList = ({
  gameId,
  creatorId,
  gameStatus,
  teams,
  playersList,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [invitedPlayers, setInvitedPlayers] = useState([]);
  const [hometeam, setHomeTeam] = useState([]);
  const [awayTeam, setAwayTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [joinInvitationRequests, setJoinInvitationRequestions] = useState([]);
  const toast = useToast();
  const navigation = useNavigation();
  const gameLobbyState = useSelector((state) => state.gameLobby);
  const currentUserId = useSelector((state) => state.user?.id);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
    if (gameId) {
      getInvitedPlayers();
    }
    return () => {
      setMounted(false);
    };
  }, [gameId]);
  console.log("HomeAndAwayScreen Mounted Value is:!...", mounted);
  async function getInvitedPlayers() {
    setLoading(true);
    try {
      console.log("in Try Block HomeAndAwayTeam");
      const response = await gameService.getGameInvitedPlayers(gameId);
      console.log("response");
      await getJoinRequestsInvitedPlayers(gameId);
      console.log("getJoinRequestsInvitedPlayers(gameId)", creatorId);
      const invitedTeam = response.invitedTeam;
      const organizerResponse = await playerService.getPlayer(creatorId);
      console.log("playerService.getPlayer(creatorId)", organizerResponse);
      const gameOrganizer = {
        player_id: response.creatorId,
        player_name: organizerResponse.name,
        status: STATUSES.ACCEPTED,
        game_id: gameId,
      };
      const unionPlayers = unionBy(invitedTeam, "player_id");
      const players = [gameOrganizer, ...unionPlayers];
      const _hometeam = [...players].filter((player) => player.team === "home");
      const _awayteam = [...players].filter((player) => player.team === "away");
      setHomeTeam(_hometeam);
      setAwayTeam(_awayteam);
      const confirmedPlayers = players.filter((p) => p.status === "accepted");
      dispatch(allConfirmedPlayers(confirmedPlayers));
      dispatch(allInvitedPlayersAction(players));
      setInvitedPlayers(players);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error?.response?.data;
      toast.show("Something went wrong", { type: "danger", placement: "top" });
      console.log(`${getInvitedPlayers.name} Error`, error);
      // console.log('Game Lobby Screen Error', err);
    }
  }

  async function getJoinRequestsInvitedPlayers(gameId) {
    console.log("game id is in HomeAndAwayTeam", gameId);
    try {
      const response = await gameService.getGameJoinInvitationRequests(gameId);
      const data = response.data;
      const invites = data.team;
      if (invites) {
        setJoinInvitationRequestions(invites);
      }
    } catch (error) {
      console.log(
        getJoinRequestsInvitedPlayers.name +
          " Error in getJoinRequestsInvitedPlayers function",
        error?.response.data
      );
    }
  }

  // This function will move player from home team to away team and vice versa.
  async function toggleGamePlayerTeam(playerId) {
    try {
      const response = await gameService.switchGamePlayerTeam(gameId, playerId);
      console.log(response.data);
    } catch (error) {
      console.log("Toggle Game Player Team");
    }
  }

  const handleSelectIndexChange = (index) => {
    setSelectedIndex(index);
  };

  const handleAvatarPress = (playerId) => {
    navigation.navigate("ViewPlayer", { id: playerId });
  };

  const handleRemovePlayer = () => {
    if (gameLobbyState.creatorRemovePlayer) {
      dispatch(cancelRemovePlayerFromGameLobby());
      return;
    }
    dispatch(removePlayerFromGameLobby());
    return;
  };

  const handleRequestToJoinGame = async () => {
    setButtonLoading(true);
    try {
      const response = await gameService.playerJoinToGame(gameId);
      displaySuccessToast(toast, response.data.message);
      setButtonLoading(false);
      navigation.navigate("Matches");
      return;
    } catch (error) {
      setButtonLoading(false);
      console.log(handleRequestToJoinGame.name + " Error", error);
      displayDangerToast(toast, "Something went wrong.");
    }
  };

  const displayButtons = (creatorId, currentUserId) => {
    const invitedPlayers = [...gameLobbyState.allInvitedPlayers];
    const isAuthPlayerInvited = invitedPlayers.find(
      (p) => p.player_id === currentUserId
    );
    const isJoinRequestSentByAuthUser = joinInvitationRequests.find(
      (invite) => invite.player_id === currentUserId
    );
    console.log(
      "isJoinRequestSentByAuthUser.status",
      isJoinRequestSentByAuthUser?.status
    );
    // if user is in the game then the button should be decline
    const homeTeam = teams.length > 0 ? [...teams[0].players] : [];
    const awayTeam = teams.length > 1 ? [...teams[1].players] : [];
    const allPlayers = [...homeTeam, ...awayTeam];
    const isCurrentUserInGame = allPlayers.find(
      (player) => player.id === currentUserId
    );
    if (Number(creatorId) === Number(currentUserId)) {
      return (
        <>
          <GameLobbyButton
            buttonBackground="#00A2FF"
            text="Invite Players"
            textColor="white"
          />
          <GameLobbyButton
            onPress={handleRemovePlayer}
            buttonBackground="#000000"
            text={
              gameLobbyState.creatorRemovePlayer ? "Cancel" : "Remove Players"
            }
            textColor="#BE1C0A"
          />
        </>
      );
    }
    if (isCurrentUserInGame) {
      return null;
    }

    if (
      isAuthPlayerInvited &&
      isAuthPlayerInvited?.status === STATUSES.ACCEPTED &&
      gameStatus === STATUSES.ACCEPTED
    ) {
      return (
        <>
          <GameLobbyButton
            buttonBackground={Colors.green}
            text="Join Game"
            textColor="white"
          />
        </>
      );
    }

    if (
      isJoinRequestSentByAuthUser?.status === STATUSES.PENDING &&
      isAuthPlayerInvited?.status === STATUSES.PENDING
    ) {
      return (
        <GameLobbyButton
          buttonBackground="#000000"
          text="Waiting for the Response"
          textColor="#BE1C0A"
        />
      );
    }
    return buttonLoading ? (
      <ActivityIndicator />
    ) : (
      <GameLobbyButton
        onPress={handleRequestToJoinGame}
        buttonBackground="#00A2FF"
        text="Request to Join Game"
        textColor="white"
      />
    );
  };

  if (loading && invitedPlayers.length < 0) {
    return <Loader loading={loading} />;
  }
  return (
    <View style={styles.container}>
      {selectedIndex === 0 && (
        <MatchLobbyPlayerCard data={creatorId} players={playersList} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  container: {
    marginTop: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    height: 32,
    width: 220,
  },
  tabTextStyle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    // fontFamily: "SourceSansPro-SemiBold",
  },
  activeTabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
});
