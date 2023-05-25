import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Picker,
  Alert,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AuthService from "../../services/AuthService";
// import PlayerTeams from "../player/PlayerTeams";
import GameService from "../../services/GameService";
import TeamService from "../../services/TeamService";
import { Input, Text, ListItem, Avatar } from "react-native-elements";
import ImageService from "../../services/ImageService";
import moment from "moment";
import PrimaryButton from "../../component/_shared/PrimaryButton";
import BadgeIcon from "../../component/_shared/BadgeIcon";
import SegmentedControlTab from "react-native-segmented-control-tab";
import GameCard from "../matches/MatchCard";
import TextBold from "../../component/_shared/TextBold";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default class InvitePlayerFromProfile extends Component {
  constructor(props) {
    super(props);
    this.AuthService = new AuthService();
    this.GameService = new GameService();
    this.TeamService = new TeamService();
    this.ImageService = new ImageService();
    this.state = {
      loading: true,
      selected: 0,
      invitationType: "team",
      teams: [],
      loggedInUserGames: [],
      gameFees: [],
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Invite Player",
      headerTransparent: true,
      headerStyle: {
        height: 50,
        borderBottomWidth: 0.3,
        borderBottomColor: "white",
        marginTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
      },
      // headerLeftContainerStyle:{
      //     paddingLeft:26
      // },
      // headerRightContainerStyle:{
      //     paddingRight:26
      // },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "white",
        // fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
      },
      headerRight: (
        <BadgeIcon onPress={() => navigation.navigate("Notifications")} />
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{ paddingLeft: 26, paddingRight: 20, paddingVertical: 10 }}
          >
            <Image
              style={{ height: 16, width: 16 }}
              source={require("../../../../assets/image/back.png")}
            />
          </View>
        </TouchableOpacity>
      ),
    };
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const id = await this.AuthService.getUserId();
    this.TeamService.getUserTeams(id)
      .then((userTeams) => {
        console.log("userTeams in InvitePlayerFromProfile", userTeams);
        return userTeams?.filter((team) => team.captain[0].id == id);
      })
      .then((filteredTeams) => this.setState({ teams: filteredTeams }));
    this.GameService.getUserGames(id)
      .then((res) => res.data.filter((game) => id === game.creator_id))
      .then((authUserGames) => {
        let gameFees = authUserGames.map((game_1) => ({
          id: game_1.id,
          fee: "",
        }));
        this.setState({
          loggedInUserGames: authUserGames,
          gameFees: gameFees,
          loading: false,
        });
      });
  }

  onChooseTeam = (team) => {
    console.log(
      "get params in InvitePlayerFromProfile",
      this.props.route.params
      // this.props.navigation
    );
    // let playerName = this.props.navigation.getParam("name");
    let { name } = this.props.route.params;
    Alert.alert(
      `Invite ${name} to ${team.name}?`,
      `Are you sure you want to invite ${name} to this team?`,
      [
        { text: "OK", onPress: () => this.invitePlayerToTeam(team.id) },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  invitePlayerToTeam = (teamId) => {
    let invitationList = [];
    // let playerId = this.props.navigation.getParam("id");
    let { id } = this.props.route.params;
    invitationList.push(id);
    this.TeamService.sendInvitations(teamId, invitationList)
      .then((response) => {
        Alert.alert(
          "successfully sent",
          "",
          [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
          { cancelable: false }
        );
      })
      .catch((er) =>
        console.log(
          "error in invitePlayerFromProfile Component invitePlayerToTeam function ",
          er.response
        )
      );
  };

  handleFeeInput = (fee, index) => {
    let gameFees = this.state.gameFees.slice();
    gameFees[index].fee = fee;
    this.setState({ gameFees: gameFees });
  };

  invitePlayerToGame = (gameId, index) => {
    // let playerName = this.props.navigation.getParam("name");
    let { name } = this.props.route.params;
    const fee = this.state.gameFees[index].fee;
    Alert.alert(
      `Invite ${name} to game?`,
      `Are you sure you want to invite this player to game?`,
      [
        {
          text: "Yes",
          onPress: () => this.sendInvitation(gameId, fee, name),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  sendInvitation = (gameId, fee, playerName) => {
    // let playerId = this.props.navigation.getParam("id");
    let { id } = this.props.route.params;
    let player_ids = [];
    const player_id = {};
    player_ids.push(id);
    player_id["player_ids"] = player_ids;
    this.GameService.invitePlayersToGame(gameId, player_id)
      .then((res) =>
        Alert.alert(
          "Invite sent",
          `You successfully invite ${playerName} to your game`,
          [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
          { cancelable: false }
        )
      )
      .catch((err) =>
        console.log(
          "error in invitePlayerFromProfile Component sendInvitation function",
          err
        )
      );
  };

  handleGameDate(game) {
    let date;
    game.booking
      ? (date = (
          <Text>
            {moment(game.booking.starts_at).format("DD. MMM YYYY [at] HH:mm")}
          </Text>
        ))
      : (date = <Text>Not booked</Text>);
    return date;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            flex: 1,
            paddingTop: getStatusBarHeight() + 50,
          }}
          source={require("../../../assets/image/background.png")}
        >
          <StatusBar backgroundColor="transparent" translucent />
          <View style={styles.mainContainer}>
            <View style={styles.pickerContainer}>
              <SegmentedControlTab
                tabsContainerStyle={{ width: 150 }}
                values={["Team", "Game"]}
                selectedIndex={this.state.selected}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                onTabPress={(index) => {
                  console.log(index);
                  this.setState({ selected: index });
                }}
              />
            </View>
            {this.state.selected === 0 &&
              (this.state.loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={"#5E89E2"} />
                </View>
              ) : this.state.teams.length > 0 ? (
                <FlatList
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    paddingHorizontal: 26,
                  }}
                  data={this.state.teams}
                  renderItem={({ item }) => (
                    <ListItem
                      containerStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottomColor: "rgba(255,255,255,0.35)",
                        paddingRight: 0,
                        paddingTop: 10,
                        flex: 1,
                        paddingBottom: 10,
                        height: 100,
                      }}
                      key={item.id}
                      onPress={() => this.onChooseTeam(item)}
                    >
                      <Avatar
                        containerStyle={{
                          borderRadius: 30,
                          width: 60,
                          height: 60,
                          //  resizeMode: "contain",
                        }}
                        avatarStyle={{
                          borderRadius: 30,
                          width: 60,
                          height: 60,
                          resizeMode: "contain",
                        }}
                        source={require("../../../assets/image/default_avatar.jpg")}
                        //  source={ this.ImageService.getPlayerAvatarUri(item.avatar, item.id)}
                      />
                      <ListItem.Content>
                        <ListItem.Title
                          style={{ color: "white", fontSize: 16 }}
                        >
                          {item?.name}
                        </ListItem.Title>
                        <ListItem.Subtitle
                          style={{
                            color: "white",
                            fontSize: 14,
                            fontWeight: "normal",
                          }}
                        >
                          {item?.location
                            ? item?.location?.county?.name +
                              ", " +
                              item?.location?.city?.name
                            : ""}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReached={this.props.handleLoadMore}
                  onEndReachedThreshold={0.1}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingTop: 20,
                    justifyContent: "center",
                    width: "100%",
                    paddingHorizontal: 26,
                  }}
                >
                  <Image
                    source={require("../../../../assets/image/teamBig.png")}
                    style={{ width: 67, height: 70 }}
                  />
                  <TextBold
                    style={{
                      color: "white",
                      paddingVertical: 20,
                      lineHeight: 30,
                      fontSize: 20,
                      // fontFamily: "SourceSansPro-Bold",
                      textAlign: "center",
                    }}
                    text={"You don't have teams yet."}
                  />

                  <PrimaryButton
                    title={"Create team"}
                    style={{ height: 45 }}
                    fontStyle={{
                      fontSize: 14,
                      // fontFamily: "SourceSansPro-Bold",
                    }}
                    containerViewStyle={{ width: "100%" }}
                    onPress={() => this.props.navigation.navigate("CreateTeam")}
                    loading={this.state.buttonLoading}
                  />
                </View>
              ))}

            {this.state.selected === 1 && (
              <View style={{ paddingTop: 30, flex: 1 }}>
                {this.state.loading ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator size={"large"} color={"#5E89E2"} />
                  </View>
                ) : this.state.loggedInUserGames.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "100%",
                      paddingHorizontal: 26,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/image/ball.png")}
                      style={{ width: 66, height: 66 }}
                    />
                    <TextBold
                      style={{
                        color: "white",
                        paddingVertical: 20,
                        lineHeight: 30,
                        fontSize: 20,
                        // fontFamily: "SourceSansPro-Bold",
                        textAlign: "center",
                      }}
                      text={"You don't have games yet."}
                    />

                    <PrimaryButton
                      title={"Create game"}
                      style={{ height: 45 }}
                      fontStyle={{
                        fontSize: 14,
                        // fontFamily: "SourceSansPro-Bold",
                      }}
                      containerViewStyle={{ width: "100%" }}
                      onPress={() =>
                        this.props.navigation.navigate("CreateGame")
                      }
                      loading={this.state.buttonLoading}
                    />
                  </View>
                ) : (
                  <View style={{ flex: 1 }}>
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      style={{
                        backgroundColor: "transparent",
                        paddingBottom: 20,
                        flex: 1,
                      }}
                      data={this.state.loggedInUserGames}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "white",
                            paddingHorizontal: 26,
                            paddingVertical: 10,
                          }}
                        >
                          <GameCard
                            navigation={this.props.navigation}
                            key={item.id}
                            game={item}
                          />
                          <View style={styles.feeContainer}>
                            <Text style={{ fontWeight: "500", color: "white" }}>
                              Fee(credits):
                            </Text>
                            <Input
                              returnKeyType="next"
                              blurOnSubmit={false}
                              containerStyle={styles.inputContainer}
                              onChangeText={(fee) =>
                                this.handleFeeInput(fee, index)
                              }
                              value={this.state.gameFees[index].fee}
                            />
                          </View>
                          <View style={styles.buttonContainer}>
                            <PrimaryButton
                              style={{ width: "100%" }}
                              onPress={() =>
                                this.invitePlayerToGame(item.id, index)
                              }
                              title="Invite"
                            />
                          </View>
                        </View>
                      )}
                      onEndReached={this.handleLoadMore}
                      onEndReachedThreshold={0.2}
                      onRefresh={this.onRefresh}
                      refreshing={this.state.refreshing}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
  },
  pickerContainer: {
    alignItems: "center",
  },
  gameCard: {
    height: 180,
    borderColor: "#ebebeb",
    borderWidth: 2,
    paddingBottom: 10,
  },
  activeTabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    height: 32,
    width: 150,
  },
  tabTextStyle: {
    color: "rgba(255,255,255,0.5)",
  },
  activeTabTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  detailContainer: {
    flex: 2,
    flexDirection: "row",
    padding: 5,
  },
  feeContainer: {
    width: "100%",
    backgroundColor: "transparent",
    paddingBottom: 10,
  },
  inputContainer: {
    flex: 2,
    borderBottomColor: "#c2c2c2",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  teamContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
  },
  dateContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  teamNameConainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  teamLogoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: 30,
    height: 30,
  },
});
