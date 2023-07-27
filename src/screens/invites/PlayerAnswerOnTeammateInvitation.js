import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
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

export default class PlayerAnswerOnTeammateInvitation extends Component {
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

  getPlayerInvitations = async () => {
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
          "error in PlayerAnswerOnTeammateInvitation Component getPlayerInvitations function",
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
      this.PlayerService.acceptRequestAddTeammmate(invite.id)
        .then((response) => {
          Alert.alert("Teammate", "Request has been accepted.");
          this.setState({ accButtonLoading: false });
          this.setState({
            invitations: prevInvitations.filter((inv) => inv.id !== invite.id),
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
    });
  };

  handleInvite = (invite) => {
    this.acceptInvite(invite);
  };

  declineInviteDialog = (invite) => {
    Alert.alert(
      "Invitation",
      "Are u sure want to decline request?",
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
      this.PlayerService.rejectRequestAddTeammmate(invite.id)
        .then((resposne) => {
          Alert.alert("Teammate", "Request has been rejected.");
          this.setState({
            invitations: prevInvitations.filter((inv) => inv.id !== invite.id),
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
    });
  };

  getImageUri = (invite) => {
    switch (invite.authorable_type) {
      case "user": {
        return this.ImageService.getPlayerAvatarUri(
          invite?.authorable?.avatar,
          invite?.authorable_id
        );
      }
      case "team": {
        return this.ImageService.getTeamUriImage(
          invite?.authorable_id,
          invite?.authorable?.avatar
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
                    // source={this.getImageUri(invite)}
                    source={require("../../../assets/image/default_avatar.jpg")}
                    inviteType={"invited_teammate"}
                    invitedable={invite.invitedable}
                    authorable={invite.authorable}
                    inviteeable={invite.inviteeable}
                    onPressAccept={() => this.handleInvite(invite)}
                    onPressDecline={() => this.declineInviteDialog(invite)}
                    navigation={this.props.navigation}
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
