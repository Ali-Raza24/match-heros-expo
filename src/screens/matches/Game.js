import moment from "moment";
import React, { Component } from "react";
import {
  FlatList,
  Picker,
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import { Button, FormInput, FormLabel, SearchBar } from "react-native-elements";
// import DateTimePicker from 'react-native-modal-datetime-picker'
import SegmentedControlTab from "react-native-segmented-control-tab";
import SvgImage from "../../../assets/signIn.svg";
import GameService from "../../services/GameService";
// import BadgeIcon from '../../_shared/BadgeIcon'
import counties from "../../component/_shared/Counties";
import GameCard from "./MatchCard";
import MyGames from "./MyMatch";
import FloatingButton from "../../component/_shared/FloatingButton";
import TextBold from "../../component/_shared/TextBold";
import PrimaryButton from "../../component/_shared/PrimaryButton";
import AuthService from "../../services/AuthService";
import { getStatusBarHeight } from "react-native-status-bar-height";
// import RNPickerSelect from 'react-native-picker-select'
import SearchArea from "../../component/_shared/SearchArea";
import { connect } from "react-redux";
import { gameTypes } from "../../utils/game-types";
import { setDeletedGameIdAction } from "../../redux/actions/game.action";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
class Match extends Component {
  constructor(props) {
    super(props);
    this.GameService = new GameService();
    this.AuthService = new AuthService();
    this.counties = counties;
    this.state = {
      games: [],
      myGames: [],
      refreshing: false,
      showFilter: false,
      endReached: false,
      myGamesRefreshing: false,
      nextLink: null,
      loading: true,
      isVisibleStartPicker: false,
      isVisibleEndPicker: false,
      gameType: "",
      isCalenderOpen: false,
      selected: 0,
      test: 1,
      date: "",
    };
  }

  componentDidMount() {
    //  Re render component on focus
    this._navListener = this.props.navigation.addListener("focus", () => {
      this.getGames().then((response) => response);
      this.getMyGames();
    });
  }

  onChange = (searchGame) => {
    this.setState({ searchGame: searchGame });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getGames().then(() => this.setState({ refreshing: false }));
  };

  onMyGamesRefresh = () => {
    this.setState({ myGamesRefreshing: true });
    this.getMyGames();
  };

  getMyGames = () => {
    this.GameService.getUserGames(this.props.user.id)
      .then((games) => {
        console.log("user match is:#@#@#@", games);
        this.setState({
          myGames: games.data,
          myGamesRefreshing: false,
          loading: false,
        });
      })
      .catch((err) => console.log("err", err));
  };

  async getGames() {
    let params = {};
    const {
      county_id,
      starts_at,
      ends_at,
      time_from,
      time_to,
      game_type,
      game_speed,
      avg_game_players,
    } = this.props.gameSearch;
    if (county_id) {
      params.county_id = county_id;
    }
    if (game_type) {
      params.game_type = this.state.city_id;
    }
    if (this.state.selected === 0) {
      params.ends_at = moment().format("YYYY-MM-DD");
      params.starts_at = moment().format("YYYY-MM-DD");
    } else {
      if (starts_at) {
        params.starts_at = moment(starts_at).format("YYYY-MM-DD");
        params.ends_at = ends_at ? moment(ends_at).format("YYYY-MM-DD") : null;
      }
      if (ends_at) {
        params.ends_at = moment(ends_at).format("YYYY-MM-DD");
        params.starts_at = starts_at
          ? moment(starts_at).format("YYYY-MM-DD")
          : null;
      }
    }
    if (time_from) {
      params.time_from = time_from;
    }
    if (time_to) {
      params.time_to = time_to;
    }
    if (avg_game_players) {
      params.avg_game_players = avg_game_players;
    }
    if (game_speed) {
      params.game_speed = game_speed;
    }

    return this.GameService.getGames(params)
      .then((response) => {
        this.setState({
          games: response.data,
          nextLink: response.next_page_url,
          loading: false,
        });
      })
      .catch((err) => console.log("error", err));
  }

  handleShowingFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  renderFooter = () => {
    return this.state.endReached && this.state.nextLink ? (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            height: 180,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={50} color="#2b87ff" animating={true} />
        </View>
      </View>
    ) : null;
  };

  renderGames = () => {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size={50}
            color="#2b87ff"
            animating={this.state.loading}
          />
        </View>
      );
    } else {
      // console.log("game data is:#@#@#@", this.state.games);
      return (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          style={{ backgroundColor: "transparent" }}
          data={this.state.games}
          renderItem={({ item }) => (
            <View
              style={{
                // borderBottomWidth: 1,
                marginBottom: 12,
                // borderBottomColor: 'white', paddingHorizontal: 26
              }}
            >
              <GameCard
                navigation={this.props.navigation}
                cardColor="transparent"
                dataContainerColor="transparent"
                locationContainerColor="transparent"
                showShedow={false}
                textColor="white"
                addLine={true}
                key={item.id}
                game={item}
              />
            </View>
          )}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.2}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.emptyListElement}
        />
      );
    }
  };

  emptyListElement = () => {
    const { city_id, county_id, startDate, endDate } = this.state;
    if (city_id || county_id || startDate || endDate)
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
            text={
              this.state.selected === 0
                ? "There are no match today"
                : "No Results found"
            }
          />
        </View>
      );
    else
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
            text={"No match found, do you want to create a new match?"}
          />

          <GreenLinearGradientButton
            title={"Create Match".toUpperCase()}
            onSelect={() => this.props.navigation.navigate("CreateMatch")}
            height={45}
            loading={false}
            color={["#0B8140", "#0A5129"]}
          />
        </View>
      );
  };

  handleLoadMore = () => {
    if (this.state.nextLink == null || this.state.loading) {
      return;
    }
    this.setState({ endReached: true });
    this.GameService.getNextGames(this.state.nextLink).then((response) => {
      this.setState({
        endReached: false,
        nextLink: response.next_page_url,
        games: [...this.state.games, ...response.data],
      });
    });
  };

  toggleStartPicker = () => {
    this.setState({ isVisibleStartPicker: !this.state.isVisibleStartPicker });
  };

  toggleEndPicker = () => {
    this.setState({ isVisibleEndPicker: !this.state.isVisibleEndPicker });
  };

  tabChange = (index) => {
    this.setState({ selected: index }, () => {
      if (index !== 2) {
        this.setState({ loading: true });

        this.getGames();
      }
    });
  };

  handleSelectGameType = (gameType) => {
    this.setState({ gameType });
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
        <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />
        <View style={styles.mainContainer}>
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
                  color: "white",
                }}
                lightTheme={true}
                onChangeText={this.onChange}
                placeholder={"Search Match"}
                placeholderTextColor="#ADB1B2"
              />
              {/* Navigate to Player Search Filter Screen */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MatchSearch")}
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
          <View style={styles.segmentSection}>
            <SegmentedControlTab
              tabsContainerStyle={{ width: 300, alignSelf: "flex-end" }}
              values={["Today", "All Match", "My Match"]}
              selectedIndex={this.state.selected}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
              onTabPress={(index) => this.tabChange(index)}
            />
          </View>

          {this.state.showFilter && (
            <View style={{ width: "100%", paddingHorizontal: 26 }}>
              <SearchArea
                isVisibleStartPicker={this.state.isVisibleStartPicker}
                toggleStartPicker={this.toggleStartPicker}
                isVisibleEndPicker={this.state.isVisibleEndPicker}
                toggleEndPicker={this.toggleEndPicker}
                gameType={this.state.gameType}
                items={gameTypes}
                onValueChange={this.handleSelectGameType}
              />
            </View>
          )}

          {this.state.selected === 0 && this.renderGames()}
          {this.state.selected === 1 && this.renderGames()}
          {this.state.selected === 2 && (
            <MyGames
              refreshing={this.state.myGamesRefreshing}
              onRefresh={this.onMyGamesRefresh}
              games={this.state.myGames}
              navigation={this.props.navigation}
            />
          )}
          <FloatingButton
            // onPress={() => console.log('first')}
            onPress={() => this.props.navigation.navigate("CreateMatch")}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 5,
  },
  pickerLeftContainer: {
    flex: 1,
    marginLeft: 20,
    alignItems: "center",
  },
  pickerRightContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
  },
  placePicker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "left",
  },
  segmentSection: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 15,
    width: "100%",
    justifyContent: "space-evenly",
  },
  calenderIconStyle: {
    alignSelf: "flex-end",
  },
  activeTabStyle: {
    backgroundColor: "#0B8140",
    borderColor: "#0B8140",
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderColor: "#0B8140",
    borderWidth: 1,
    height: 45,
    width: 220,
  },
  tabTextStyle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    // fontFamily: 'SourceSansPro-SemiBold'
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
  buttonDate: {
    borderColor: "#a2a2a2",
    borderWidth: 1,
    height: 45,
    marginTop: 15,
    width: 120,
    borderRadius: 10,
  },
  filtersContainer: {
    width: "100%",
    marginVertical: 20,
    paddingHorizontal: 40,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
    deletedGameId: state.game.deletedGameId,
    gameSearch: state.gameSearch,
  };
}

export default connect(mapStateToProps, { setDeletedGameIdAction })(Match);
