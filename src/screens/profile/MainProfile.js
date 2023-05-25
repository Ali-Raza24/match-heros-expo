import React, { useState } from "react";
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import EditProfile from "../../../assets/editProfile.svg";
import TextInputField from "../../component/molecules/TextInputField";
import TwoWaySlider from "../../component/molecules/TwoWaySlider";
import InputModal from "../../component/molecules/InputModal";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
function MainProfile(props) {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [isModal, setIsModal] = useState(false);
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

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 18,
            }}
          >
            <EditProfile
              style={{
                resizeMode: "contain",
              }}
            />
          </View>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              display: "flex",
              flex: 0.7,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                lineHeight: 29,
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              James
            </Text>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19,
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Jamesjimmy@gmail.com
            </Text>
            <View style={{ width: "50%", alignSelf: "center" }}>
              <GreenLinearGradientButton
                title={"Invitations"}
                onSelect={() => console.log("first")}
                height={45}
                color={["#0B8140", "#0A5129"]}
              />
            </View>
            <TouchableOpacity
              onPress={() => setIsModal(true)}
              style={{
                height: 45,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 12,
                alignItems: "center",
                marginTop: 34,
                borderTopWidth: 0.5,
                borderColor: "#ffffff",
                borderBottomWidth: 0.5,
              }}
            >
              <View
                style={{
                  height: 45,
                  width: "60%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/calender.png")}
                  style={{ resizeMode: "contain", height: 18, width: 18 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: "bold",
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  Year of birth not set
                </Text>
              </View>
              <Image
                source={require("../../../assets/leftArrow.png")}
                style={{ resizeMode: "contain", height: 14, width: 14 }}
              />
            </TouchableOpacity>
            <View
              style={{
                height: 45,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 12,
                alignItems: "center",
                borderColor: "#ffffff",
                borderBottomWidth: 0.5,
              }}
            >
              <View
                style={{
                  height: 45,
                  width: "68%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/location.png")}
                  style={{ resizeMode: "contain", height: 18, width: 18 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: "bold",
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  Match Location not set
                </Text>
              </View>
              <Image
                source={require("../../../assets/leftArrow.png")}
                style={{ resizeMode: "contain", height: 14, width: 14 }}
              />
            </View>
            {isModal && (
              <InputModal isModal={isModal} setIsModal={setIsModal} />
            )}
            <View style={{ marginBottom: 42 }}>
              <GreenLinearGradientButton
                title={"NEXT"}
                onSelect={() => props.navigation.navigate("Dashboard")}
                height={45}
                color={["#0B8140", "#0A5129"]}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default MainProfile;
