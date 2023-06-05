import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
} from "react-native";
import AuthService from "../../services/AuthService";
import ShowAndHide from "../../component/_shared/ShowAndHide";
import { setIsFirstTimeNotificationPopup } from "../../utils/storage/notification.storage";
import SvgImage from "../../../assets/signIn.svg";
import TextInputField from "../../component/molecules/TextInputField";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.AuthService = new AuthService();

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
      buttonTitle: "Register",
      buttonLoading: false,
      isSigninInProgress: false,
      passHidden: true,
      repeatPassHidden: true,
    };
  }

  static navigationOptions = {
    title: "Register",
  };

  registerUser = () => {
    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role_id: "1",
    };
    console.log("in register user function");
    this.AuthService.register(data)
      .then(async (response) => {
        console.log("in register user success function", response.data);
        await setIsFirstTimeNotificationPopup(true);
        this.setState({ buttonTitle: "Register", buttonLoading: false });
        Alert.alert(
          response.data.message,
          "You will navigate to login screen",
          [
            {
              text: "OK",
              onPress: () => this.props.navigation.navigate("SignIn"),
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.log("in register user catch block", error);
        console.log(error?.response?.data);
        this.setState({ buttonTitle: "Register", buttonLoading: false });
        this.setState({ errors: error?.response?.data.errors });
      });
  };

  handleValidation = () => {
    const { name, email, password, confirmPassword } = this.state;
    let errors = {};
    if (name === "") {
      errors.name = "The name field is required";
    }
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
    if (confirmPassword !== password) {
      errors.confirmPassword = "Your passwords dont match";
    }
    if (confirmPassword === "") {
      errors.confirmPassword = "The confirmPassword is required";
    }
    this.setState({ errors: errors });
    return Object.keys(errors).length === 0 ? true : false;
  };

  handleSubmit = () => {
    console.log("handle register", this.handleValidation());
    if (this.handleValidation()) {
      this.setState({ buttonLoading: true, buttonTitle: "" });
      this.registerUser();
    }
  };

  showOrHidePass = (e) => {
    this.setState({ passHidden: !this.state.passHidden });
  };
  showOrHideRepeatPass = (e) => {
    this.setState({ repeatPassHidden: !this.state.repeatPassHidden });
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
        <SafeAreaView
          style={{ flex: 1, height: Dimensions.get("window").height }}
        >
          <ScrollView>
            <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />
            <View style={{ flex: 1, marginTop: 42 }}>
              <View
                style={{
                  flex: 0.22,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/logo.png")}
                  style={{ resizeMode: "contain", height: 91, width: 111 }}
                />
              </View>
              <View
                style={{ display: "flex", flex: 0.75, alignItems: "center" }}
              >
                <View style={{ width: "80%", marginTop: 12 }}>
                  <Text
                    style={{
                      fontSize: 35,
                      lineHeight: 58,
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Register
                  </Text>
                  <View style={{ marginTop: 27 }}>
                    <TextInputField
                      placeHolder={"Username"}
                      keyboardType={"default"}
                      placeHolderColor={"#ffffff"}
                      inputFieldBackColor={"#1E2646"}
                      inputColor="#ffffff"
                      borderBottomColor={"#1E2646"}
                      // ref={(input) => {
                      //   this.nameInput = input;
                      // }}
                      onSubmitEditing={() => {
                        // this.emailTextInput.focus();
                      }}
                      value={this.state.name}
                      onChangeText={(text) => this.setState({ name: text })}
                    />

                    {/* {this.state.errors?.email && <Text style={styles.error}>{this.state.errors.email}</Text>} */}
                    <TextInputField
                      placeHolder={"Email"}
                      keyboardType={"email-address"}
                      placeHolderColor={"#ffffff"}
                      inputFieldBackColor={"#1E2646"}
                      inputColor="#ffffff"
                      borderBottomColor={"#1E2646"}
                      // ref={(input) => {
                      //   this.emailTextInput = input;
                      // }}
                      onSubmitEditing={() => {
                        // this.passwordTextInput.focus();
                      }}
                      value={this.state.email}
                      onChangeText={(text) => this.setState({ email: text })}
                    />
                    {this.state.errors?.email && (
                      <Text style={{ color: "red" }}>
                        {this.state.errors.email}
                      </Text>
                    )}
                    {/* <View style={styles.passView}> */}
                    <View>
                      <TextInputField
                        placeHolder={"Password"}
                        keyboardType={"default"}
                        placeHolderColor={"#ffffff"}
                        inputFieldBackColor={"#1E2646"}
                        inputColor="#ffffff"
                        borderBottomColor={"#1E2646"}
                        // ref={(input) => {
                        //   this.passwordTextInput = input;
                        // }}
                        secureEntry={this.state.passHidden}
                        onSubmitEditing={() => {
                          // this.forgotPasswordTextInput.focus();
                        }}
                        value={this.state.password}
                        onChangeText={(text) =>
                          this.setState({ password: text })
                        }
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
                    {this.state.errors?.password && (
                      <Text style={{ color: "red" }}>
                        {this.state.errors?.password}
                      </Text>
                    )}
                    <View>
                      <TextInputField
                        placeHolder={"Repeat Password"}
                        keyboardType={"default"}
                        placeHolderColor={"#ffffff"}
                        inputFieldBackColor={"#1E2646"}
                        inputColor="#ffffff"
                        borderBottomColor={"#1E2646"}
                        // ref={(input) => {
                        //   this.forgotPasswordTextInput = input;
                        // }}
                        secureEntry={this.state.repeatPassHidden}
                        onSubmitEditing={() => console.log("first")}
                        value={this.state.confirmPassword}
                        onChangeText={(text) =>
                          this.setState({ confirmPassword: text })
                        }
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
                          onPress={this.showOrHideRepeatPass}
                          hide={this.state.repeatPassHidden}
                        />
                      </View>
                    </View>
                    {this.state.errors?.confirmPassword && (
                      <Text style={{ color: "red" }}>
                        {this.state.errors?.confirmPassword}
                      </Text>
                    )}
                    <GreenLinearGradientButton
                      title={"REGISTER"}
                      onSelect={this.handleSubmit}
                      // onSelect={() => this.props.navigation.navigate("Profile")}
                      height={45}
                      loading={this.state.buttonLoading}
                      color={["#0B8140", "#0A5129"]}
                    />
                    {/* <View style={{  marginVertical:22 }}> */}
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={{
                        flexDirection: "row",
                        paddingVertical: 32,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => this.props.navigation.navigate("SignIn")}
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
                        Already have account
                      </Text>
                      <Image
                        source={require("../../../assets/arrowGreen.png")}
                        style={{ marginLeft: 6 }}
                      />
                    </TouchableOpacity>
                    {/* </View> */}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  passView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  error: {
    color: "#ff190c",
    fontSize: 12,
    // fontFamily: "AvenirNextLTPro-MediumCn",
    paddingBottom: 20,
    marginTop: -20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  formContainer: {
    width: "100%",
    flex: 3,
    // fontFamily: "AvenirNextLTPro-MediumCn",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  passContainer: {
    flex: 10,
    backgroundColor: "white",
    marginLeft: 0,
    marginRight: 0,
  },
  inputText: {
    width: "100%",
    textAlign: "left",
    // fontFamily: "AvenirNextLTPro-MediumCn",
    paddingHorizontal: 5,
  },
  inputContainer: {
    // paddingHorizontal:5,
    backgroundColor: "white",
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  termsAndCond: {
    color: "white",
    // fontFamily: "AvenirNextLTPro-MediumCn",
    fontSize: 12,
  },
  textContainer: {
    marginTop: 10,
    padding: 12,
    alignItems: "center",
    color: "white",
  },
  socialMediaSection: {
    flex: 1,
    justifyContent: "flex-end",
  },
  socialMediaButtons: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
    height: 40,
  },
  googleButton: {
    padding: 0,
    borderRadius: 3,
    height: 45,
  },
});
