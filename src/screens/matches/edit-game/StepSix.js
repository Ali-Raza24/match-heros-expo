import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Colors from "../../../../assets/Colors";
import PlayerService from "../../../services/PlayerService";
// import ErrorText from "./ErrorText";
import { useSelector } from "react-redux";
import InvitePlayers from "../../../component/molecules/InvitePlayers";

const playerService = new PlayerService();
const { width, height } = Dimensions.get("window");
export default function StepSix(props) {
  const [players, setPlayers] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextLink, setNextLink] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const currentUser = useSelector((store) => store.user);
  useEffect(() => {
    getAllPlayers();
  }, []);

  // Get All players from the api
  const getAllPlayers = async () => {
    setLoading(true);
    try {
      const response = await playerService.getAllTeammates();
      let users = response.data.teamPlayers.data;
      users =
        users.length > 0 &&
        users.map((u) => ({
          id: u.player_id,
          name: u.player_name,
        }));
      setNextLink(response.data.teamPlayers.links.next);
      setPlayers([...players, ...users]);
    } catch (error) {
      console.log("Step SIX Error" + JSON.stringify(error.response?.data));
      console.log("Step SIX Error " + JSON.stringify(error));
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (nextLink) {
      setEndReached(true);
      playerService.getNextPlayers(nextLink).then((response) => {
        setEndReached(false);
        setNextLink(response.teamPlayers.links.next);
        const playersList = response.teamPlayers.data.map((u) => ({
          id: u.player_id,
          name: u.player_name,
        }));
        setPlayers([...players, ...playersList]);
      });
    }
  };

  const renderFooter = () => {
    return endReached ? (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size={50} color="#2b87ff" animating={true} />
        </View>
      </View>
    ) : null;
  };

  if (loading) {
    return (
      <View style={styles.cardStyle}>
        <ActivityIndicator size={50} color="#2b87ff" animating={true} />
      </View>
    );
  }

  return (
    <>
      <InvitePlayers
        wizardRef={() => props.wizardRef.current.next()}
        headerText={true}
        setValues={props.setValues}
        values={props.values}
      />
    </>
  );
}

const styles = StyleSheet.create({
  activeTabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  cardStyle: {
    height: 205,
    flex: 1,
    marginLeft: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "white",
    width: width - 52,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  segmentSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingHorizontal: 50,
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
    fontFamily: "SourceSansPro-SemiBold",
  },
});
