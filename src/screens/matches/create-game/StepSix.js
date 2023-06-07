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
import Buttons from "./ButtonGroup";
import Colors from "../../../../assets/Colors";
import PlayerService from "../../../services/PlayerService";
// import ImageService from "../../../../services/ImageService";
import { TabComponent } from "./TabView";
import SegmentedControlTab from "react-native-segmented-control-tab";
// import ErrorText from "./ErrorText";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import GreenLinearGradientButton from "../../../component/molecules/GreenLinearGradientButton";
import InvitePlayers from "../../../component/molecules/InvitePlayers";

const playerService = new PlayerService();
const { width, height } = Dimensions.get("window");
/**
 *
 * @param {values,setValues,wizardRef,isLastStep,...props,navigation} props [values,setValues,wizardRef, isLastStep]:These are coming from the parent component
 * @param {...props,navigation} props are coming from the react navigation.
 * @returns The React Component
 */
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
  console.log("Step Six Component Called loading value is", props.loading);
  const getAllPlayers = async () => {
    setLoading(true);
    try {
      const response = await playerService.getAllTeammates();
      let users = response?.data;
      users =
        users.length > 0 &&
        users.map((u) => ({
          id: u.role_id,
          name: u.name,
        }));
      console.log("Friends", users);
      setNextLink(response?.data);
      setPlayers(users);
    } catch (error) {
      console.log(error);
      console.log("Step SIX Error" + JSON.stringify(error.response?.data));
    }
    setLoading(false);
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

  if (loading) {
    return (
      <View style={styles.cardStyle}>
        <ActivityIndicator size={50} color="#2b87ff" animating={true} />
      </View>
    );
  }
  console.log("players list is:#@#@", players);
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
    // backgroundColor: "white",
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
    // fontFamily: "SourceSansPro-SemiBold",
  },
  teammateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 16,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  itemSeprator: {
    // borderTopWidth: 0.5,
    // borderTopColor: '#203761',
    borderBottomWidth: 0.5,
    borderBottomColor: "#203761",
    width: "90%",
    marginTop: 4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  teammateNameStyle: {
    color: "white",
    fontSize: 16,
    flex: 2,
    paddingLeft: 20,
    alignSelf: "flex-end",
    paddingBottom: 12,
  },
  teammateViewProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    alignSelf: "flex-end",
    paddingBottom: 12,
  },
  teammateViewProfileText: {
    color: Colors.green,
    fontSize: 16,
  },
  avatarStyle: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },

  segmentSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  activeTabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
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
    // fontFamily: 'SourceSansPro-SemiBold'
  },

  buttonStyle: {
    backgroundColor: "transparent",
  },
});
