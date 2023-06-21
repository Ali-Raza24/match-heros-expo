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
import PaymentService from "../../services/PaymentService";
function PayRequest() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef(null);
  const paymentService = new PaymentService();

  const handlePaymentRequest = async () => {
    setLoading(true);
    var data = {
      "amount": 777.90,
      "purpose": purpose,
      "receiver_email": email
    };

    try {
      await paymentService
        .paymentRequest(data)
        .then(() => {
          setLoading(false);
          alert("Paid successfully!");
        })
        .catch((error) => {
          if (error.response?.data?.error?.message == "Undefined variable $receiver") {
            alert(`receiver email doesn't found`)
            setLoading(false);
          } else {
            alert("Something went wrong please try again");
            setLoading(false);
          }
        });
      setLoading(false);
    } catch (error) {
      console.log("error is:#@#@#", error?.response)
      setLoading(false);
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
                Send Pay Request
              </Text>
            </View>
            <View style={{ marginTop: 42 }}>
              <TextInputField
                placeHolder={"Email"}
                keyboardType={"email-address"}
                placeHolderColor={"#ffffff"}
                inputFieldBackColor={"transparent"}
                inputColor="#ffffff"
                borderBottomColor={"#636C92"}
                profile={true}
                onSubmitEditing={() => console.log("first")}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInputField
                placeHolder={"Amount €"}
                keyboardType={"number-pad"}
                placeHolderColor={"#ffffff"}
                inputFieldBackColor={"transparent"}
                inputColor="#ffffff"
                borderBottomColor={"#636C92"}
                profile={true}
                onSubmitEditing={() => console.log("first")}
                value={amount}
                onChangeText={(text) => setAmount(text)}
              />
              <TextInputField
                placeHolder={"Purpose"}
                keyboardType={"default"}
                placeHolderColor={"#ffffff"}
                inputFieldBackColor={"transparent"}
                inputColor="#ffffff"
                borderBottomColor={"#636C92"}
                profile={true}
                onSubmitEditing={() => console.log("first")}
                value={purpose}
                onChangeText={(text) => setPurpose(text)}
              />
            </View>
            <View style={{ marginVertical: 32 }}>
              <GreenLinearGradientButton
                title={"SEND PAY REQUEST"}
                disabled={email.length == 0 || purpose.length == 0 || amount.length == 0}
                onSelect={handlePaymentRequest}
                // onSelect={() => this.props.navigation.navigate("Profile")}
                height={45}
                loading={loading}
                color={["#0B8140", "#0A5129"]}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default PayRequest;
