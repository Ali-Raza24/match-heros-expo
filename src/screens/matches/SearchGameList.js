import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import MyGames from "./MyMatch";
import SvgImage from "../../../assets/signIn.svg";
function SearchGameList(props) {
  const games = props?.route?.params?.games;
  console.log("Game List in Search Game List Screen", games);
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
      {games?.length > 0 ? (
        <MyGames
          refreshing={() => console.log("on game refresh")}
          onRefresh={false}
          games={games}
          navigation={props.navigation}
        />
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
            Match not found!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default SearchGameList;
