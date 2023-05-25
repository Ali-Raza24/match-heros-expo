import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import { LinearGradient } from "expo-linear-gradient";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import { Avatar } from "react-native-elements";
import FloatingButton from "../../component/_shared/FloatingButton";

function MatchLobby() {
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
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{}}
          contentContainerStyle={{ flex: 1 }}
        >
          <StatusBar backgroundColor="#5E89E2" />
          <View
            style={{
              paddingVertical: 18,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 0.7,
              borderBottomColor: "#203761",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 21,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              4 Heroes Required
            </Text>
          </View>
          {["1", "2", "3"].map((data, index) => (
            <View
              key={index}
              style={{
                width: "80%",
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <View
                style={{
                  display: "flex",
                  backgroundColor: "#1E2646",
                  width: "45%",
                  paddingVertical: 16,
                  borderRadius: 6,
                }}
              >
                <TouchableOpacity style={{ marginLeft: 8 }}>
                  <Image
                    source={require("../../../assets/emptyBox.png")}
                    style={{ width: 21, height: 21, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
                <View style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    source={require("../../../assets/image/default_avatar.jpg")}
                    avatarStyle={{
                      height: 80,
                      width: 80,
                      resizeMode: "contain",
                      borderRadius: 40,
                    }}
                    containerStyle={{
                      height: 80,
                      width: 80,
                      resizeMode: "contain",
                      borderRadius: 40,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 29,
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                  >
                    Suarez
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: "#0B8140", lineHeight: 16 }}
                  >
                    Confirmed
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  backgroundColor: "#1E2646",
                  width: "45%",
                  paddingVertical: 16,
                  borderRadius: 6,
                }}
              >
                <TouchableOpacity style={{ marginLeft: 8 }}>
                  <Image
                    source={require("../../../assets/emptyBox.png")}
                    style={{ width: 21, height: 21, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
                <View style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    source={require("../../../assets/image/default_avatar.jpg")}
                    avatarStyle={{
                      height: 80,
                      width: 80,
                      resizeMode: "contain",
                      borderRadius: 40,
                    }}
                    containerStyle={{
                      height: 80,
                      width: 80,
                      resizeMode: "contain",
                      borderRadius: 40,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 29,
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                  >
                    Suarez
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: "#0B8140", lineHeight: 16 }}
                  >
                    Confirmed
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <FloatingButton
            onPress={() => console.log("first")}
            // onPress={() => this.props.navigation.navigate('CreateGame')}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default MatchLobby;
