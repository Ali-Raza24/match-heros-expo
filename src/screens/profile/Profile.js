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
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import EditProfile from "../../../assets/editProfile.svg";
import TextInputField from "../../component/molecules/TextInputField";
import TwoWaySlider from "../../component/molecules/TwoWaySlider";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import countiesList from "../../component/_shared/CountiesList";
import DropDownPicker from "react-native-dropdown-picker";
import PhotoUpload from "../../component/_shared/PhotoUpload";
import AuthService from "../../services/AuthService";
import { useSelector } from "react-redux";
function Profile(props) {
  const authService = new AuthService();
  const user = useSelector((state) => state.user);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [openCountryList, setOpenCountryList] = useState(false);
  const [county_id, setCountryName] = useState(user?.location?.county?.name);
  const [countriesList, setCountriesList] = useState(countiesList);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [city_id, setCity_id] = useState(user?.location?.city?.name);
  const [errors, setValidationErrors] = useState({});
  const [minimumAge, setMinimumAge] = useState("");
  const [maximumAge, setMaximumAge] = useState("");
  console.log("user county is:#@#@#", county_id, user?.location?.county);
  // const [county_id,setCountryName] = useState("")
  const [profileImageObj, setProfileImageObj] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleCoverImage = (res) => {
    console.log("profile image url is:#@#@#", res?.assets[0]?.uri);
    setProfileImage(res?.assets[0]?.uri);
    setProfileImageObj(res);
  };

  const handleValidation = () => {
    let errors = {};
    if (name === "") {
      errors.name = "The name field is required";
    }
    if (email === "" || !email.includes("@")) {
      errors.email = "Email field is required";
    }
    if (county_id === "") {
      errors.county_id = "County name field is required";
    }
    if (city_id === "") {
      errors.city_id = "Location name field is required";
    }

    console.log(errors);
    setValidationErrors({ errors: errors });
    return Object.keys(errors).length === 0 ? true : false;
  };

  const callBack = (startVal, endVal) => {
    setMinimumAge(startVal);
    setMaximumAge(endVal);
  };
  const updateProfile = () => {
    // const dataTwo = {
    //   name: "Awais",
    //   email: "ranaawais3553@gmail.com",
    //   dob: "2010-01-01",
    //   city_id: "LHR",
    //   city: "LHR",
    //   county: "PAK",
    //   avatar_image: "",
    // };
    const data = {
      name: name,
      email: email,
      county_id: county_id,
      city_id: city_id,
      minimum_age: minimumAge,
      maximum_age: maximumAge,
      avatarObject: profileImageObj,
    };
    try {
      authService
        ?.update(data)
        .then(
          (response) => {
            console.log("success response of create profile is:#@#@", response);
            setButtonLoading(false);
            // this.setState({ buttonLoading: false });
            Alert.alert(
              "You successfully edit profile.",
              "",
              [{ text: "OK", onPress: () => console.log("Cancel Pressed") }],
              { cancelable: false }
            );
            // props.navigation.navigate("Availability");
            this.props.navigation.goBack();
          },
          (error) => {
            console.log("Api call error", error?.response, error);
          }
        )
        .catch((error) => {
          console.log("Api call errorsssss", error?.response, error);
        });
    } catch (e) {
      console.log("API error is:#@#@#@#", e, e?.response);
      alert("API error is:#@#@#@#", e);
    }
  };
  const handleSubmit = () => {
    console.log(
      "errors is:##@#@",
      errors?.errors?.name,
      minimumAge,
      maximumAge
    );
    if (handleValidation()) {
      setButtonLoading(true);
      updateProfile();
    }
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
            {profileImage.length > 0 ? (
              <Image
                source={{ uri: profileImage }}
                style={{
                  resizeMode: "cover",
                  height: 134,
                  width: 134,
                  borderRadius: 134 / 2,
                }}
              />
            ) : (
              <PhotoUpload
                renderElement="IconCamera"
                handleImage={handleCoverImage}
              />
            )}
            {/* <EditProfile
style = {{
    resizeMode:'contain'
}}
/> */}
          </View>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              display: "flex",
              flex: 0.7,
            }}
          >
            <TextInputField
              placeHolder={"Name"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#636C92"}
              profile={true}
              onChangeText={(text) => setName(text)}
              value={name}
            />
            {errors?.errors?.name && (
              <Text style={{ color: "red", top: -22 }}>
                {errors.errors.name}
              </Text>
            )}
            <TextInputField
              placeHolder={"Email"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#636C92"}
              profile={true}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            {errors?.errors?.email && (
              <Text style={{ color: "red", top: -22 }}>
                {errors.errors.email}
              </Text>
            )}
            <Text style={{ fontSize: 16, lineHeight: 19.36, color: "#ffffff" }}>
              Prefer age for oponents
            </Text>
            <View style={{ marginVertical: 8 }}>
              <TwoWaySlider
                minimumAge={minimumAge}
                maximumAge={maximumAge}
                callBack={callBack}
              />
            </View>
            <View style={{}}>
              <Text
                style={{ fontSize: 16, lineHeight: 19.36, color: "#ffffff" }}
              >
                Add Country
              </Text>
              <View>
                <DropDownPicker
                  open={openCountryList}
                  items={countriesList}
                  setOpen={setOpenCountryList}
                  value={county_id}
                  setValue={setCountryName}
                  setItems={setCountriesList}
                  style={{ borderColor: "#1E2646", backgroundColor: "#1E2646" }}
                  textStyle={{ color: "#ffffff" }}
                  // containerStyle={[styles.dropdownPickerContainer,{borderRadius:6}]}
                  modalContentContainerStyle={{
                    backgroundColor: "#1E2646",
                    borderColor: "#1E2646",
                    borderWidth: 1,
                    marginVertical: 200,
                    marginHorizontal: 20,
                    borderRadius: 15,
                  }}
                  modalProps={{
                    transparent: true,
                    presentationStyle: "fullScreen", // for iOS, but raises a warning on android if not present
                  }}
                  placeholder="Country Name"
                  listMode="MODAL"
                  theme="DARK"
                />
                {errors?.errors?.county_id && (
                  <Text style={{ color: "red" }}>
                    {errors.errors.county_id}
                  </Text>
                )}
              </View>
            </View>
            <View style={{ marginTop: 15, zIndex: toggleDropDown ? -1 : 999 }}>
              <TextInputField
                placeHolder={"Prefer location of matches"}
                placeHolderColor={"#ffffff"}
                inputFieldBackColor={"transparent"}
                inputColor="#ffffff"
                borderBottomColor={"#636C92"}
                profile={true}
                onChangeText={(text) => setCity_id(text)}
                value={city_id}
              />
              {errors?.errors?.city_id && (
                <Text style={{ color: "red", top: -22 }}>
                  {errors.errors.city_id}
                </Text>
              )}
            </View>
            <View
              style={{ marginBottom: 42, zIndex: toggleDropDown ? -1 : 999 }}
            >
              <GreenLinearGradientButton
                title={"NEXT"}
                onSelect={() => {
                  handleSubmit();
                  // props.navigation.navigate("Availability");
                }}
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

export default Profile;
