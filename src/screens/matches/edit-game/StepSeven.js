import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Buttons from "./ButtonGroup";
import Colors from "../../../../assets/Colors";
import PlayerService from "../../../services/PlayerService";
// import ErrorText from "./ErrorText";
import { useSelector } from "react-redux";

const playerService = new PlayerService();
const { width, height } = Dimensions.get("window");
/**
 *
 * @param {values,setValues,wizardRef,isLastStep,...props,navigation} props [values,setValues,wizardRef, isLastStep]:These are coming from the parent component
 * @param {...props,navigation} props are coming from the react navigation.
 * @returns The React Component
 */
export default function StepSeven(props) {
  const [players, setPlayers] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextLink, setNextLink] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [publicToggle, setPublicToggle] = useState(false);
  const [keepPrivate, setKeepPrivate] = useState(false);
  const currentUser = useSelector((store) => store.user);
  console.log("props.onsubMit in StepSeven", props?.onSubmit, props?.loading);
  return (
    <View>
      <View style={{ width: "80%", alignSelf: "center", marginTop: 42 }}>
        <Text style={styles.text}>
          How many players are still required to fill this match
        </Text>
        <View
          style={{
            height: 45,
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: 6,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              height: 45,
              width: "100%",
              backgroundColor: "#ffffff",
              borderRadius: 6,
              marginVertical: 8,
              justifyContent: "center",
              alignItems: "center",
              color: "#121212",
              fontWeight: "bold",
              textAlign: "center",
            }}
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(val) =>
              props.setValues({ ...props.values, numOfReqPlayers: val })
            }
            value={props?.values?.numOfReqPlayers}
          />
        </View>
        <View style={{ marginVertical: 8 }}>
          <Text style={styles.text}>
            Do you want your match displayed on Match Search
          </Text>
        </View>
        <View style={{ marginTop: 9 }}>
          <TouchableOpacity
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
            onPress={() => {
              !keepPrivate
                ? setPublicToggle((p) => !p)
                : (setPublicToggle(true), setKeepPrivate(false));
              props.setValues({
                ...props.values,
                makePublic: !publicToggle,
              });
            }}
          >
            <View
              style={{
                height: 45,
                width: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <Image source={require('../../../assets/tokenStack.png')} style={{resizeMode:'contain',height:22,width:22}}/> */}
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "left",
                }}
              >
                Make Public
              </Text>
            </View>
            <Image
              source={
                publicToggle
                  ? require("../../../../assets/checkedGreen.png")
                  : require("../../../../assets/emptyBox.png")
              }
              style={{ resizeMode: "contain", height: 20, width: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
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
            onPress={() => {
              !publicToggle
                ? setKeepPrivate((p) => !p)
                : (setPublicToggle(false), setKeepPrivate(true));
              props.setValues({
                ...props.values,
                keepPrivate: !keepPrivate,
              });
            }}
          >
            <View
              style={{
                height: 45,
                width: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <Image source={require('../../../assets/tokenStack.png')} style={{resizeMode:'contain',height:22,width:22}}/> */}
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "left",
                }}
              >
                Keep Private
              </Text>
            </View>
            <Image
              source={
                keepPrivate
                  ? require("../../../../assets/checkedGreen.png")
                  : require("../../../../assets/emptyBox.png")
              }
              style={{ resizeMode: "contain", height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* {props.loading ? (
          <ActivityIndicator />
        ) : ( */}
      <Buttons
        {...props}
        isLastStep={props.isLastStep}
        onPress={() => {
          console.log("first");
          props?.onSubmit(props?.values);
        }}
      />
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  activeTabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  cardStyle: {
    height: 205,
    flex: 1,
    marginLeft: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    // backgroundColor: "white",
    width: width - 52,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  segmentSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingHorizontal: 50,
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    height: 32,
    width: 220,
  },
  tabTextStyle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    // fontFamily: "SourceSansPro-SemiBold",
  },
  teammateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 16,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  itemSeprator: {
    // borderTopWidth: 0.5,
    // borderTopColor: '#203761',
    borderBottomWidth: 0.5,
    borderBottomColor: "#203761",
    width: "90%",
    marginTop: 4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  teammateNameStyle: {
    color: "white",
    fontSize: 16,
    flex: 2,
    paddingLeft: 20,
    alignSelf: "flex-end",
    paddingBottom: 12,
  },
  teammateViewProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    alignSelf: "flex-end",
    paddingBottom: 12,
  },
  teammateViewProfileText: {
    color: Colors.green,
    fontSize: 16,
  },
  avatarStyle: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },

  segmentSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  activeTabStyle: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    height: 32,
    width: 220,
  },
  tabTextStyle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    // fontFamily: 'SourceSansPro-SemiBold'
  },

  buttonStyle: {
    backgroundColor: "transparent",
  },
});
