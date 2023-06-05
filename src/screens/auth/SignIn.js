import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { FormInput, Text } from "react-native-elements";
import AuthService from "../../services/AuthService";
// import PrimaryButton from "../_shared/PrimaryButton";
import TextLink from "../../component/_shared/TextLink";
// import { GoogleSignin, statusCodes } from 'react-native-google-signin';
// import { LinearGradient } from 'expo-linear-gradient';
// import GoogleLogin from "./GoogleLogin";
// import FacebookLogin from "./FacebookLogin";
import ShowAndHide from "../../component/_shared/ShowAndHide";
import ApiService from "../../services/ApiService";
import { connect } from "react-redux";
import { loginUser, updateUser } from "../../redux/actions";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import TextInputField from "../../component/molecules/TextInputField";
import SvgImage from "../../../assets/signIn.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import firebase from "react-native-firebase"

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.AuthService = new AuthService();
    this.ApiService = new ApiService();
    this.state = {
      email: "",
      password: "",
      errors: {},
      gdpr: true,
      buttonTitle: "Login",
      buttonLoading: false,
      isSigninInProgress: false,
      passHidden: true,
      fcmToken: "",
    };
    this.loginUser = this.loginUser.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: "Login",
  };

  componentDidUpdate(prevProps, prevState) {
    //  Redirect when user login
    // console.log('login', this.props);
    // if (this.props.user) {
    //   this.props.navigation.navigate("AuthLoading")
    // }
  }

  componentWillUnmount() {
    // this.props.resetLoginErrorMessage();
    this.setState({ buttonLoading: false });
  }

  async loginUser() {
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      await this.props.loginUser(user);
      const token = await AsyncStorage.getItem("userToken");
      console.log("response is:#@#@#@#", token);
      if (token) {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        this.setState({ buttonLoading: false });
        alert("Invalid User");
      }
      // this.props.navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Dashboard" }],
      // });

      // this.props.navigation.navigate("Profile")
    } catch (error) {
      this.setState({ buttonLoading: false });
      alert("Invalid User");
    }
  }

  handleValidation() {
    const { email, password } = this.state;
    let errors = {};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "The email must be valid email address";
    }
    if (email === "") {
      errors.email = "The email is required";
    }
    if (password.length < 6) {
      errors.password = "The password must be at least 6 characters";
    }
    if (password === "") {
      errors.password = "The password is required";
    }
    this.setState({ errors: errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit() {
    if (this.handleValidation()) {
      this.setState({ buttonLoading: true, buttonTitle: "" });
      this.loginUser();
    }
  }

  showOrHidePass = () => {
    this.setState({ passHidden: !this.state.passHidden });
  };

  async _getToken() {
    return await AsyncStorage.getItem("userToken");
  }

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
        <SafeAreaView
          style={{ flex: 1, height: Dimensions.get("window").height }}
        >
          <ScrollView>
            <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />
            <View
              style={{
                flex: 0.3,
                marginTop: Dimensions.get("window").height / 6.9,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/logo.png")}
                style={{ resizeMode: "contain" }}
              />
            </View>
            <View style={{ display: "flex", flex: 0.7, alignItems: "center" }}>
              <View style={{ width: "80%", marginTop: 12 }}>
                <Text
                  style={{
                    fontSize: 35,
                    lineHeight: 58,
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  Login
                </Text>
                <View style={{ marginTop: 27 }}>
                  <TextInputField
                    placeHolder={"Email"}
                    placeHolderColor={"#ffffff"}
                    inputFieldBackColor={"#1E2646"}
                    keyboardType={"email-address"}
                    inputColor="#ffffff"
                    borderBottomColor={"#1E2646"}
                    // ref={input => {
                    //   this.emailTextInput = input;
                    // }}
                    onSubmitEditing={() => {
                      // this.passwordTextInput.focus();
                    }}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                  />

                  {this.state.errors.email && (
                    <Text style={{ color: "red" }}>
                      {this.state.errors.email}
                    </Text>
                  )}
                  <View>
                    <TextInputField
                      secureEntry={this.state.passHidden}
                      placeHolder={"Password"}
                      keyboardType={"default"}
                      placeHolderColor={"#ffffff"}
                      inputFieldBackColor={"#1E2646"}
                      inputColor="#ffffff"
                      borderBottomColor={"#1E2646"}
                      // ref={(input) => {
                      //   this.passwordTextInput = input;
                      // }}
                      onSubmitEditing={() => console.log("first")}
                      value={this.state.password}
                      onChangeText={(text) => this.setState({ password: text })}
                    />
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 999,
                        height: 22,
                        width: 22,
                        bottom: 16,
                        right: 6,
                      }}
                    >
                      <ShowAndHide
                        style={{ marginRight: 10 }}
                        onPress={this.showOrHidePass}
                        hide={this.state.passHidden}
                      />
                    </View>
                  </View>
                  {this.state.errors.password && (
                    <Text style={{ color: "red" }}>
                      {this.state.errors.password
                        ? this.state.errors.password
                        : this.state.errors.serverErrors
                        ? this.state.errors.serverErrors
                        : ""}
                    </Text>
                  )}
                  <GreenLinearGradientButton
                    title={"SIGN IN"}
                    onSelect={this.handleSubmit}
                    // onSelect={() => this.props.navigation.navigate("Profile")}
                    height={45}
                    loading={this.state.buttonLoading}
                    color={["#0B8140", "#0A5129"]}
                  />

                  {this.props.loginFail && (
                    <Text style={{ color: "red" }}>{this.props.loginFail}</Text>
                  )}
                  <TouchableOpacity
                    style={{ marginTop: 20 }}
                    activeOpacity={0.6}
                    onPress={() =>
                      this.props.navigation.navigate("ForgotPasswordEmail")
                    }
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        lineHeight: 16,
                        color: "#6D92CA",
                        textAlign: "center",
                      }}
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 42,
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
            </View>
            {/* </View> */}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
function mapStateToProps(state) {
  console.log("redux state", state);
  return {
    loginFail: state.loginFail,
    user: state.user,
    loginRequest: state.loginRequest,
  };
}

export default connect(mapStateToProps, {
  loginUser,
  updateUser,
})(SignIn);
