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
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Colors from "../../../assets/Colors";
import PlayerService from "../../services/PlayerService";
import { useSelector } from "react-redux";
import GreenLinearGradientButton from "./GreenLinearGradientButton";

const playerService = new PlayerService();
const { width, height } = Dimensions.get("window");
//   /**
//    *
//    * @param {values,setValues,wizardRef,isLastStep,...props,navigation} props [values,setValues,wizardRef, isLastStep]:These are coming from the parent component
//    * @param {...props,navigation} props are coming from the react navigation.
//    * @returns The React Component
//    */
export default function InvitePlayers(props) {
  const [players, setPlayers] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextLink, setNextLink] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const currentUser = useSelector((store) => store.user);
  const [invitePlayersList, setInvitePlayersList] = useState([]);
  const [selectedPlayerList, setSelectedPlayersList] = useState([{}]);
  useEffect(() => {
    getAllPlayers();
  }, []);
  console.log("isAllPlayers list is:#@#@#@", props?.isAllPlayers);
  // Get All players from the api
  // console.log("Step Six Component Called loading value is", props.loading);
  const getAllPlayers = async () => {
    setLoading(true);
    try {
      // playerService.getAllTeammates()
      const response = props?.isAllPlayers
        ? await playerService?.getAllTeammates()
        : await playerService?.getAllPlayers();
      let users = [
        ...response?.data?.teamPlayers[0]?.related_mates,
        ...response?.data?.teamPlayers[0]?.team_mates,
      ];
      users =
        users?.length > 0 &&
        users?.map((u) => ({
          id: u.role_id,
          name: u.name,
        }));
      console.log(
        "Friends",
        users,
        response?.data?.teamPlayers[0]?.related_mates
      );
      setNextLink(response?.data);
      props?.isAllPlayers
        ? setPlayers([...response?.data])
        : setPlayers([
            ...response?.data?.teamPlayers[0]?.related_mates,
            ...response?.data?.teamPlayers[0]?.team_mates,
          ]);
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
        // setPlayers([...players, ...playersList]);
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.cardStyle}>
        <ActivityIndicator size={50} color="#2b87ff" animating={true} />
        {/* <ImageBackground
            style={{
              width: "100%",
              flex: 1,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={
              props.cardColor
                ? ""
                : require("../../../../assets/image/roundedGameCardBackground.png")
            }
          >
            <ActivityIndicator size={50} color="#2b87ff" animating={true} />
          </ImageBackground> */}
      </View>
    );
  }
  const invitePlayersToMatch = async () => {
    console.log("players ids is:#@#@#@", invitePlayersList);
    const data = {
      player_ids: invitePlayersList,
    };
    try {
      const response = await playerService.invitePlayersToMatch(
        props?.gameId,
        data
      );
      Alert.alert(
        `Success!`,
        "Invitation sent Successfully!",
        [
          {
            text: "OK",
            onPress: () => props.wizardRef(),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log("invitation API error is:#@#@#@", error?.response);
      Alert.alert(
        `Sorry!`,
        "Please try again!" + props?.gameId,
        [
          {
            text: "OK",
            onPress: () => props.wizardRef(),
          },
        ],
        { cancelable: false }
      );
    }
  };
  const selectedFunc = () => {
    const myArray = invitePlayersList.map((str) => ({ id: str }));
    if (props?.setValues) {
      props?.setValues({ ...props.values, player_ids: [...myArray] });

      props.wizardRef();
    } else {
      invitePlayersToMatch();
    }
    // console.log("selected players is:#@#@#", myArray);
  };
  return (
    <View style={{ flex: 1 }}>
      {props?.headerText && <Text style={styles.text}>Invite Players</Text>}
      <View style={{ marginVertical: props?.headerText ? 10 : 0, flex: 1 }}>
        <FlatList
          data={players}
          renderItem={({ item, index }) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (invitePlayersList.includes(item?.id)) {
                      let newInvitesPlayer = invitePlayersList.filter(
                        (data) => data != item?.id
                      );
                      setInvitePlayersList(newInvitesPlayer);
                    } else {
                      setInvitePlayersList([...invitePlayersList, item?.id]);
                    }
                  }}
                  key={item?.id}
                  style={styles.teammateContainer}
                >
                  <Image
                    style={styles.avatarStyle}
                    source={require("../../../assets/image/default_avatar.jpg")}
                  />
                  <Text style={styles.teammateNameStyle}>{item.name}</Text>
                  <View
                    // onPress={() => props.navigation.navigate("ViewPlayer", { id: item.id })}
                    style={styles.teammateViewProfileButton}
                  >
                    <Text style={styles.teammateViewProfileText}></Text>
                    <View style={{ marginLeft: 8 }}>
                      <Image
                        source={
                          invitePlayersList.includes(item?.id)
                            ? require("../../../assets/checkedGreen.png")
                            : require("../../../assets/emptyBox.png")
                        }
                        style={{ width: 21, height: 21, resizeMode: "contain" }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.itemSeprator} />
              </>
            );
          }}
          keyExtractor={(item, index) => index}
          ListFooterComponent={renderFooter}
          // ListEmptyComponent={renderEmptyList}
          // onEndReached={handleLoadMore}
          showsVerticallScrollIndicator={false}
          onEndReachedThreshold={0.5}
          // onRefresh={onRefresh}
          // refreshing={refreshing}
        />
      </View>
      {/* <View style={styles.segmentSection}>
          <SegmentedControlTab
            values={["Players List", "Group List"]}
            selectedIndex={selected}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={styles.activeTabStyle}
            onTabPress={(index) => setSelected(index)}
          />
        </View>
        {selected === 0 && (
          <TabComponent
            renderFooter={renderFooter}
            removeItemFn={props.removePlayer}
            players={props.players}
            addItemFn={props.addPlayer}
            data={players}
            handleLoadMore={handleLoadMore}
          />
        )}
        {props.loading ? (
          <ActivityIndicator />
        ) : (
          <Buttons
            {...props}
            isLastStep={props.isLastStep}
            onPress={() => {
            
              props.setShowHowManyWeeks(true);
            
            }}
          />
        )} */}
      {/* {props.values.game_fee != 0 && props.values.fee_type.length > 0 ? (
          <Buttons {...props} />
        ) : ( */}
      {/* <Buttons {...props} /> */}
      <View style={{ width: "70%", alignSelf: "center", marginBottom: 12 }}>
        <GreenLinearGradientButton
          title={"SEND INVITES"}
          // onSelect={() => props.wizardRef.current.next()}
          onSelect={selectedFunc}
          // onSelect={props.wizardRef}
          height={45}
          onPress={() => console.log("second")}
          loading={false}
          color={["#0B8140", "#0A5129"]}
        />
        {/* // <DisableButtonGroup {...props} />
        )} */}
      </View>
    </View>
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
