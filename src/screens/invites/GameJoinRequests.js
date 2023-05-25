import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Button, Text } from "react-native-elements";
import GameService from "../../services/GameService";
import ImageService from "../../services/ImageService";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";
import InvitationCard from "./InvitationCard";
import TextBold from "../../component/_shared/TextBold";
import SvgImage from "../../../assets/signIn.svg";
const { width, height } = Dimensions.get("window");
export default class GameJoinRequests extends Component {
  constructor(props) {
    super(props);
    this.GameService = new GameService();
    this.ImageService = new ImageService();
    this.state = {
      joinRequests: [],
      gameId: "",
    };
  }

  componentDidMount() {
    console.log(this.props.route);
    const gameId = this.props.route.params.id;
    this.GameService.gameJoinRequests(gameId)
      .then((joinRequests) =>
        this.setState({
          joinRequests: joinRequests,
          gameId: gameId,
        })
      )
      .catch((err) => {
        console.log("error in Game Join Request Component", err.response?.data);
      });
  }

  acceptJoinRequest(joinRequestId, playerId) {
    const prevJoinRequets = this.state.joinRequests;
    this.GameService.acceptJoinRequest(
      this.state.gameId,
      joinRequestId,
      playerId
    )
      .then((response) => {
        if (response.data.error == true) {
          alert("Error occur, try again later");
        } else {
          this.setState({
            joinRequests: prevJoinRequets.filter(
              (join) => join.id !== joinRequestId
            ),
          });
        }
      })
      .catch((err) => {
        console.log(
          "error in GameJoinRequest Component in accept join function",
          err?.response?.data
        );
      });
  }

  declineJoinRequest(gameId, joinRequestId) {
    const prevJoinRequets = this.state.joinRequests;
    this.GameService.declineJoinRequest(gameId, joinRequestId)
      .then((response) => {
        this.setState({
          joinRequests: prevJoinRequets.filter(
            (join) => join.id !== joinRequestId
          ),
        });
      })
      .catch((err) => {
        console.log(
          "error in GameJoinRequest component and in declineJoinRequest function",
          err.response
        );
        alert("Error occur, try again later");
      });
  }

  handleNoRequest() {
    if (this.state.joinRequests.length === 0)
      return (
        <Text h4 style={{ padding: 10 }}>
          You don't have any join request yet.
        </Text>
      );
  }

  getImageUri = (invite) => {
    switch (invite.authorable_type) {
      case "user": {
        return this.ImageService.getPlayerAvatarUri(
          invite.authorable?.avatar || "",
          invite.authorable_id
        );
      }
      case "team": {
        return this.ImageService.getTeamUriImage(
          invite.authorable_id,
          invite.authorable?.logo || ""
        );
      }
      default:
        return null;
    }
  };

  render() {
    const showSpinner = this.state.joinRequests ? false : true;
    if (showSpinner) {
      return <ActivityIndicator />;
    }
    return (
      <View style={{ flex: 1 }}>
        <SvgImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 16,
            bottom: 0,
          }}
        />

        <StatusBar backgroundColor="#5E89E2" />
        <SafeAreaView style={styles.mainContainer}>
          {this.state.joinRequests.length === 0 && (
            <View
              style={{
                flex: 1,
                width: "100%",
                height: height - getStatusBarHeight() - 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextBold
                style={{ color: "white", fontSize: 25, textAlign: "center" }}
                text="You don't have any invites yet."
              />
            </View>
          )}
          {this.state.joinRequests.map((invite, index) => {
            return (
              <View
                key={index}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  flex: 1,
                  // height: 151,
                }}
              >
                <InvitationCard
                  // accButtonLoading={this.state.accButtonLoading}
                  // decButtonLoading={this.state.decButtonLoading}
                  // source={this.getImageUri(invite)}
                  source={require("../../../assets/image/default_avatar.jpg")}
                  inviteType={"join_game"}
                  invitedable={invite.invitedable}
                  authorable={invite.authorable}
                  inviteeable={invite.inviteeable}
                  onPressAccept={() =>
                    this.acceptJoinRequest(invite.id, invite.authorable_id)
                  }
                  onPressDecline={() =>
                    this.declineJoinRequest(this.state.gameId, invite.id)
                  }
                />
              </View>
            );
          })}
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
    paddingVertical: 20,
    // flex: 1
  },
  oneLineContainer: {
    backgroundColor: "rgba(0,0,0,0.35)",
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomColor: "white",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  teamName: {
    fontSize: 18,
    paddingVertical: 10,
    // fontFamily: "SourceSansPro-Regular",
    textAlign: "center",
    color: "white",
  },
  previewImage: {
    width: 65,
    height: 65,
    marginVertical: 10,
    borderRadius: 100,
  },
  buttonStyle: {
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 25,
  },
});
