import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button, Text } from "react-native-elements";
import TeamService from "../../services/TeamService";
import ImageService from "../../services/ImageService";
import InvitationCard from "./InvitationCard";
import SvgImage from "../../../assets/signIn.svg";

var width = Dimensions.get("window").width;
export default class TeamJoinRequests extends Component {
  constructor(props) {
    super(props);
    this.TeamService = new TeamService();
    this.ImageService = new ImageService();
    this.state = {
      joinRequests: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getTeamJoinRequests();
  }

  getTeamJoinRequests() {
    const teamId = this.props.route.params.id;
    this.setState({ teamId });
    return this.TeamService.TeamJoinRequests(teamId)
      .then((res) => {
        console.log(res);
        this.setState({ joinRequests: res.join_requests });
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getTeamJoinRequests().then(() => this.setState({ refreshing: false }));
  };

  acceptJoinRequest(teamId, joinRequestId, userId) {
    const prevJoinRequets = this.state.joinRequests;
    this.TeamService.acceptPlayerJoinRequest(teamId, joinRequestId, userId)
      .then((response) => {
        if (response.error) {
          alert(response.message);
        } else {
          Alert.alert(
            `${response.data.message}`,
            "You will navigate to Dashboard to continue enjoy in Find A Five",
            [
              {
                text: "OK",
                onPress: () => {
                  this.setState({
                    joinRequests: prevJoinRequets.filter(
                      (join) => join.id !== joinRequestId
                    ),
                  });
                  this.props.navigation.state.params.onNavigateBack(response);
                  this.props.navigation.goBack();
                },
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  declineJoinRequest(teamId, joinRequestId) {
    const prevJoinRequets = this.state.joinRequests;
    this.TeamService.declinePlayerJoinRequest(teamId, joinRequestId)
      .then(() =>
        this.setState({
          joinRequests: prevJoinRequets.filter(
            (join) => join.id !== joinRequestId
          ),
        })
      )
      .catch((err) => {
        console.log("error", err.response);
      });
  }

  getImageUri = (invite) => {
    switch (invite.authorable_type) {
      case "user": {
        return this.ImageService.getPlayerAvatarUri(
          invite.invitedable.avatar,
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

  handleNoRequest() {
    if (this.state.joinRequests.length === 0)
      return (
        <Text style={{ padding: 10 }}>
          You don't have any jdoin request yet.
        </Text>
      );
  }

  render() {
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
            {this.state.joinRequests.length > 0 ? (
              this.state.joinRequests.map((invite) => {
                return (
                  <InvitationCard
                    // accButtonLoading={this.state.accButtonLoading}
                    // decButtonLoading={this.state.decButtonLoading}
                    source={this.getImageUri(invite)}
                    inviteType={"join_team"}
                    invitedable={invite.invitedable}
                    authorable={
                      invite.authorable_type === "user"
                        ? invite.invitedable
                        : invite.authorable
                    }
                    inviteeable={invite.inviteeable}
                    onPressAccept={() =>
                      this.acceptJoinRequest(
                        this.state.teamId,
                        invite.id,
                        invite.invitedable.id
                      )
                    }
                    onPressDecline={() =>
                      this.declineJoinRequest(this.state.teamId, invite.id)
                    }
                  />
                );
              })
            ) : (
              <Text style={{ padding: 10, color: "white" }} h4>
                You don't have any join request yet.
              </Text>
            )}
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
  oneLineContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width / 2 - 20,
    margin: 10,
    paddingBottom: 0,
    borderColor: "#ebebeb",
    borderWidth: 2,
    borderRadius: 5,
  },
  teamName: {
    fontSize: 20,
    textAlign: "center",
    color: "#1a0000",
  },
  previewImage: {
    width: 60,
    height: 60,
    paddingBottom: 50,
  },
  buttonStyle: {
    borderRadius: 5,
    marginTop: -5,
  },
});
