import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
// import SuccessButton from "../../../_shared/SuccessButton";
import Colors from "../../../../assets/Colors";
import { Input, Icon } from "react-native-elements";
// import EvilIcons from "react-native-vector-icons/EvilIcons";
import Buttons from "./ButtonGroup";
import ToolTip from "react-native-walkthrough-tooltip";
import ErrorText from "./ErrorText";
import DisableButtonGroup from "./DisableButtonGroup";
import TextInputField from "../../../component/molecules/TextInputField";

const popoverText = (
  <Text>
    Choosing five a side as a payment method is guaranteeing players are going
    to show up as it is a pre pay method of taking part in games
  </Text>
);
const Popup = ({ showPopup, setShowPopup }) => {
  return (
    <ToolTip
      isVisible={showPopup}
      content={popoverText}
      placement="top"
      onClose={() => setShowPopup(false)}
      topAdjustment={Platform.OS === "android" ? -StatusBar.currentHeight : 0}
    ></ToolTip>
  );
};

const PopupStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
/**
 *
 * @param {values,setValues,wizardRef,isLastStep,...props,navigation} props [values,setValues,wizardRef, isLastStep]:These are coming from the parent component
 * @param {...props,navigation} props are coming from the react navigation.
 * @returns The React Component
 */
export default function StepFive(props) {
  const [fee, setFee] = useState(0);
  const inputRef = useRef();
  const handleFeeType = (feeType) => {
    if (props.values.fee_type.includes(feeType)) {
      props.removeFeeMethod(feeType);
      return;
    }
    props.addFeeMethod(feeType);
  };
  console.log("props.values.game_fee", props.values.game_fee, fee);
  return (
    <ScrollView style={styles.container}>
      <View style={{ width: "80%", alignSelf: "center", marginVertical: 10 }}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <View style={{ marginVertical: 15 }}>
            <Image
              source={require("../../../../assets/gameFeeCard.png")}
              style={{ resizeMode: "contain", height: 86, width: 149 }}
            />
          </View>
          <View style={{ width: "100%", marginTop: 25 }}>
            <TextInputField
              placeHolder={"Enter Match Fee"}
              keyboardType={"number-pad"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#ffffff"}
              borderBottomWidth={1.7}
              profile={true}
              onSubmitEditing={() => {
                // this.passwordTextInput.focus();
              }}
              onChangeText={(text) => {
                props.setValues({ ...props.values, game_fee: text });
                setFee(text);
              }}
            />
            <ErrorText
              message={"game_fee" in props.errors && props.errors.game_fee}
            />
          </View>
        </View>

        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <Image
            source={require("../../../../assets/cardLogo.png")}
            style={{ resizeMode: "contain", height: 96, width: 117 }}
          />
        </View>
      </View>

      {fee != 0 ? (
        <Buttons {...props} />
      ) : (
        <DisableButtonGroup
          customStyleContainer={{ marginTop: 30 }}
          {...props}
        />
        // <DisableButtonGroup {...props} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  container: {
    // marginVertical: 10,
    width: "100%",
    // alignSelf:'center'
  },
  fiveASideMethod: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  inputContainerStyle: {
    alignItems: "center",
    flexDirection: "row",
  },
  inputStyle: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingHorizontal: 15,
    width: "80%",
  },
  moneyBoxContainer: {
    alignItems: "center",
  },
  moneyBoxImage: {
    width: 100,
    height: 100,
  },
  paymentMethodContainer: {},

  offlineMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  offlineImageWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 12,
    marginBottom: 5,
    backgroundColor: "white",
  },
  offlineText: {
    fontWeight: "400",
    fontSize: 15,
    color: "white",
  },
  offlinePaymentWrapper: {
    alignItems: "center",
    marginHorizontal: 12,
  },
  offlineImage: {
    width: 50,
    height: 50,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  textWrapper: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 16,
    fontSize: 18,
    letterSpacing: 1,
    color: "white",
    textAlign: "center",
  },
});
