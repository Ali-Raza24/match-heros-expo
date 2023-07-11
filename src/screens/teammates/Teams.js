import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import PlayerService from "../../services/PlayerService";
import { SearchBar, FormLabel, Button, ListItem } from "react-native-elements";
import SegmentedControlTab from "react-native-segmented-control-tab";
// import FloatingButton from "../../component/_shared/FloatingButton";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { connect } from "react-redux";
import TextBold from "../../component/_shared/TextBold";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../assets/Colors";
import SvgImage from "../../../assets/signIn.svg";
import FloatingButton from "../../component/_shared/FloatingButton";
import InvitePlayers from "../../component/molecules/InvitePlayers";

const playerService = new PlayerService();
const Teams = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [nextLink, setNextLink] = useState("");
  const [endReached, setEndReached] = useState(false);
  const [showInvitePlayers, setShowInvitePlayers] = useState(false);

  useEffect(() => {
    getTeammates();
  }, []);

  async function getTeammates() {
    setLoading(true);
    try {
      const response = await playerService.getAllTeammates();
      const data = response.data.teamPlayers;
      console.log("teammates data##@#@#@#", data);
      const _teams = formatTeammate(data.data);
      setTeams(_teams);
      setNextLink(data?.links?.next);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    } catch (error) {
      console.log(`ERROR ${getTeammates.name}`, error);
      console.log(error?.response?.data);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }
  const renderEmptyList = () => {
    return (
      <View
        style={{
          paddingVertical: 100,
          paddingHorizontal: 26,
          width: "100%",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <TextBold
          style={{
            color: "white",
            paddingVertical: 20,
            lineHeight: 30,
            fontSize: 20,
            // fontFamily: 'SourceSansPro-Bold',
            textAlign: "center",
          }}
          text="No Teammates found"
        />
      </View>
    );
  };
  const handleLoadMore = () => {
    if (nextLink) {
      setEndReached(true);
      playerService.getNextPlayers(nextLink).then((response) => {
        setEndReached(false);
        setNextLink(response.teamPlayers.links.next);
        const teammates = formatTeammate(response.teamPlayers.data);
        setPlayers([...teams, ...teammates]);
      });
    }
  };

  function formatTeammate(_teams) {
    return _teams.map((member) => ({
      id: member.player_id,
      name: member.player_name,
    }));
  }

  function onRefresh() {
    setRefreshing(true);
    getTeammates().then(() => setRefreshing(false));
  }
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

  function displayTeammates() {
    if (teams && teams?.length > 0) {
      return (
        <FlatList
          data={teams}
          renderItem={({ item, index }) => {
            return (
              <>
                <View
                  key={item?.id}
                  // onPress={() =>
                  //   props.navigation.navigate("PublicProfile", {
                  //     id: item.id,
                  //   })
                  // }
                  style={styles.teammateContainer}
                >
                  <View
                    style={{
                      display: "flex",
                      flex: 2,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      style={styles.avatarStyle}
                      source={require("../../../assets/image/default_avatar.jpg")}
                    />
                    <Text style={styles.teammateNameStyle}>{item.name}</Text>
                  </View>
                  <View
                    // onPress={() => props.navigation.navigate("ViewPlayer", { id: item.id })}
                    style={styles.teammateViewProfileButton}
                  >
                    <Text style={styles.teammateViewProfileText}></Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                          props.navigation.navigate("TeammateChat", {
                            playerName: item.name,
                            playerId: item?.id,
                          })
                        }
                      >
                        <Image
                          source={require("../../../assets/chatIcon.png")}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: "contain",
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                          props.navigation.navigate("PublicProfile", {
                            id: item.id,
                          })
                        }
                      >
                        <Image
                          source={require("../../../assets/friendRequest.png")}
                          style={{
                            height: 60,
                            width: 60,
                            resizeMode: "contain",
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* <AntDesign
                      name="right"
                      style={{ marginTop: 2, marginHorizontal: 4 }}
                      size={18}
                      color="#0B8140"
                    /> */}
                  </View>
                </View>
                <View style={styles.itemSeprator} />
              </>
            );
          }}
          keyExtractor={(item, index) => index}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyList}
          onEndReached={handleLoadMore}
          showsVerticallScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>
            You Don't have any team yet!
          </Text>
        </View>
      );
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SvgImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 16,
            bottom: 0,
          }}
        />
        <ActivityIndicator size={50} color="#2b87ff" animating={loading} />
      </View>
    );
  }
  return (
    <>
      <SvgImage
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
      />

      <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />
      <View
        style={styles.mainContainer}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <View style={{ flex: 1, paddingVertical: 10 }}>
          {selected === 0 && displayTeammates()}
        </View>
        <FloatingButton onPress={() => props.navigation.navigate("Heros")} />
        {/* {showInvitePlayers && (
          <InvitePlayers wizardRef={() => setShowInvitePlayers(false)} />
        )} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    // paddingBottom: 12,
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

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(Teams);
