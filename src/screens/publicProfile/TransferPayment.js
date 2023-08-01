import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import { LinearGradient } from "expo-linear-gradient";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import { useSelector } from "react-redux";
function TransferPayment() {
  const user = useSelector((state) => state.user);
  const [transferAmount, setTransferAmount] = useState("");
  const onTransferMoney = () => {
    if (parseInt(user?.balance) < parseInt(transferAmount)) {
      alert("You don't have enough available balance");
    }
  };
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
          <View style={{ display: "flex" }}>
            <View
              style={{
                flex: 1,
                width: "80%",
                alignSelf: "center",
                height: Dimensions.get("window").height / 3,
                borderBottomWidth: 0.5,
                borderBottomColor: "#203761",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: Dimensions.get("window").height / 5,
                  alignItems: "center",
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
                    € {user?.balance}
                  </Text>
                </View>
              </View>
              <GreenLinearGradientButton
                title={"Add Funds".toUpperCase()}
                // onSelect={() => props.navigation.navigate("InviteHero")}
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={false}
                color={["#0B8140", "#0A5129"]}
              />
            </View>
            <View
              style={{
                width: "80%",
                alignSelf: "center",
                justifyContent: "center",
                marginTop: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  lineHeight: 29,
                  fontSize: 16,
                }}
              >
                Enter Amount €
              </Text>
              <TextInput
                style={{
                  height: 45,
                  width: "100%",
                  backgroundColor: "#414B76",
                  borderRadius: 6,
                  textAlign: "center",
                  color: "#ffffff",
                }}
                keyboardType="number-pad"
                onChangeText={(text) => setTransferAmount(text)}
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TouchableOpacity activeOpacity={0.6} onPress={onTransferMoney}>
                <Image
                  source={require("../../../assets/transferLogoButton.png")}
                  style={{ resizeMode: "contain", width: "100%", height: 45 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 42,
                flexDirection: "row",
                width: "80%",
                alignSelf: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "62%" }}>
                <Text
                  style={{ fontSize: 16, lineHeight: 19, color: "#ffffff" }}
                >
                  See transaction history for a full wallet balance.
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30%",
                }}
                //   onPress={() => this.props.navigation.navigate("SignUp")}
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
                  Wallet
                </Text>
                <Image
                  source={require("../../../assets/arrowGreen.png")}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default TransferPayment;
