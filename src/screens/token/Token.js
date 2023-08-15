import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Colors from "../../../assets/Colors";
import { Button } from "react-native-elements";
import AuthService from "../../services/AuthService";
import TextLink from "../../component/_shared/TextLink";
import { LinearGradient } from "expo-linear-gradient";
// import BadgeIcon from '../../_shared/BadgeIcon'
import PrimaryButton from "../../component/_shared/PrimaryButton";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { connect } from "react-redux";
import SvgImage from "../../../assets/signIn.svg";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import PaymentService from "../../services/PaymentService";
const { width, height } = Dimensions.get("window");

class Tokens extends Component {
  constructor(props) {
    super(props);
    this.AuthService = new AuthService();
    this.PaymentService = new PaymentService();
    this.subscription = {};
    this.state = {
      userTokens: "",
      transactionModal: false,
      showCancellationModal: false,
      userBalance: null,
    };
  }
  componentDidMount() {
    this.getUserBalance();
  }
  showModal = () => {
    this.setState({ showCancellationModal: true });
  };

  hideModal = () => {
    this.setState({ showCancellationModal: false });
  };
  getUserBalance = async () => {
    const userBalance = await this.PaymentService.getUserBalance();
    this.setState({ userBalance: userBalance?.data?.amount });
  };
  render() {
    console.log(
      "user object inside token.js main screen",
      this.props?.user?.balance,
      this?.state?.userBalance
    );
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
        <SafeAreaView
          style={{ flex: 1, height: Dimensions.get("window").height }}
        >
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
            <StatusBar backgroundColor="#5E89E2" />
            <View style={{ flex: 1, width: "80%", alignSelf: "center" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: Dimensions.get("window").height / 4.5,
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#203761",
                }}
              >
                <Image
                  source={require("../../../assets/walletLogo.png")}
                  style={{ resizeMode: "contain", height: 94, width: 94 }}
                />
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 12,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, lineHeight: 24, color: "#ffffff" }}
                  >
                    Your Balance
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      lineHeight: 29,
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    € {this.state.userBalance || "0"}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                width: "80%",
                alignSelf: "center",
                marginTop: 18,
              }}
            >
              <GreenLinearGradientButton
                title={"TOP UP"}
                onSelect={() => this.props.navigation.navigate("TopUp")}
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={false}
                color={["#0B8140", "#0A5129"]}
              />
              <GreenLinearGradientButton
                title={"Transaction history".toUpperCase()}
                onSelect={() =>
                  this.props.navigation.navigate("TransactionHistory")
                }
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={false}
                color={["#203761", "#203761"]}
              />
              <GreenLinearGradientButton
                title={"Withdraw funds".toUpperCase()}
                onSelect={() => this.props.navigation.navigate("WithdrawFunds")}
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={false}
                color={["#BF9941", "#E1AC38", "#E3B343", "#E9C155"]}
              />
              <GreenLinearGradientButton
                title={"Send Pay REquest".toUpperCase()}
                onSelect={() => this.props.navigation.navigate("PayRequest")}
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={false}
                color={["#1F436E", "#4272B8"]}
              />
            </View>
          </ScrollView>
          <View style={{ position: "absolute", left: 0, right: 0, bottom: 22 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 42,
                justifyContent: "center",
              }}
              onPress={() =>
                this.props.navigation.navigate("CancellationPolicy")
              }
            >
              <Text
                style={{
                  textAlign: "center",
                  lineHeight: 17,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                Cancellation Policy
              </Text>
              <Image
                source={require("../../../assets/arrowGreen.png")}
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    paddingVertical: 20,
  },
  link: {
    color: "white",
    textDecorationLine: "underline",
    fontSize: 16,
    // fontFamily: 'AvenirNextLTPro-Bold'
  },
  button: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
  },
  cardContainer: {
    width: "90%",
  },
  main: {
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 26,
    paddingBottom: 15,
  },
  balance: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    borderBottomColor: "rgba(255,255,255,0.35)",
    borderBottomWidth: 1,
    height: 240,
  },

  transparentButton: {
    paddingTop: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
  },
  header: {
    fontSize: 42,
    color: "white",
    // fontFamily: 'SourceSansPro-Regular'
  },
  amount: {
    fontSize: 84,
    color: "white",
    // fontFamily: 'SourceSansPro-SemiBold',
    lineHeight: 94,
  },
  price: {
    flex: 1,
    paddingVertical: 50,
  },
  priceCard: {
    width: width - 52,
    height: height * 0.3,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    paddingBottom: 20,
  },
});

function mapStateToProps(state) {
  return {
    userTokens: state.userTokens,
    user: state.user,
  };
}
export default connect(mapStateToProps, null)(Tokens);
