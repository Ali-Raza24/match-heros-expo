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
  Alert,
} from "react-native";
import SvgImage from "../../../assets/signIn.svg";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import EditProfile from "../../../assets/editProfile.svg";
import TextInputField from "../../component/molecules/TextInputField";
import TwoWaySlider from "../../component/molecules/TwoWaySlider";
import GreenLinearGradientButton from "../../component/molecules/GreenLinearGradientButton";
import countiesList from "../../component/_shared/CountiesList";
import DropDownPicker from "react-native-dropdown-picker";
import PhotoUpload from "../../component/_shared/PhotoUpload";
import AuthService from "../../services/AuthService";
import { useSelector } from "react-redux";
import GameService from "../../services/GameService";
import ImageService from "../../services/ImageService";
function Profile(props) {
  const userProfile = props.route?.params?.userProfile;
  const authService = new AuthService();
  const imageServices = new ImageService();
  const user = useSelector((state) => state.user);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [openCountryList, setOpenCountryList] = useState(false);
  const [county_id, setCountryName] = useState(
    userProfile?.address?.country?.id
  );
  const [countriesList, setCountriesList] = useState(countiesList);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState(userProfile?.name);
  const [email, setEmail] = useState(userProfile?.email);
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phone);
  const [location, setLocation] = useState(userProfile?.address?.town);
  const [errors, setValidationErrors] = useState({});
  const [minimumAge, setMinimumAge] = useState(
    Number(userProfile?.ageBracket?.split("-")[0])
  );
  const [maximumAge, setMaximumAge] = useState(
    Number(userProfile?.ageBracket?.split("-")[1])
  );
  console.log(
    "user county is:#@#@#",
    userProfile?.address?.country?.id,
    county_id,
    userProfile?.location,
    userProfile?.ageBracket?.split("-")[0],
    userProfile?.ageBracket?.split("-")[1]
  );
  // const [county_id,setCountryName] = useState("")
  const [profileImageObj, setProfileImageObj] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleCoverImage = (res) => {
    console.log("profile image url is:#@#@#", res?.assets[0]?.uri);
    setProfileImage(res?.assets[0]?.uri);
    setProfileImageObj(res);
  };
  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      let response = { ...result };
      if (!response.fileName) {
        response.fileName =
          "IMG_" + moment().format("MM-DD-YY-HH:mm").toString();
      }
      handleCoverImage(response);
      // this.setState({ photo: result })
    }
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
    if (location === "") {
      errors.location = "Location name field is required";
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
      town: location,
      country_id: county_id,
      minOponentAge: minimumAge,
      maxOponentAge: maximumAge,
      avatar_image: profileImageObj,
      phone: phoneNumber,
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
              [
                {
                  text: "OK",
                  onPress: () => {
                    props.navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: "Dashboard",
                          state: { routes: [{ name: "Menu" }] },
                        },
                      ],
                    });
                    // props.navigation.reset({
                    //   index: 0,
                    //   routes: [{ name: "Menu" }],
                    // });
                  },
                },
              ],
              { cancelable: false }
            );
            // props.navigation.navigate("Availability");
          },
          (error) => {
            setButtonLoading(false);
            Alert.alert(
              "Error Reported Try Again.",
              "",
              [{ text: "OK", onPress: () => props.navigation.goBack() }],
              { cancelable: false }
            );
            console.log(
              "Api call error in then option",
              error?.response,
              error
            );
          }
        )
        .catch((error) => {
          setButtonLoading(false);
          Alert.alert(
            "Error Reported Try Again.",
            "",
            [{ text: "OK", onPress: () => props.navigation.goBack() }],
            { cancelable: false }
          );
          console.log("Api call errorsssss", error?.response, error);
        });
    } catch (e) {
      setButtonLoading(false);
      console.log("API error is:#@#@#@#", e, e?.response);
      Alert.alert(
        "Error Reported Try Again.",
        "",
        [{ text: "OK", onPress: () => props.navigation.goBack() }],
        { cancelable: false }
      );
    }
  };
  console.log(
    "player avatar uri:#@#@#@",
    imageServices.getPlayerAvatarUri(profileImage, 36)
  );
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
            {profileImage.length > 0 || userProfile?.images?.avatar ? (
              <TouchableOpacity activeOpacity={0.6} onPress={pickImageHandler}>
                <Image
                  source={{
                    uri: profileImage
                      ? profileImage
                      : userProfile?.images?.avatar,
                  }}
                  style={{
                    resizeMode: "cover",
                    height: 134,
                    width: 134,
                    borderRadius: 134 / 2,
                  }}
                />
              </TouchableOpacity>
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
              keyboardType={"default"}
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
              keyboardType={"email-address"}
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
            <TextInputField
              placeHolder={"Phone No"}
              keyboardType={"number-pad"}
              placeHolderColor={"#ffffff"}
              inputFieldBackColor={"transparent"}
              inputColor="#ffffff"
              borderBottomColor={"#636C92"}
              profile={true}
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
            />
            {/* {errors?.errors?.email && (
              <Text style={{ color: "red", top: -22 }}>
                {errors.errors.email}
              </Text>
            )} */}
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
                  placeholder={county_id ? county_id : "Country Name"}
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
                keyboardType={"default"}
                placeHolderColor={"#ffffff"}
                inputFieldBackColor={"transparent"}
                inputColor="#ffffff"
                borderBottomColor={"#636C92"}
                profile={true}
                onChangeText={(text) => setLocation(text)}
                value={location}
              />
              {errors?.errors?.location && (
                <Text style={{ color: "red", top: -22 }}>
                  {errors.errors.location}
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
                loading={buttonLoading}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default Profile;
