import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Picker,
  RefreshControl,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  SearchBar,
  FormLabel,
  Button,
  ListItem,
  Avatar,
} from "react-native-elements";
import PlayerService from "../../services/PlayerService";
import counties from "../../component/_shared/Counties";
// import BadgeIcon from "../../component/_shared/BadgeIcon";
import InviteToGamePlayerList from "./InviteToGamePlayerList";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { LinearGradient } from "expo-linear-gradient";
import SearchArea from "../../component/_shared/SearchArea";
import TextBold from "../../component/_shared/TextBold";
import ImageService from "../../services/ImageService";
import { connect } from "react-redux";
import Svg, { Circle } from "react-native-svg";
import SvgImage from "../../../assets/signIn.svg";
class Players extends Component {
  constructor(props) {
    super(props);
    this.PlayerService = new PlayerService();
    this.ImageService = new ImageService();
    this.counties = counties;
    this.state = {
      players: [],
      searchTerm: "",
      endReached: false,
      showLoadingIcon: false, //for search bar
      city_id: "",
      county_id: "",
      refreshing: false,
      showFilter: false,
      loading: true, //spinner while get more players
      nextLink: "",
    };
  }

  componentDidMount() {
    this.getPlayers();
    this.navigationSubscription = this.props.navigation.addListener(
      "focus",
      this.getPlayers
    );
  }
  onPlayerSearch = (playersList) => {
    this.setState({ players: playersList });
  };
  componentWillUnmount() {
    this.navigationSubscription();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.searchPlayer().then(() => this.setState({ refreshing: false }));
  };

  getPlayers = () => {
    this.setState({ loading: true });
    const { player, county_id, avg_game_players, day_of_game, end_game } =
      this.props.playerSearch;
    let params = { start_game: 9 };
    if (county_id) params.county_id = county_id;

    if (player || this.state.searchTerm)
      params.player = player || this.state.searchTerm;

    if (avg_game_players) params.avg_game_players = avg_game_players;

    if (day_of_game) params.day_of_game = day_of_game;
    if (end_game) params.end_game = end_game;

    return this.PlayerService.getAllPlayers(params).then((response) => {
      console.log("Filter Players", response.data);
      this.setState({ loading: false, nextLink: response.data.links.next });
      this.formatPlayers(response.data.data);
    });
  };

  onChange = (searchTerm) => {
    this.setState({ searchTerm: searchTerm }, () => this.getPlayers());
  };

  searchPlayerCounty(id) {
    this.setState({ county_id: id, city_id: "" }, () => this.getPlayers());
  }

  searchPlayerCity(id) {
    this.setState({ city_id: id }, () => this.getPlayers());
  }

  getCities = () => {
    if (this.state.county_id === "") {
      return [{ name: "City", id: "" }];
    }
    let filteredCounty = this.counties.find(
      (x) => x.id === this.state.county_id
    );
    console.log(filteredCounty);
    return filteredCounty ? filteredCounty.cities : [{ name: "City", id: "" }];
  };

  handleShowingFilter = () => {
    let showFilter = !this.state.showFilter;
    this.setState({ showFilter: showFilter });
  };

  handleLoadMore = () => {
    if (this.state.nextLink) {
      this.setState({ endReached: true });
      this.PlayerService.getNextPlayers(this.state.nextLink).then(
        (response) => {
          this.setState({ endReached: false, nextLink: response.links.next });
          this.formatPlayers(response.data, true);
        }
      );
    }
  };

  removeMeFromList = () => {
    return this.state.players.filter((player) => player.id !== this.props.myId);
  };

  formatPlayers(players, concat = false) {
    let formatedPlayers = players.map((player) => {
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
    this.setState({ players: formatedPlayers });
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

  renderFooter = () => {
    return this.state.endReached ? (
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

  renderEmptyList = () => {
    return (
      <View
        style={{
          paddingVertical: 100,
          paddingHorizontal: 26,
          width: "100%",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <TextBold
          style={{
            color: "white",
            paddingVertical: 20,
            lineHeight: 30,
            fontSize: 20,
            // fontFamily: 'SourceSansPro-Bold',
            textAlign: "center",
          }}
          text="No Results found"
        />
      </View>
    );
  };

  render() {
    return (
      <>
        <SvgImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 16,
            bottom: 0,
          }}
        />
        {/* //   <LinearGradient style={{ flex: 1,  }} colors={["#5E89E2", "#0E1326"]}> */}
        <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />

        <View
          style={styles.mainContainer}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
            />
          }
        >
          <View style={styles.searchSection}>
            <View style={styles.search}>
              <TouchableOpacity
                style={{ paddingBottom: 15, paddingLeft: 10, zIndex: 999 }}
              >
                <Image
                  source={require("../../../assets/search.png")}
                  style={{ width: 16, height: 16 }}
                />
              </TouchableOpacity>
              <SearchBar
                searchIcon={false}
                style={{ backgroundColor: "#ffffff" }}
                containerStyle={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  padding: 0,
                  margin: 0,
                  paddingLeft: 20,
                  borderTopWidth: 0,
                  justifyContent: "flex-start",
                  borderBottomWidth: 0,
                }}
                inputContainerStyle={{ backgroundColor: "#fff" }}
                inputStyle={{
                  backgroundColor: "#ffffff",
                  paddingBottom: 0,
                  color: "#121212",
                }}
                lightTheme={true}
                value={this.state.searchTerm}
                onChangeText={this.onChange}
                placeholder={"Search Players"}
                placeholderTextColor="#ADB1B2"
              />
              {/* Navigate to Player Search Filter Screen */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SearchPlayerFilter", {
                    onSearch: this.onPlayerSearch,
                  })
                }
              >
                <View
                  style={{
                    height: 20,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingBottom: 25,
                    width: 20,
                  }}
                >
                  <Image
                    source={require("../../../assets/filter.png")}
                    style={{ width: 16, height: 10.7 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.showFilter && (
            <SearchArea
              county_id={this.state.county_id}
              counties={this.counties}
              searchCounty={(county) => this.searchPlayerCounty(county)}
              city_id={this.state.city_id}
              searchCity={(city) => this.searchPlayerCity(city)}
              getCities={this.getCities}
              dateTime={false}
            />
          )}
          {!this.props.inviteList && this.state.loading ? (
            <View
              style={{
                flex: 1,
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
          ) : (
            <FlatList
              style={{ backgroundColor: "transparent" }}
              data={this.state.players}
              showsVerticallScrollIndicator={false}
              ListFooterComponent={this.renderFooter}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  containerStyle={{
                    alignItems: "center",
                    backgroundColor: "transparent",
                    borderBottomColor: "#0B8140",
                    borderBottomWidth: 0.5,
                    justifyContent: "center",
                    paddingTop: 10,
                    flex: 1,
                    flexDirection: "row",
                    paddingBottom: 10,
                    height: 100,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("PublicProfile", {
                      id: item.id,
                    })
                  }
                >
                  <Avatar
                    containerStyle={{ height: 70, width: 70, borderRadius: 35 }}
                    avatarStyle={{
                      height: 70,
                      width: 70,
                      borderRadius: 35,
                      resizeMode: "cover",
                    }}
                    source={require("../../../assets/image/default_avatar.jpg")}
                    //  source={ this.ImageService.getPlayerAvatarUri(item.avatar, item.id)}
                  />
                  <ListItem.Content>
                    <ListItem.Title
                      style={{
                        paddingLeft: 20,
                        color: "#ffffff",
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron
                    color={"#0B8140"}
                    size={28}
                    style={{ color: "#ffffff", alignSelf: "center" }}
                  />
                </ListItem>
              )}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={this.renderEmptyList}
            />
          )}
          {this.props.inviteList && (
            <InviteToGamePlayerList
              players={this.removeMeFromList()}
              invitePlayer={this.props.invitePlayer}
              removePlayer={this.props.removePlayer}
              handleLoadMore={this.handleLoadMore}
            />
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerSearch: state.playerSearch,
});
export default connect(mapStateToProps)(Players);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "transparent",
    // paddingHorizontal: 26
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
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  searchSection: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
