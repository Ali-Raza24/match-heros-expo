import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import TextInputField from "../../component/molecules/TextInputField";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
function TopUp() {
  const inputRefs = useRef(null);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [ccv, setCcv] = useState("");
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
                height: Dimensions.get("window").height / 6,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/walletGroup.png")}
                style={{ resizeMode: "contain", height: 55, width: 55 }}
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
                  style={{ fontSize: 18, lineHeight: 24, color: "#ffffff" }}
                >
                  Service Fee is 0.09€
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 29,
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  Total Fee is 0.09€
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, width: "80%", alignSelf: "center" }}>
            <Image
              source={require("../../../assets/creditCard.png")}
              style={{ height: 197, width: "100%", resizeMode: "contain" }}
            />
          </View>
          <View style={{ width: "80%", alignSelf: "center", marginTop: 22 }}>
            <TextInputField
              placeHolder={"Card Number"}
              keyboardType={"number-pad"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#636C92"}
              profile={true}
              onSubmitEditing={() => console.log("first")}
              value={cardNum}
              onChangeText={(text) => setCardNum(text)}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "45%" }}>
                <TextInputField
                  placeHolder={"Expiry"}
                  keyboardType={"number-pad"}
                  placeHolderColor={"#ffffff"}
                  inputFieldBackColor={"transparent"}
                  inputColor="#ffffff"
                  borderBottomColor={"#636C92"}
                  profile={true}
                  onSubmitEditing={() => console.log("first")}
                  value={expiry.length == 2 ? expiry + "/" : expiry}
                  onChangeText={(text) => setExpiry(text)}
                  nonEditAble={expiry.length == 5}
                />
              </View>
              <View style={{ width: "45%" }}>
                <TextInputField
                  placeHolder={"CVC/CCV"}
                  keyboardType={"number-pad"}
                  placeHolderColor={"#ffffff"}
                  inputFieldBackColor={"transparent"}
                  inputColor="#ffffff"
                  borderBottomColor={"#636C92"}
                  profile={true}
                  onSubmitEditing={() => console.log("first")}
                  value={ccv}
                  onChangeText={(text) => setCcv(text)}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 24, width: "80%", alignSelf: "center" }}>
            <GreenLinearGradientButton
              title={"PAY NOW"}
              // onSelect={() => this.props.navigation.navigate("TopUp")}
              // onSelect={() => this.props.navigation.navigate("Profile")}
              height={45}
              loading={false}
              color={["#0B8140", "#0A5129"]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default TopUp;
