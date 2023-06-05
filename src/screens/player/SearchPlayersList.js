import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import PlayerList from "./PlayerList";
import SvgImage from "../../../assets/signIn.svg";
function SearchPlayersList(props) {
  const playerList = props.route.params.players;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgImage
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
      />
      {playerList.length > 0 ? (
        <PlayerList players={playerList} navigation={props.navigation} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Hero not found!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default SearchPlayersList;
