import React, { Component } from "react";
import {
  Alert,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import TeamService from "../../services/TeamService";
import ImageService from "../../services/ImageService";
import InvitationCard from "./InvitationCard";
import TextBold from "../../component/_shared/TextBold";
import { getStatusBarHeight } from "react-native-status-bar-height";
import SvgImage from "../../../assets/signIn.svg";

const { width, height } = Dimensions.get("window");
export default class TeamInvites extends Component {
  constructor(props) {
    super(props);
    this.TeamService = new TeamService();
    this.ImageService = new ImageService();
    this.state = {
      teamId: "",
      teamInvites: [],
      refreshing: false,
      showSpinner: false,
    };
  }

  componentDidMount() {
    this.getTeamInvites();
  }

  getTeamInvites() {
    let teamId = this.state.teamId;
    if (!teamId) {
      teamId = this.props.route.params.id;
      this.setState({ teamId });
    }
    console.log(teamId);
    this.setState({ showSpinner: true }, () => {
      this.TeamService.TeamJoinRequests(teamId)
        .then((response) => {
          console.log(response);
          this.setState({
            teamInvites: response.game_requests,
            showSpinner: false,
          });
        })
        .catch((err) => {
          console.log("getTeamInvites", err.response ? err.response.data : err);
          this.setState({ showSpinner: false });
        });
    });
  }

  onRefresh = () => {
    // this.setState({ refreshing: true });
    // this.getTeamInvites().then(() => this.setState({ refreshing: false }));
  };

  acceptInvite(inviteId) {
    Alert.alert(
      "Accept this invitation?",
      "Are you sure you want to accept this game invitation?",
      [
        {
          text: "OK",
          onPress: () => this.callServiceForAccept(inviteId),
        },

        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  callServiceForAccept(inviteId) {
    const prevInvites = this.state.teamInvites;
    this.TeamService.acceptTeamInvitation(inviteId)
      .then((response) => {
        alert(response.data.message);
        this.setState({
          teamInvites: prevInvites.filter((invite) => invite.id !== inviteId),
        });
      })
      .catch((err) => {
        console.log(
          "error in TeamInvites Component callServiceForAccept function",
          err
        );
      });
  }

  declineInvite(inviteId) {
    Alert.alert(
      "Decline this invitation?",
      "Are you sure you want to decline this game invitation?",
      [
        {
          text: "OK",
          onPress: () => this.callServiceForDecline(inviteId),
        },

        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  callServiceForDecline(inviteId) {
    const prevInvites = this.state.teamInvites;
    this.TeamService.declineTeamInvitation(inviteId)
      .then((response) => {
        alert(response.data.message);
        this.setState({
          teamInvites: prevInvites.filter((invite) => invite.id !== inviteId),
        });
      })
      .catch((err) => {
        console.log(
          "error in TeamInvites Component callServiceForDecline function",
          err
        );
      });
  }

  getImageUri = (invite) => {
    switch (invite.authorable_type) {
      case "user": {
        return this.ImageService.getPlayerAvatarUri(
          invite.authorable.avatar,
          invite.authorable_id
        );
      }
      case "team": {
        return this.ImageService.getTeamUriImage(
          invite.authorable_id,
          invite.authorable.avatar
        );
      }
      default:
        return null;
    }
  };

  render() {
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
            {!this.state.showSpinner && this.state.teamInvites.length === 0 && (
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
                  text="Team don't have any team invite yet."
                />
              </View>
            )}
            {this.state.teamInvites.map((invite) => {
              return (
                <View style={{ paddingBottom: 10 }} key={invite.id}>
                  <InvitationCard
                    // accButtonLoading={this.state.accButtonLoading}
                    // decButtonLoading={this.state.decButtonLoading}
                    source={this.getImageUri(invite)}
                    inviteType={"invite_team_game"}
                    invitedable={invite.invitedable}
                    authorable={invite.authorable}
                    inviteeable={invite.inviteeable}
                    onPressAccept={() => this.acceptInvite(invite.id)}
                    onPressDecline={() => this.declineInvite(invite.id)}
                  />
                </View>
              );
            })}
          </SafeAreaView>
        </ScrollView>
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
    // flex: 1
  },
});
