import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, ListItem, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class InvitationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteText: "",
    };
  }

  componentDidMount() {
    const inviteText = this.inviteText();
    console.log(inviteText);
    this.setState({ inviteText });
  }

  inviteText = () => {
    const type = this.props.inviteType;
    if (type === "invited_team") {
      return `Team ${this.props?.authorable?.name} invites you to join them.`;
    }
    if (type === "invited_teammate") {
      return `${this.props?.authorable?.name} invites you as a Teammate.`;
    }
    if (type === "join_team") {
      return `Player ${this.props?.authorable?.name} wants to join your ${this.props?.inviteeable?.name} team.`;
    }
    //acc and decline join team: related type is same as above.
    if (type === "invite_game") {
      return `Player ${this.props?.authorable?.name} invites you to join game.`;
    }
    //join game
    if (type === "join_game") {
      return `Player ${this.props?.invitedable?.name} wants to join your game.`;
    }
    if (type === "invite_team_game") {
      return `Team ${this.props?.authorable?.name} challenged your team ${this.props?.inviteeable?.name}.`;
    }
  };

  render() {
    return (
      this.state.inviteText !== "" && (
        <View style={styles.cardContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              display: "flex",
              alignItems: "center",
              paddingHorizontal: 12,
            }}
          >
            <View style={styles.imageContainer}>
              <Image source={this.props.source} style={styles.image} />
            </View>
            <View style={styles.teamNameContainer}>
              <Text style={styles.teamName}>{this.state.inviteText}</Text>
              <TouchableOpacity
                onPress={this.props.onViewPlayer}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    lineHeight: 16.94,
                    color: "#0B8140",
                  }}
                >
                  View Profile
                </Text>
                <ListItem.Chevron
                  size={22}
                  color={"#0B8140"}
                  // containerStyle={{ alignSelf: "center", alignItems: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.infoContainer}> */}
          <View
            style={{
              width: "100%",
              height: 40,
              borderTopWidth: 0.5,
              borderTopColor: "#363e59",
              display: "flex",
              // backgroundColor: "#ffffff",
              alignItems: "center",
              paddingTop: 12,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={this.props.onPressAccept}
              style={{
                display: "flex",
                flexDirection: "row",
                height: 25,
                width: 75,
                alignItems: "center",
                alignSelf: "center",
                paddingLeft: 15,
              }}
            >
              <Image
                source={require("../../../assets/accept.png")}
                style={{
                  resizeMode: "contain",
                  width: 14,
                  height: 14,
                  marginRight: 6,
                }}
              />
              <Text
                style={{ fontWeight: "bold", fontSize: 14, color: "#0B8140" }}
              >
                Accept
              </Text>
            </TouchableOpacity>
            <View style={{}}>
              <TouchableOpacity
                onPress={this.props.onPressDecline}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: 25,
                  width: 75,
                  alignItems: "center",
                  alignSelf: "center",
                  paddingRight: 15,
                }}
              >
                <Image
                  source={require("../../../assets/decline.png")}
                  style={{
                    resizeMode: "contain",
                    width: 14,
                    height: 14,
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontWeight: "bold", fontSize: 14, color: "#CB3223" }}
                >
                  Decline
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  height: 46,
                  width: 0.6,
                  backgroundColor: "#363e59",
                  right: -10,
                  // top: 0,
                  bottom: -10,
                }}
              />
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={this.props.onViewGame}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: 25,
                  width: 105,
                  alignItems: "center",
                  alignSelf: "center",
                  paddingRight: 15,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 14, color: "#4272B8" }}
                >
                  View Match
                </Text>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <ListItem.Chevron
                    size={22}
                    style={{
                      alignSelf: "center",
                    }}
                    containerStyle={{
                      alignSelf: "center",
                    }}
                    color={"#4272B8"}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    // flex: 1,
    backgroundColor: "#1E2646",
    borderColor: "#363e59",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 0.5,
    paddingVertical: 10,
  },
  imageContainer: {
    display: "flex",
    width: "30%",
    // height: 65,
    alignItems: "center",
    // marginBottom: 10,

    // borderRadius: 100,
  },
  infoContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#363e59",
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    // marginVertical: 10,
    borderRadius: 100,
  },
  teamNameContainer: {
    width: "70%",
    // paddingTop: 10,
    paddingLeft: 15,
    // marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    paddingVertical: 10,
    // fontFamily: "SourceSansPro-Regular",
    textAlign: "left",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // paddingVertical: 5,
  },
  buttonStyle: {
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 25,
  },
});
