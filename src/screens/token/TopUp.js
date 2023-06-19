import React, { useRef, useState } from "react";
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
import { CardNumberTextInput, CardDateTextInput } from "rn-credit-card-textinput";
let value = 0;
function TopUp() {
  const inputRefs = useRef(null);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [ccv, setCcv] = useState("");
  const [cardValue, setCardValue] = useState('');
  const [focusCardNum, setFocusCardNum] = useState(false);

  const [cardDateValue, setCardDateValue] = useState('');
  const [focusCardDateNum, setFocusCardDateNum] = useState(false);


  const updateText = (cardNum) => {
    // console.log("card numb is:#@#@", cardNum)
    setCardValue(cardNum)
  }
  const updateCardDate = (cardNum) => {
    setCardDateValue(cardNum)
  }
  const numberWithSpace = (x) => x.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  const cardNumText = (text) => {
    value = value + 1
    console.log("onChangeText", value);
    let textIn = numberWithSpace(text);
    if (text.length < cardNum.length) {
      const lastChar = cardNum[cardNum.length - 1];
      console.log("last index val", lastChar)
      if (lastChar === ' ') {
        setCardNum(text)
        return;
      }
    }
    setCardNum(textIn)
    // console.log("number with card white space", numberWithSpace(text))
    // if (cardNum == '') {
    //   alert("text")
    //   setCardNum(text)
    // } else {
    //   console.log("text is:#@#@", "0 1 2 3 4 5 6 7 8 9".includes(text), typeof numberWithSpace(text))
    //   setCardNum(numberWithSpace(text))
    // }
  }
  const handleKeyPress = ({ nativeEvent }) => {
    // console.log("key press", nativeEvent.key)
    if (nativeEvent.key === 'Backspace' && cardNum.endsWith(' ')) {
      // alert("text")
      value = value + 1
      console.log("onSpace", value)
      // setCardNum(cardNum.slice(0, -1));
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
            <CardNumberTextInput errorColor={"red"}
              labelColor={"#ddd"}
              focusColor={"#1c32a0"}
              // defaultBorderColor={"#ffffff"}
              placeholder={"Card number"}
              label={"Card Number"}
              // focus={focusCardNum}
              // touched={true}
              updateTextVal={(t) => {
                updateText(t)
              }}

              // onFocus={() => setFocusCardNum(true)}
              labelStyle={{
                color: '#333',
                fontWeight: '400'
              }}
              inputWrapStyle={{
                // borderRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ffffff',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',

              }}
              placeholderTextColor={"#ccc"}
              value={cardValue}
              defaultValue={cardValue}
              inputStyle={{
                color: '#333',
                fontWeight: 'bold',
              }} />
            {/* <TextInput
              value={cardNum}
              onChangeText={(text) => cardNumText(text)}
            /> */}
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
              onChangeText={(text) => {
                cardNumText(text)
              }}
              onKeyPress={handleKeyPress}
            // clearButtonMode="while-editing"

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
                  value={expiry}
                  onChangeText={(text) => {
                    if (text.length == 2) {
                      setExpiry(text.substr(0, 5))
                      // setExpiry(text.substr(0, 5))
                    } else {
                      setExpiry(text)
                    }
                    // expiry.length != 5 && setExpiry(text)
                  }}
                // nonEditAble={expiry.length == 5}
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
