import React, { Component } from "react";
import { Input, Button, ListItem } from "react-native-elements";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ImageService from "../../services/ImageService";
import PrimaryButton from "../../component/_shared/PrimaryButton";

export default class InviteToGamePlayerList extends Component {
  constructor(props) {
    super(props);
    this.ImageService = new ImageService();

    this.state = {
      invitedPlayers: {},
      fees: {},
      expand: "",
    };
  }

  componentDidMount() {
    const oldInvites = {};
    if (this.props.invitedPlayers) {
      this.props.invitedPlayers.map((player) => {
        oldInvites[player.id] = { id: player.id, fee: player.fee || 0 };
      });
      this.setState({ invitedPlayers: oldInvites });
    }
  }

  expand = (id) => {
    this.setState({ expand: id });
  };

  handleFeeInput = (fee, id) => {
    let feeList = this.state.fees;
    feeList[id] = fee;
    this.setState({ fees: feeList });
  };

  invitePlayer = (id) => {
    let invites = this.state.invitedPlayers;
    invites[id] = id;
    this.setState({ invitedPlayers: invites, expand: "" });
    this.props.invitePlayer({
      player: id,
      fee: this.state.fees[id] ? this.state.fees[id] : 0,
    });
  };
  removePlayer = (id) => {
    let invites = this.state.invitedPlayers;
    delete invites[id];
    this.setState({ invitedPlayers: invites, expand: "" });
    this.props.removePlayer(id);
  };

  renderFooter = () => {
    return this.props.endReached ? (
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

  render() {
    const { players } = this.props;
    return (
      <FlatList
        style={{ backgroundColor: "transparent" }}
        data={this.props.players}
        onEndReached={this.props.handleLoadMore}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.5}
        showsVerticallScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              marginBottom: 5,
            }}
          >
            <ListItem
              rightTitle={
                this.state.invitedPlayers[item.id] ? (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 14,
                      // fontFamily: 'SourceSansPro-Regular'
                    }}
                  >
                    Remove
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      //  fontFamily: 'SourceSansPro-Regular'
                    }}
                  >
                    Invite
                  </Text>
                )
              }
              showChevron={false}
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
              onPress={() =>
                this.state.invitedPlayers[item.id]
                  ? this.removePlayer(item.id)
                  : this.expand(item.id)
              }
              titleContainerStyle={{ paddingLeft: 20 }}
              titleStyle={{
                color: "white",
                fontSize: 16,
                //  fontFamily: 'SourceSansPro-Regular'
              }}
              avatar={
                item.avatar
                  ? this.ImageService.getPlayerAvatarUri(item.avatar, item.id)
                  : require("../../../assets/image/default_avatar.jpg")
              }
              avatarStyle={{
                borderRadius: 100,
                borderWidth: 0,
                width: 45,
                height: 45,
                resizeMode: "cover",
              }}
              key={item.id}
              title={item.name}
            />
            {this.state.expand === item.id && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingLeft: 10,
                }}
              >
                <View style={{ flexDirection: "row", flex: 2 }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      //  fontFamily: 'SourceSansPro-Regular'
                    }}
                  >
                    Charge
                  </Text>
                  <Input
                    returnKeyType="next"
                    blurOnSubmit={false}
                    containerStyle={styles.inputContainer}
                    onChangeText={(fee) => this.handleFeeInput(fee, item.id)}
                    value={
                      this.state.fees[item.id] ? this.state.fees[item.id] : 0
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <PrimaryButton
                    title={"Invite"}
                    onPress={() => this.invitePlayer(item.id)}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    flex: 2,
    borderBottomColor: "#c2c2c2",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
});
