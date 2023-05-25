import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ImageService from "../../services/ImageService";
import GameService from "../../services/GameService";
import AuthService from "../../services/AuthService";
import moment from "moment";
import { capitalize, replace } from "voca";
import { getCities, getCounty } from "../../utils/county-area";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

export default class GameCard extends Component {
  constructor(props) {
    super(props);
    this.ImageService = new ImageService();
    this.GameService = new GameService();
    this.AuthService = new AuthService();
    this.state = {
      game: null,
      loggedInUserId: "",
      gameTeams: [],
      isPlayerInGame: false,
    };
  }

  componentDidMount() {
    this.setState({
      game: { ...this.props.game },
      gameTeams: [...this.props.game.teams],
    });

    this.AuthService.getUser().then((response) => {
      this.setState({ loggedInUserId: response.id });
    });
  }

  isPlayerInGame = () => {
    if (
      this.state.gameTeams &&
      this.state.loggedInUserId &&
      this.state.gameTeams.length > 1
    ) {
      return (
        this.state.gameTeams.filter(
          (team) =>
            !!team.players &&
            team.players.filter(
              (player) => player.id === this.state.loggedInUserId
            ).length > 0
        ).length > 0
      );
    }
  };

  handleGameDate() {
    let date;
    this.props.game.booking
      ? (date = moment(this.props.game.booking.starts_at)
          .format("DD. MMM YYYY [at] HH:mm")
          .toString())
      : (date = moment(this.props.game.starts_at)
          .format("DD. MMM YYYY [at] HH:mm")
          .toString());
    // date = 'Not booked';
    // date = 'Not booked';
    return date;
  }

  handleGamePitch() {
    let pitch;
    this.props.game?.booking && this.props.game?.booking?.pitch
      ? (pitch = (
          <Text>
            {this.props.game?.booking?.pitch?.venue?.name},{" "}
            {
              getCounty(Number(this.props.game?.booking?.pitch?.venue?.county))
                .name
            }{" "}
            {
              getCities(
                Number(this.props.game?.booking?.pitch?.venue?.county),
                Number(this.props.game?.booking?.pitch?.venue?.area)
              ).name
            }
          </Text>
        ))
      : (pitch = <Text>No address</Text>);
    return pitch;
  }

  render() {
    console.log(
      "Game data in Match Card Component is:#@#@#@#",
      this.props.game?.game_type,
      this.props.game?.booking?.pitch?.venue?.name
    );
    return (
      <LinearGradient
        style={{
          height: 158,
          marginBottom: 5,
          marginTop: 5,
          borderRadius: 10,
          width: width - 52,
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[
          "#BF9941",
          "#E3B343",
          "#E1AC38",
          "#EBCA69",
          "#F2DD86",
          "#F7EA9C",
          "#FAF2A8",
          "#FBF5AD",
          "#F9F0A6",
          "#F5E592",
          "#EFD373",
          "#E9C155",
        ].reverse()}
      >
        <TouchableOpacity
          key={this.props.game.id}
          style={{ ...this.styles.cardStyle }}
          disabled={this.props?.noPress}
          onPress={() =>
            this.props.navigation.navigate("ViewGame", {
              id: this.props.game.id,
              gameCreator: this.props.game.creator_id,
              canSee: this.isPlayerInGame(),
            })
          }
          // onPress={() => !this.props.noPress && this.props.navigation.navigate("ViewGame", {
          //   id: this.props.game.id,
          //   gameCreator: this.props.game.creator_id,
          //   canSee: this.isPlayerInGame()
          // })}
        >
          <View
            style={{ flex: 1, padding: 10 }}
            // source={require('../../../../assets/image/roundedGameCardBackground.png')}
          >
            <View
              style={{ ...this.styles.line, ...this.styles.topSectionStyle }}
            >
              <View style={{ height: 77, width: 77, zIndex: 999 }}>
                <Image
                  source={require("../../../assets/cardLogo.png")}
                  style={{ height: 77, width: 77, resizeMode: "contain" }}
                />
              </View>
              <View style={{ ...this.styles.dateContainer }}>
                {/* <Text style={this.styles.dateTextStyle}>{this.handleGameDate()}</Text> */}

                <Text style={this.styles.dateTextStyle}>
                  {this.props.game?.game_type || "Social Game"}
                </Text>
                <LinearGradient
                  style={{
                    marginTop: 4,
                  }}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#BF9941", "#BF9941", "#BF9941"].reverse()}
                >
                  <Text
                    style={{ ...this.styles.dateTextStyle, color: "#ffffff" }}
                  >
                    2 Players Required
                  </Text>
                </LinearGradient>
                {/* <Text style={this.styles.dateTextStyle}>2 Players Required</Text> */}
                <View style={{ marginTop: 6 }}>
                  <Text
                    style={{
                      ...this.styles.dateTextStyle,
                      fontSize: 20,
                      lineHeight: 24,
                    }}
                  >
                    {this.props.game?.booking?.pitch?.venue?.name ||
                      "Glebe North Astro"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={this.styles.locationContainer}>
              <Text style={this.styles.addressTextStyle}>
                {this.handleGamePitch()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  styles = StyleSheet.create({
    cardStyle: {
      height: 158,
      marginBottom: 5,
      marginTop: 5,
      borderRadius: 10,
      // backgroundColor: this.props.cardColor ? this.props.cardColor : "white",
      // width: width - 52
    },
    topSectionStyle: {
      flex: 4,
      // flex:4,
      flexDirection: "row",
      // backgroundColor:'#121212',
      // justifyContent: 'space-between',
    },
    line: {
      borderBottomWidth: 0.6,
      borderBottomColor: "#A7852A",
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: { x: 0, y: 3 },
      shadowOpacity: 2,
      shadowRadius: 3.84,
      elevation: 6,
    },
    dateTextStyle: {
      fontSize: 16,
      color: "#111931",
      marginLeft: 18,
      fontWeight: "bold",
      lineHeight: 19,
      // color: this.props.textColor ? this.props.textColor : 'black',
    },
    halfTimeScoreStyle: {
      color: this.props.textColor ? this.props.textColor : "black",
      fontSize: 16,
      //   fontFamily: 'SourceSansPro-Regular'
    },
    scoreStyle: {
      color: this.props.textColor ? this.props.textColor : "black",
      fontSize: 30,
      //   fontFamily: 'SourceSansPro-Regular'
    },
    teamNameStyle: {
      color: this.props.textColor ? this.props.textColor : "black",
      fontSize: 16,
      //   fontFamily: 'AvenirNextLTPro-Regular'
    },
    leftTeamContainer: {
      width: "40%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 10,
    },
    resultContainer: {
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    rightTeamContainer: {
      width: "40%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 10,
    },
    previewImage: {
      width: 75,
      height: 75,
    },
    teamNameContainer: {
      paddingBottom: 10,
    },
    dateContainer: {
      flex: 1,
      left: -9,
      // width:'100%',
      // justifyContent: 'flex-start',
      // alignItems: 'center',
      // borderRadius: 10,
      // padding: 10,
      // paddingLeft:10,
      // backgroundColor:'#121212'
      // backgroundColor: this.props.dataContainerColor ? this.props.dataContainerColor : "transparent",
    },
    locationContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
      height: 45,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: this.props.locationContainerColor
        ? this.props.locationContainerColor
        : "transparent",
    },
    teamsContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    addressTextStyle: {
      color: this.props.textColor ? this.props.textColor : "black",
      fontSize: 14,
      // fontFamily: 'AvenirNextLTPro-Regular'
    },
    friendlyGameLabel: {
      // fontFamily: 'AvenirNextLTPro-Bold',
      fontSize: 24,
      color: this.props.cardColor === "transparent" ? "white" : "black",
    },
    crossLine: {
      borderBottomColor:
        this.props.cardColor === "transparent" ? "white" : "black",
      borderBottomWidth: 1,
      width: "30%",
      height: "100%",
    },
  });
}
//
// const this.styles = this.StyleSheet.create({
//     cardStyle: {
//         height:200,
//         marginBottom: 5,
//         marginTop: 5,
//         marginLeft: 5,
//         marginRight: 5,
//         borderRadius: 10,
//         backgroundColor: "white",
//         justifyContent:'space-between',
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.16,
//         shadowRadius: 3.84,
//         elevation: 6,
//     },
//     topSectionStyle:{
//         shadowColor: "#000",
//         flex:1,
//         justifyContent:'space-between',
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 2,
//         shadowRadius: 3.84,
//         elevation: 6,
//     },
//     dateTextStyle:{
//         fontSize: 14
//     },
//     halfTimeScoreStyle:{
//         fontSize: 16,
//         fontFamily:'SourceSansPro-Regular'
//     },
//     scoreStyle:{
//         fontSize: 30,
//         fontFamily:'SourceSansPro-Regular'
//     },
//     teamNameStyle:{
//         color: 'black',
//         fontSize:16,
//         fontFamily:'AvenirNextLTPro-Regular'
//     },
//     leftTeamContainer: {
//         width: '40%',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         paddingTop: 10
//     },
//     resultContainer: {
//         width: '20%',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     rightTeamContainer: {
//         width: '40%',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         paddingTop: 10
//     },
//     previewImage: {
//         width: 75,
//         height: 75
//     },
//     teamNameContainer: {
//         paddingBottom: 10
//     },
//     dateContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         padding: 10,
//         backgroundColor: "white"
//     },
//     finishedGameDateContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: 10,
//         paddingBottom: 10,
//         backgroundColor: 'white'
//     },
//     locationContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height:45,
//         borderBottomRightRadius:10,
//         borderBottomLeftRadius:10,
//         backgroundColor: "#E5E5E5"
//     },
//     teamsContainer: {
//         alignItems:'center',
//         flexDirection: 'row',
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 1,
//         shadowRadius: 3.84,
//         elevation: 6,
//     },
//     addressTextStyle: {
//         color: 'black',
//         fontSize:14,
//         fontFamily:'AvenirNextLTPro-Regular'
//     }
// });
