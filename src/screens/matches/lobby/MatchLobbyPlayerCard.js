import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { Avatar } from "react-native-elements";
import { STATUSES } from "../../../utils/game/invite-status";

function MatchLobbyPlayerCard({ data }) {
  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      data={data}
      renderItem={({ index, item, separators }) => {
        return (
          <View
            key={item.id}
            style={{
              display: "flex",
              backgroundColor: "#1E2646",
              width: "45%",
              paddingVertical: 16,
              borderWidth: 0.5,
              borderColor:
                item.status === STATUSES.ACCEPTED ? "#5FC73D" : "yellow",
              borderRadius: 6,
            }}
          >
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <Image
                source={require("../../../../assets/emptyBox.png")}
                style={{ width: 21, height: 21, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                source={require("../../../../assets/image/default_avatar.jpg")}
                avatarStyle={{
                  height: 80,
                  width: 80,
                  resizeMode: "contain",
                  borderRadius: 40,
                }}
                containerStyle={{
                  height: 80,
                  width: 80,
                  resizeMode: "contain",
                  borderRadius: 40,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 29,
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                {item.player_name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#0B8140",
                  lineHeight: 16,
                  fontWeight: "bold",
                }}
              >
                {item.status === STATUSES.ACCEPTED ? "Confirmed" : "Pending"}
              </Text>
            </View>
          </View>
        );
      }}
      numColumns={2}
    />
  );
}

export default MatchLobbyPlayerCard;
