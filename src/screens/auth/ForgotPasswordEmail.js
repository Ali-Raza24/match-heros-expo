import React, { Component } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import TextInputField from "../../component/molecules/TextInputField";
import SvgImage from "../../../assets/signIn.svg";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthService from "../../services/AuthService";
import * as Linking from "expo-linking";
class ForgotPasswordEmail extends Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();

    this.state = {
      email: "",
      emailError: "",
      emailSuccess: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // static navigationOptions = {
  //   title: "Forgot Password?",
  // };

  handleSubmit() {
    const resetEmailUrl = Linking?.makeUrl("NewPassword/");
    console.log("reset email url is:#@#@#@#@", resetEmailUrl);
    Linking.openURL(`${resetEmailUrl}`);
    this.setState({ emailError: "", emailSuccess: "" });
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      this.setState({ loading: true });
      this.authService
        .resetPasswordEmail({ email: this.state.email })
        .then((res) => {
          this.setState({ emailSuccess: res.data.message, loading: false });
          alert("Email has been sent your email Address");
        })
        .catch((err) => {
          this.setState({
            emailError: "There is no user with that email address.",
            loading: false,
          });
        });
    } else {
      this.setState({ emailError: "Please enter valid email address." });
    }
  }
  renderHeader = () => {
    return (
      <TouchableOpacity
        style={{
          flex: 0.5,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={() => this.props.navigation.goBack()}
      >
        {/* <View style={{}}> */}
        <Image
          source={require("../../../assets/arrowGreen.png")}
          style={{
            // marginLeft: 6,
            transform: [{ rotate: "180deg" }],
            marginRight: 6,
          }}
        />
        <Text
          style={{
            lineHeight: 19,
            fontSize: 16,
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Back
        </Text>
        {/* </View> */}
      </TouchableOpacity>
    );
  };
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

        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <SafeAreaView
            style={{ flex: 1, height: Dimensions.get("window").height }}
          >
            <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />

            <View
              style={{
                flex: 0.12,
                justifyContent: "flex-end",
                width: "80%",
                alignSelf: "center",
              }}
            >
              {this.renderHeader()}
            </View>
            <View
              style={{
                flex: 0.49,
                justifyContent: "flex-end",
                width: "80%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 35,
                  lineHeight: 45,
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                Forgot
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  lineHeight: 45,
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                Password
              </Text>
              <View style={{ marginTop: 20 }}>
                <TextInputField
                  placeHolder={"Enter email address"}
                  keyboardType={"email-address"}
                  placeHolderColor={"#ffffff"}
                  inputFieldBackColor={"#1E2646"}
                  inputColor="#ffffff"
                  borderBottomColor={"#1E2646"}
                  onSubmitEditing={() => {
                    this.emailTextInput.focus();
                  }}
                  value={this.state.email}
                  onChangeText={(text) => this.setState({ email: text })}
                />
                {this.state.emailError !== "" && (
                  <Text>{this.state.emailError}</Text>
                )}
                <GreenLinearGradientButton
                  title={"SEND"}
                  onSelect={() => {
                    this.handleSubmit();
                    // this.props.navigation.goBack();
                  }}
                  height={45}
                  // onPress={this.handleSubmit}
                  loading={false}
                  color={["#0B8140", "#0A5129"]}
                />
                {this.state.emailSuccess !== "" && (
                  <Text>{this.state.emailSuccess}</Text>
                )}
              </View>
            </View>
            <View
              style={{ position: "absolute", bottom: 50, left: 0, right: 0 }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    lineHeight: 17,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  Register
                </Text>
                <Image
                  source={require("../../../assets/arrowGreen.png")}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </>
    );
  }
}
export default ForgotPasswordEmail;
