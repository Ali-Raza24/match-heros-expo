import React, { Component } from "react";
import { StyleSheet, FlatList, ActivityIndicator, View } from "react-native";
import GameService from "../../services/GameService";
import AuthService from "../../services/AuthService";
import GameCard from "./MatchCard";
import TextBold from "../../component/_shared/TextBold";
import PrimaryButton from "../../component/_shared/PrimaryButton";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";

export default class MyGames extends Component {
  constructor(props) {
    super(props);
    this.AuthService = new AuthService();
    this.GameService = new GameService();
    this.renderGames.bind(this);
    this.state = {
      loggedInUser: {},
      refreshing: false,
      showSpinner: true,
      games: [],
    };
  }

  componentDidMount() {
    // console.log(this.props.games);
    this.AuthService.getUser().then((user) =>
      this.setState({
        loggedInUser: user,
        showSpinner: false,
        games: this.props.games,
      }).catch((err) =>
        console.log("My Games Screen Err: ComponentdidMount", err)
      )
    );
  }

  componentWillUnmount() {
    this.setState({ games: [] });
  }

  onRefresh = () => {
    this.getGames();
  };

  getGames = async () => {
    return this.GameService.getUserGames(this.state?.loggedInUser?.id).then(
      (res) => {
        this.setState({ games: res?.data, showSpinner: false });
      }
    );
  };

  renderGames() {
    console.log("Single Match item in My Match Card", this.state?.games);
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        style={{ backgroundColor: "transparent" }}
        data={this.state?.games}
        renderItem={({ item, index }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "white",
              paddingHorizontal: 26,
            }}
          >
            <GameCard
              navigation={this?.props?.navigation}
              cardColor="transparent"
              dataContainerColor="transparent"
              locationContainerColor="transparent"
              showShedow={false}
              textColor="white"
              addLine={true}
              key={item?.id}
              game={item}
              loggedInUser={this?.state?.loggedInUser}
              fromInviteHeroMatch={this.props?.fromInviteHeroMatch}
            />
          </View>
        )}
        // onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.2}
        onRefresh={this?.props?.onRefresh}
        refreshing={this?.props?.refreshing}
      />
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state?.showSpinner ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator
              size={50}
              color="#2b87ff"
              animating={this.state?.loading}
            />
          </View>
        ) : this.state?.games?.length > 0 ? (
          this.renderGames()
        ) : (
          <View
            style={{
              paddingVertical: 100,
              width: "100%",
              paddingHorizontal: 26,
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
            <View style={{ width: "100%", alignItems: "center" }}>
              <GreenLinearGradientButton
                title={"Create Match".toUpperCase()}
                onSelect={() => this.props.navigation.navigate("CreateMatch")}
                height={45}
                loading={false}
                color={["#0B8140", "#0A5129"]}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 5,
  },
});
