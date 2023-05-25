import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import PlayerService from "../../services/PlayerService";
import ImageService from "../../services/ImageService";
import InvitationCard from "./InvitationCard";
import TextBold from "../../component/_shared/TextBold";
import { getStatusBarHeight } from "react-native-status-bar-height";
import SvgImage from "../../../assets/signIn.svg";
const { width, height } = Dimensions.get("window");

export default class PlayerAnswerOnInvitation extends Component {
  constructor(props) {
    super(props);
    this.PlayerService = new PlayerService();
    this.ImageService = new ImageService();
    this.state = {
      invitations: [],
      refreshing: false,
      accButtonLoading: false,
      decButtonLoading: false,
      showSpinner: true,
    };
  }

  componentDidMount() {
    this.getPlayerInvitations();
  }

  getPlayerInvitations = () => {
    return this.PlayerService.getPlayerInvitations()
      .then((response) =>
        this.setState(
          {
            invitations: response.data,
            showSpinner: false,
            refreshing: false,
          },
          () => console.log(this.state)
        )
      )
      .catch((err) =>
        console.log(
          "error in PlayerAnswerOnInvitation Component getPlayerInvitations function",
          err
        )
      );
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getPlayerInvitations().then(() =>
      this.setState({ refreshing: false })
    );
  };

  acceptInvite = (invite) => {
    const prevInvitations = this.state.invitations;
    this.setState({ accButtonLoading: true }, () => {
      if (invite.authorable_type === "team") {
        this.PlayerService.acceptTeamInvitation(invite.id)
          .then((response) => {
            this.setState({ accButtonLoading: false });
            this.setState({
              invitations: prevInvitations.filter(
                (inv) => inv.id !== invite.id
              ),
            });
          })
          .catch((err) => {
            console.log(err.response.data);
            Alert.alert(
              `Error occur`,
              "Please try again later",
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.navigate("Dashboard"),
                },
              ],
              { cancelable: false }
            );
          });
      } else {
        this.PlayerService.acceptGameInvitation(
          invite.id,
          invite.invitedable_id
        )
          .then((response) => {
            console.log(response);
            this.setState({ accButtonLoading: false });
            this.setState({
              invitations: prevInvitations.filter(
                (inv) => inv.id !== invite.id
              ),
            });
          })
          .catch((err) => {
            console.log(err.response.data);
            Alert.alert(
              `Error occur`,
              "Please try again later",
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.navigate("Dashboard"),
                },
              ],
              { cancelable: false }
            );
          });
      }
    });
  };

  handleInvite = (invite) => {
    const prevInvitations = [...this.state.invitations];
    //const invite = prevInvitations.find(invite => invite.id == inviteId);
    if (invite.fee && invite.fee != "") this.handleFeeInvitation(invite);
    else this.handleNoFeeInvitation(invite);
  };

  handleFeeInvitation = (invite) => {
    Alert.alert(
      "Invitation",
      "Are u sure?",
      [
        {
          text: "OK",
          onPress: () =>
            Alert.alert(
              `Accepting this will cost you ${invite.fee} credits`,
              "Are you sure?",
              [
                {
                  text: "OK",
                  onPress: () => this.acceptInvite(invite),
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ]
            ),
        },

        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  handleNoFeeInvitation = (invite) => {
    Alert.alert(
      "Invitation",
      "Are u sure?",
      [
        {
          text: "OK",
          onPress: () => this.acceptInvite(invite),
        },

        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  declineInviteDialog = (invite) => {
    Alert.alert(
      "Invitation",
      "Are u sure want to decline invitation?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => this.declineInvite(invite),
        },
      ],
      { cancelable: false }
    );
  };

  declineInvite = (invite) => {
    const prevInvitations = this.state.invitations;
    this.setState({ decButtonLoading: true }, () => {
      if (invite.authorable_type === "team") {
        this.PlayerService.declineTeamInvitation(invite.id)
          .then((resposne) => {
            this.setState({ decButtonLoading: false });
            this.setState({
              invitations: prevInvitations.filter(
                (inv) => inv.id !== invite.id
              ),
            });
          })
          .catch((err) => {
            console.log(err.response.data);
            Alert.alert(
              `Error occur`,
              "Please try again later",
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.navigate("Dashboard"),
                },
              ],
              { cancelable: false }
            );
          });
      } else {
        this.PlayerService.declineGameInvitation(
          invite.id,
          invite.invitedable_id
        )
          .then((resposne) => {
            this.setState({ decButtonLoading: false });
            this.setState({
              invitations: prevInvitations.filter(
                (inv) => inv.id !== invite.id
              ),
            });
          })
          .catch((err) => {
            console.log(err.response.data);
            Alert.alert(
              `Error occur`,
              "Please try again later",
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.navigate("Dashboard"),
                },
              ],
              { cancelable: false }
            );
          });
      }
    });
  };

  getImageUri = (invite) => {
    switch (invite.authorable_type) {
      case "user": {
        return this.ImageService.getPlayerAvatarUri(
          invite?.authorable?.avatar,
          invite.authorable_id
        );
      }
      case "team": {
        return this.ImageService.getTeamUriImage(
          invite.authorable_id,
          invite?.authorable?.avatar
        );
      }
      default:
        return null;
    }
  };

  render() {
    // console.log("params id is:$#$#$#", this.props.route.params?.playerId);
    if (this.state.showSpinner) {
      return (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgImage
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 16,
              bottom: 0,
            }}
          />
          {/* <LinearGradient
            style={{ flex: 1, width: "100%" }}
            colors={["#5E89E2", "#0E1326"]}
          > */}
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              size={50}
              color="#2b87ff"
              animating={this.state.loading}
            />
          </View>
          {/* </LinearGradient> */}
        </View>
      );
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
        <ScrollView
          style={styles.mainContainer}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
            />
          }
        >
          <SafeAreaView style={{ flex: 1 }}>
            {!this.state.showSpinner && this.state.invitations.length === 0 && (
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
            {this.state.invitations.map((invite) => {
              return (
                <View key={invite.id} style={{ paddingBottom: 10 }}>
                  <InvitationCard
                    // accButtonLoading={this.state.accButtonLoading}
                    // decButtonLoading={this.state.decButtonLoading}
                    // source={this.getImageUri(invite)}
                    source={require("../../../assets/image/default_avatar.jpg")}
                    inviteType={
                      invite.invitedable_type === "game"
                        ? "invite_game"
                        : "invited_team"
                    }
                    invitedable={invite.invitedable}
                    authorable={invite.authorable}
                    inviteeable={invite.inviteeable}
                    onPressAccept={() => this.handleInvite(invite)}
                    onPressDecline={() => this.declineInviteDialog(invite)}
                    onViewGame={() =>
                      this.props.navigation.navigate("ViewGame", {
                        id: this.props.route.params?.id,
                      })
                    }
                    onViewPlayer={() =>
                      this.props.navigation.navigate("ViewPlayer", {
                        id: this.props.route.params?.playerId,
                      })
                    }
                  />
                </View>
              );
            })}
          </SafeAreaView>
        </ScrollView>

        {/* </LinearGradient> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
    paddingVertical: 10,
  },
  teamName: {
    fontSize: 20,
  },
  label: {
    color: "white",
    // fontFamily: "SourceSansPro-Bold",
    fontSize: 20,
  },
});
