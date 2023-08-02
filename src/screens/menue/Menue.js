import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import EditProfile from "../../../assets/editProfile.svg";
import { logOutUser, authUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "../../services/AuthService";
import { useIsFocused } from "@react-navigation/native";
// import { authUser } from "../redux/actions";
function Menue(props) {
  const authServices = new AuthService();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();
  // useEffect(() => {
  //   (async () => {
  //     await dispatch(authUser());
  //   })();
  // }, []);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const authServces = new AuthService();
  useEffect(() => {
    const getUser = async () => {
      try {
        authServices.getLoginUserProfile(user?.id).then((res) => {
          setUserProfile(res.data);
        });
      } catch (error) {
        alert("something went wrong getting user profile");
      }
    };
    if (user?.id || isFocused) {
      getUser();
    }
  }, [user || isFocused]);
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
          <View style={{ width: "80%", alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => {
                userProfile
                  ? props.navigation.navigate("Profile", {
                      userProfile: userProfile,
                    })
                  : alert("Something went wrong while getting profile");
              }}
              style={{
                flex: 0.3,
                width: "100%",
                flexDirection: "row",
                marginTop: 18,
              }}
            >
              {userProfile?.images?.avatar ? (
                <Image
                  source={{ uri: userProfile?.images?.avatar }}
                  style={{
                    height: 90,
                    width: 90,
                    borderRadius: 45,
                    resizeMode: "contain",
                  }}
                />
              ) : (
                <EditProfile
                  height={90}
                  width={90}
                  style={{
                    resizeMode: "contain",
                  }}
                />
              )}
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 29,
                    fontWeight: "normal",
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  {userProfile?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: "normal",
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  {userProfile?.email}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Token")}
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
                  width: "28%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/tokenStack.png")}
                  style={{ resizeMode: "contain", height: 22, width: 22 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: "bold",
                    color: "#ffffff",
                    textAlign: "left",
                  }}
                >
                  Wallet
                </Text>
              </View>
              <Image
                source={require("../../../assets/leftArrow.png")}
                style={{ resizeMode: "contain", height: 14, width: 14 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Availability")}
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
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/availability.png")}
                  style={{ resizeMode: "contain", height: 22, width: 22 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: "bold",
                    color: "#ffffff",
                    textAlign: "left",
                  }}
                >
                  Availability
                </Text>
              </View>
              <Image
                source={require("../../../assets/leftArrow.png")}
                style={{ resizeMode: "contain", height: 14, width: 14 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("PrivacyPolicy")}
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
                  width: "31%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/privacy.png")}
                  style={{ resizeMode: "contain", height: 22, width: 22 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: "bold",
                    color: "#ffffff",
                    textAlign: "left",
                  }}
                >
                  Privacy
                </Text>
              </View>
              <Image
                source={require("../../../assets/leftArrow.png")}
                style={{ resizeMode: "contain", height: 14, width: 14 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("TacPage")}
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
                  width: "62%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/termcondition.png")}
                  style={{ resizeMode: "contain", height: 22, width: 22 }}
                />

                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: "bold",
                    color: "#ffffff",
                    textAlign: "left",
                  }}
                >
                  Term and Condition
                </Text>
              </View>
              <Image
                source={require("../../../assets/leftArrow.png")}
                style={{ resizeMode: "contain", height: 14, width: 14 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                setLoading(true);
                await dispatch(logOutUser());
                setLoading(false);
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "SignIn" }],
                });
              }}
              disabled={loading}
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
                  width: "32%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/logout.png")}
                  style={{ resizeMode: "contain", height: 22, width: 22 }}
                />
                {loading ? (
                  <ActivityIndicator size={"small"} />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 19,
                      fontWeight: "bold",
                      color: "#ffffff",
                      textAlign: "left",
                    }}
                  >
                    Log Out
                  </Text>
                )}
              </View>
              <Image
                source={require("../../../assets/leftArrow.png")}
                style={{ resizeMode: "contain", height: 14, width: 14 }}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default Menue;
