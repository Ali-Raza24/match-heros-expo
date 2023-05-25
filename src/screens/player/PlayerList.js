import React, { Component } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-native";
import ImageService from "../../services/ImageService";

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.ImageService = new ImageService();
  }

  handleLocation(county, city) {
    var location = "No location";
    if (county != "" && city != "") {
      location = `${county}, ${city}`;
    } else if (county != "") location = county;
    else location = city;
    return location;
  }

  handlePlayerBackGround(id) {
    if (this.props.invitations) {
      if (this.props.invitations.findIndex((x) => x == id) > -1) {
        return { backgroundColor: "#b7cff4" };
      }
    }
  }

  render() {
    console.log("PlayersList in PlayersList Component is:%%%%%%%%%%%%%%%%");
    const { players } = this.props;
    return (
      <FlatList
        style={{ backgroundColor: "transparent" }}
        data={players}
        showsVerticallScrollIndicator={true}
        renderItem={({ item }) => (
          <ListItem
            // chevronColor={"white"}
            containerStyle={{
              alignItems: "center",
              backgroundColor: "transparent",
              borderBottomColor: "rgba(255,255,255,0.35)",
              justifyContent: "center",
              paddingTop: 10,
              flex: 1,
              paddingBottom: 10,
              height: 100,
            }}
            key={item.id}
            // title={item.name}
            onPress={() => this.props.onPress({ id: item.id })}
          >
            <Avatar
              containerStyle={{
                borderRadius: 30,
                borderColor: Colors.blue,
                borderWidth: 1,
                width: 60,
                height: 60,
                //  resizeMode: "contain",
              }}
              avatarStyle={{
                borderRadius: 30,
                borderColor: Colors.blue,
                borderWidth: 1,
                width: 60,
                height: 60,
                resizeMode: "contain",
              }}
              source={require("../../../assets/image/default_avatar.jpg")}
              //  source={ this.ImageService.getPlayerAvatarUri(item.avatar, item.id)}
            />
            <ListItem.Content>
              <ListItem.Title style={{ color: "white", fontSize: 16 }}>
                {item?.name}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron
              color={"white"}
              size={28}
              style={{ color: "#ffffff", alignSelf: "center" }}
              //   onPress={() => this.props.navigation.push("ViewPlayer", { id: p.id })}
            />
          </ListItem>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.props.handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
