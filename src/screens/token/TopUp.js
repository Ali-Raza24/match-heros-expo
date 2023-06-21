import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import TextInputField from "../../component/molecules/TextInputField";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import {
  CardNumberTextInput,
  CardDateTextInput,
} from "rn-credit-card-textinput";
import PaymentService from "../../services/PaymentService";
var stripe = require("stripe-client")(
  "pk_test_51NL4wVLcjTAvFILZEuIeZLdjDfRAy14nggmGedTz9fj01cfCCRWkG6MGKczU3v5e5qZAaEnOyaz09GjZArsEB29v00291WbGdi"
);
// import stripe from 'stripe-client'
let value = 0;
function TopUp() {
  const paymentService = new PaymentService();
  const inputRefs = useRef(null);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [ccv, setCcv] = useState("");
  const [cardValue, setCardValue] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardDateValue, setCardDateValue] = useState("");
  const [focusCardDateNum, setFocusCardDateNum] = useState(false);

  const updateText = (cardNum) => {
    setCardValue(cardNum);
  };
  const updateCardDate = (cardNum) => {
    setCardDateValue(cardNum);
  };
  const handlerSubmitPaymentAPI = async () => {
    setLoading(true);
    var information = {
      card: {
        number: cardValue,
        exp_month: cardDateValue.substring(0, 2),
        exp_year: cardDateValue.substring(3, 5),
        cvc: ccv,
        name: cardHolderName,
      },
    };

    try {
      var card = await stripe.createToken(information);
      const data = {
        stripeToken: card.id,
        stripeTokenType: "card",
        stripeEmail: "ali@gmail.com",
        amount: 100,
      };
      await paymentService
        .postPayment(data)
        .then(() => {
          setLoading(false);
          alert("Paid successfully!");
        })
        .catch((error) => {
          alert("Something went wrong please try again");
          console.log("error in catch block is:#@#@#@", error?.response)
          setLoading(false);
        });
      setLoading(false);
    } catch (error) {
      console.log("error in catch block is:#@#@#@", error?.response)
      setLoading(false);
    }

    // console.log("response is:#@#@", card)
  };
  const handleCCVText = (text) => {
    if (text.length < ccv.length) {
      setCcv(text);
      // setCcv(text)
    } else {
      if (ccv.length > 2) {
        alert("CCV cannot Exceed upto 3 character");
      } else {
        setCcv(text);
      }
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
              placeHolder={"Card Holder Name"}
              keyboardType={"default"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#ffffff"}
              profile={true}
              onSubmitEditing={() => console.log("first")}
              value={cardHolderName}
              onChangeText={(text) => setCardHolderName(text)}
            />

            <CardNumberTextInput
              errorColor={"red"}
              labelColor={"#ffffff"}
              focusColor={"#1c32a0"}
              placeholder={"Card number"}
              label={"Card Number"}
              updateTextVal={(t) => {
                updateText(t);
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "400",
              }}
              inputWrapStyle={{
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
                borderTopColor: "transparent",
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
              }}
              placeholderTextColor={"#ccc"}
              value={cardValue}
              defaultValue={cardValue}
              inputStyle={{
                color: "#ffffff",
                fontWeight: "bold",
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "45%" }}>
                <CardDateTextInput
                  errorColor={"red"}
                  labelColor={"#ddd"}
                  focusColor={"#1c32a0"}
                  placeholder={"MM/YY"}
                  label={"Expiry date"}
                  focus={focusCardDateNum}
                  updateCardDateText={(t) => {
                    updateCardDate(t);
                  }}
                  onFocus={() => setFocusCardDateNum(true)}
                  labelStyle={{
                    color: "#ffffff",
                    fontWeight: "400",
                  }}
                  inputWrapStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#ffffff",
                    borderTopColor: "transparent",
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                  }}
                  placeholderTextColor={"#ccc"}
                  value={cardDateValue}
                  defaultValue={cardDateValue}
                  inputStyle={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                />
              </View>
              <View style={{ width: "45%" }}>
                <TextInputField
                  placeHolder={"CVC/CCV"}
                  keyboardType={"number-pad"}
                  placeHolderColor={"#ffffff"}
                  inputFieldBackColor={"transparent"}
                  inputColor="#ffffff"
                  borderBottomColor={"#ffffff"}
                  profile={true}
                  onSubmitEditing={() => console.log("first")}
                  value={ccv}
                  onChangeText={handleCCVText}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 24, width: "80%", alignSelf: "center" }}>
            <GreenLinearGradientButton
              title={"PAY NOW"}
              disabled={
                cardHolderName.length == 0 ||
                cardDateValue.length == 0 ||
                ccv.length == 0 ||
                cardValue.length == 0
              }
              onSelect={handlerSubmitPaymentAPI}
              height={45}
              loading={loading}
              color={["#0B8140", "#0A5129"]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default TopUp;
