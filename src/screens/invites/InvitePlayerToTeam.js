import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Alert,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Picker,
} from "react-native";
import { SearchBar } from "react-native-elements";
import PlayerService from "../../services/PlayerService";
import TeamService from "../../services/TeamService";
import ImageService from "../../services/ImageService";
import PlayerList from "../../screens/player/PlayerList";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../../component/_shared/PrimaryButton";
import SvgImage from "../../../assets/signIn.svg";
export default class Players extends Component {
  constructor(props) {
    super(props);
    this.PlayerService = new PlayerService();
    this.TeamService = new TeamService();
    this.ImageService = new ImageService();
    this.state = {
      players: [],
      searchTerm: "",
      chosenPlayers: [],
      otherPlayers: [],
      showFilter: false,
      showLoadingIcon: false,
      invitations: [],
      teamId: "",
      nextLink: "",
      teamPlayers: [],
    };
  }

  componentDidMount() {
    const teamId = this.props.route.params.id;
    const teamPlayers = this.props.route.params.teamPlayers;
    this.setState({ teamId: teamId, teamPlayers: teamPlayers });
    this.getPlayers();
  }

  getPlayers = async () => {
    let params = { player: this.state.searchTerm };
    return this.PlayerService.getAllPlayers(params).then((response) => {
      this.setState({ nextLink: response.data.links.next });
      this.formatPlayers(response.data.data);
    });
  };

  handleLoadMore = () => {
    if (this.state.nextLink) {
      this.setState({ loading: true });
      this.PlayerService.getNextPlayers(this.state.nextLink).then(
        (response) => {
          this.setState({ nextLink: response.links.next });
          this.formatPlayers(response.data, true);
        }
      );
    }
  };

  //filter players which are not in team
  filterPlayers(players) {
    return players.filter(
      (player) =>
        this.state.teamPlayers.find(
          (teamPlayer) => teamPlayer.id === player.id
        ) === undefined
    );
  }

  formatPlayers(players, concat = false) {
    let formatedPlayers = this.filterPlayers(players).map((player) => {
      return {
        id: player.id,
        name: player.name,
        avatar: player.images.avatar,
        county: player.location ? player.location.county.name : "",
        city: player.location ? player.location.city.name : "",
      };
    });
    if (concat) {
      let oldPlayers = this.state.players;
      formatedPlayers = [...oldPlayers, ...formatedPlayers];
    }
    let other = formatedPlayers.filter(
      (player) => !this.state.chosenPlayers.includes(player)
    );
    this.setState({ players: formatedPlayers, otherPlayers: other });
  }

  onChange = (searchTerm) => {
    this.setState({ searchTerm: searchTerm }, () => this.getPlayers());
  };

  toggleInvite(object) {
    let isSelected = this.isChecked(object.id);
    if (!isSelected) {
      let invitationList = this.state.invitations;
      invitationList.push(object.id);
      let chosen = this.state.chosenPlayers;
      let newInvite = this.state.players.filter(
        (player) => player.id === object.id
      )[0];
      chosen.push(newInvite);
      let other = this.state.otherPlayers;
      other = other.filter((player) => player.id !== object.id);
      this.setState({
        invitations: invitationList,
        otherPlayers: other,
        chosenPlayers: chosen,
      });
    } else {
      let invitationList = this.state.invitations;
      invitationList = invitationList.filter(function (item) {
        return item !== object.id;
      });
      let newInvite = this.state.players.filter(
        (player) => player.id === object.id
      )[0];
      let chosen = this.state.chosenPlayers;
      chosen = chosen.filter((player) => player.id !== object.id);
      let other = this.state.otherPlayers;
      other.unshift(newInvite);
      console.log(other);
      this.setState({
        invitations: invitationList,
        otherPlayers: other,
        chosenPlayers: chosen,
      });
    }
  }

  isChecked(id) {
    return this.state.invitations.findIndex((x) => x == id) > -1;
  }

  sendInvitations = () => {
    this.TeamService.sendInvitations(this.state.teamId, this.state.invitations)
      .then((response) => {
        Alert.alert(
          "Invites are successfully sent",
          "",
          [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
          { cancelable: false }
        );
      })
      .catch((er) =>
        console.log(
          "error in InvitePlayerToTeam Component sendInvitations function",
          er.response
        )
      );
  };

  render() {
    return (
      <View
        style={{ flex: 1, marginTop: getStatusBarHeight() + 50 }}
        // colors={["#5E89E2", "#0E1326"]}
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
        <StatusBar backgroundColor="#5E89E2" />
        <View style={styles.mainContainer}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <PrimaryButton
              style={{ width: "100%" }}
              title="Send invitation"
              onPress={this.sendInvitations}
            />
          </View>
          <View style={styles.searchSection}>
            <View style={styles.search}>
              <TouchableOpacity style={{ paddingBottom: 15, paddingLeft: 10 }}>
                <Image
                  source={require("../../../../assets/image/search.png")}
                  style={{ width: 16, height: 16 }}
                />
              </TouchableOpacity>
              <SearchBar
                noIcon
                containerStyle={{
                  width: "100%",
                  backgroundColor: "transparent",
                  padding: 0,
                  margin: 0,
                  paddingLeft: 20,
                  borderTopWidth: 0,
                  justifyContent: "flex-start",
                  borderBottomWidth: 0,
                }}
                inputStyle={{
                  backgroundColor: "transparent",
                  paddingBottom: 0,
                  color: "white",
                }}
                lightTheme={true}
                onChangeText={this.onChange}
                placeholder={"Search Players"}
                placeholderTextColor="white"
              />
            </View>
          </View>
          {this.state.chosenPlayers.length > 0 && (
            <View style={{ paddingBottom: 10 }}>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  paddingVertical: 5,
                  marginTop: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>
                  Invited Players
                </Text>
              </View>
              <PlayerList
                invitations={this.state.invitations}
                players={this.state.chosenPlayers}
                onPress={(id) => this.toggleInvite(id)}
                handleLoadMore={this.handleLoadMore}
              />
            </View>
          )}
          <View>
            <View
              style={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.2)",
                paddingVertical: 5,
                marginTop: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>All Players</Text>
            </View>
            <PlayerList
              invitations={this.state.invitations}
              players={this.state.otherPlayers}
              onPress={(id) => this.toggleInvite(id)}
              handleLoadMore={this.handleLoadMore}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
  },
  pickerLeftContainer: {
    flex: 1,
    marginLeft: 20,
  },
  pickerRightContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  placePicker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filtersContainer: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 26,
    justifyContent: "space-between",
  },
  search: {
    width: "100%",
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  searchSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
