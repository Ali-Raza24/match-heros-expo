import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookingCancelation from "./BookingCancelation";
import SvgImage from "../assets/signIn.svg";
class TacPage extends Component {
  render() {
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
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {/* <LinearGradient style={{ flex: 1, marginTop: getStatusBarHeight() + 50 }} colors={["#5E89E2", "#0E1326"]}> */}
          <StatusBar backgroundColor="#5E89E2" />
          <ScrollView>
            <View style={styles.mainContainer}>
              <BookingCancelation />
            </View>
          </ScrollView>
          {/* </LinearGradient> */}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 25,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: 16,
    color: "white",
  },
});
export default TacPage;
