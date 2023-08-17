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
  TextInput,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import TextInputField from "../../component/molecules/TextInputField";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import PaymentService from "../../services/PaymentService";
function WithdrawFunds() {
  const paymentService = new PaymentService();
  const [withdrawFunds, setWithdrawFunds] = useState("");
  const [fullname, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [ibn, setIbn] = useState("");
  const inputRefs = useRef(null);

  const handleCashOutAPI = async () => {
    setLoading(true);
    const data = {
      amount: withdrawFunds,
      full_name: fullname,
      phone_number: phoneNumber,
      iban: ibn,
    };
    try {
      await paymentService
        .cashOutPayment(data)
        .then(() => {
          setLoading(false);
          alert("Withdraw successfully!");
        })
        .catch((error) => {
          alert(
            `${error?.response?.data?.message || "Something went wrong!"} `
          );
          console.log(
            "error in then catch block is:#@#@#@",
            error?.response?.data?.message
          );
          setLoading(false);
        });
      setLoading(false);
    } catch (error) {
      console.log("error in try catch block is:#@#@#@", error?.response?.data);
      setLoading(false);
    }

    // console.log("response is:#@#@", card)
  };
  const isDisable = () => {
    if (
      withdrawFunds.length == 0 ||
      fullname.length == 0 ||
      phoneNumber.length == 0 ||
      ibn.length < 3
    ) {
      return true;
    } else {
      return false;
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
          <View style={{ flex: 1, width: "80%", alignSelf: "center" }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                marginVertical: 24,
              }}
            >
              <Text style={{ fontSize: 18, lineHeight: 21, color: "#ffffff" }}>
                Withdraw Amount
              </Text>
              {/* <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:12}}> */}
              {/* </View> */}
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View
                style={{
                  height: 50,
                  width: 44,
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                  backgroundColor: "transparent",
                  borderWidth: 0.7,
                  borderColor: "#636C92",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  €
                </Text>
              </View>
              <View style={{ width: "80%" }}>
                <TextInput
                  returnKeyType="next"
                  keyboardType="number-pad"
                  value={withdrawFunds}
                  onChangeText={(text) => setWithdrawFunds(text)}
                  textAlign="center"
                  //   onChangeText={onChangeText}
                  maxLength={5}
                  style={{
                    height: 50,
                    fontSize: 16,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    backgroundColor: "transparent",
                    //   marginTop:6,
                    //   marginBottom: profile ? 28 : 10,
                    color: "#ffffff",
                    //   paddingHorizontal: 5,
                    borderWidth: 0.7,
                    borderColor: "#636C92",
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text
                style={{ fontSize: 16, color: "#ffffff", textAlign: "center" }}
              >
                In Euro
              </Text>
            </View>
            <View style={{ marginTop: 18 }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                Withdraw Amount must be a minimum of €10
              </Text>
            </View>
            <View style={{ marginTop: 32 }}>
              <TextInputField
                placeHolder={"Full Name"}
                keyboardType={"default"}
                placeHolderColor={"#ffffff"}
                inputFieldBackColor={"transparent"}
                inputColor="#ffffff"
                borderBottomColor={"#636C92"}
                profile={true}
                onSubmitEditing={() => console.log("first")}
                value={fullname}
                onChangeText={(text) => setFullName(text)}
                maxLength={22}
              />
              <TextInputField
                placeHolder={"Phone Number"}
                keyboardType={"phone-pad"}
                placeHolderColor={"#ffffff"}
                inputFieldBackColor={"transparent"}
                inputColor="#ffffff"
                borderBottomColor={"#636C92"}
                profile={true}
                onSubmitEditing={() => console.log("first")}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                maxLength={22}
              />
              <TextInputField
                placeHolder={"Ibn"}
                keyboardType={"default"}
                placeHolderColor={"#ffffff"}
                inputFieldBackColor={"transparent"}
                inputColor="#ffffff"
                borderBottomColor={"#636C92"}
                profile={true}
                onSubmitEditing={() => console.log("first")}
                value={ibn}
                onChangeText={(text) => setIbn(text)}
                maxLength={64}
              />
            </View>
            <View style={{ marginVertical: 32 }}>
              <GreenLinearGradientButton
                title={"WITHDRAW FUNDS"}
                disabled={isDisable()}
                onSelect={handleCashOutAPI}
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={loading}
                titleColor={isDisable() ? "#121212" : "#ffffff"}
                color={
                  isDisable() ? ["#f2f2f2", "#ffffff"] : ["#0B8140", "#0A5129"]
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default WithdrawFunds;
