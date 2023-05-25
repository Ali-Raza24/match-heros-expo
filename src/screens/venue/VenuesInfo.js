import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import RenderHtml from "react-native-render-html";
function VenuesInfo(props) {
  const { item } = props?.route?.params;
  console.log("venue info is:#@#@#", item.name);
  const source = {
    html: item?.terms,
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
          <View
            style={{
              width: "100%",
              height: Dimensions.get("window").height / 2,
            }}
          >
            <Image
              source={require("../../../assets/venueGrass.png")}
              style={{
                width: "100%",
                height: Dimensions.get("window").height / 2,
                resizeMode: "stretch",
              }}
            />
          </View>
          <View
            style={{
              width: "95%",
              marginBottom: 32,
              top: -32,
              borderRadius: 6,
              alignSelf: "center",
              backgroundColor: "#1F436F",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 20,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#275082",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  lineHeight: 29,
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                {item.name || "Antrim Road"}
              </Text>
              <Image
                source={require("../../../assets/venueBadge.png")}
                style={{ height: 28, width: 23, resizeMode: "contain" }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#275082",
              }}
            >
              <Image
                source={require("../../../assets/message.png")}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 8,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                {item?.contact?.email || "isoft@gmail.com"}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#275082",
              }}
            >
              <Image
                source={require("../../../assets/call.png")}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 8,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                {item?.contact?.phone || "111 222 333"}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#275082",
              }}
            >
              <Image
                source={require("../../../assets/location.png")}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 8,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                {item?.address || "Antrim Road"}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                paddingVertical: 20,
                paddingHorizontal: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "left",
                }}
              >
                Venue Details Area
              </Text>
              <View style={{ marginTop: 18 }}>
                <RenderHtml
                  contentWidth={Dimensions.get("window").width}
                  source={source}
                />
                {/* <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: "#ffffff",
                    textAlign: "left",
                  }}
                >
                  <RenderHtml  contentWidth={"100%"} source={source} />
                </Text> */}
              </View>
            </View>
            <View
              style={{ marginVertical: 22, width: "80%", alignSelf: "center" }}
            >
              <GreenLinearGradientButton
                title={"View Game Schedule"}
                onSelect={() => props.navigation.navigate("VenueDetail")}
                height={45}
                loading={false}
                color={["#0B8140", "#0A5129"]}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default VenuesInfo;
