import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import ToolTip from "react-native-walkthrough-tooltip";
import Colors from "../../../../assets/Colors";
import Countries from "../../../component/_shared/Counties";
import DropDownPicker from "react-native-dropdown-picker";
import Buttons from "./ButtonGroup";
import ErrorText from "./ErrorText";
import DisableButtonGroup from "./DisableButtonGroup";
import TextInputField from "../../../component/molecules/TextInputField";
import GreenLinearGradientButton from "../../../component/molecules/GreenLinearGradientButton";

const popoverText = (
  <Text>
    {" "}
    Please note that all Pitch bookings should be made prior to setting up a
    game with the Five a Side App.
  </Text>
);

const Popup = ({ showPopup, setShowPopup }) => {
  return (
    <View style={PopupStyles.container}>
      <ToolTip
        isVisible={showPopup}
        content={popoverText}
        placement="left"
        onClose={() => setShowPopup(false)}
        topAdjustment={Platform.OS === "android" ? -StatusBar.currentHeight : 0}
      ></ToolTip>
    </View>
  );
};

const PopupStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
/**
 *
 * @param {values,setValues,wizardRef,isLastStep,...props,navigation} props [values,setValues,wizardRef, isLastStep]:These are coming from the parent component
 * @param {...props,navigation} props are coming from the react navigation.
 * @returns The React Component
 */
export default function Steptwo(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [openSurface, setOpenSurface] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openCounty, setOpenCounty] = useState(false);
  const inputRef = useRef();
  const item = props?.route?.params?.item;
  console.log("params are #@#@#@", item?.name);

  const surfaceTypes = useMemo(
    () => [
      { key: 1, label: "Artificial Grass", value: "artificial-grass" },
      { key: 2, label: "Grass", value: "grass" },
      { key: 3, label: "Hard Floor", value: "hard-floor" },
      { key: 4, label: "Futsal", value: "futsal" },
      { key: 5, label: "Indoor", value: "indoor" },
    ],
    []
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Popup setShowPopup={setShowPopup} showPopup={showPopup} />
      ),
    });
    return () => {
      // props.navigation.setOptions({
      //   // headerRight: () => (
      //   //   <BadgeIcon
      //   //     style={{ position: "absolute" }}
      //   //     onPress={() => navigation.navigate("Notifications")}
      //   //   />
      //   // ),
      // });
    };
  }, [showPopup]);
  useEffect(() => {
    if (item?.name) {
      props.setValues({ ...props.values, venue_name: item?.name });
    }
  }, [item?.name]);
  const getCities = () => {
    return Countries.find((x) => x.id === props.values.county)
      ? Countries.find((x) => x.id === props.values.county).cities
      : [];
  };

  const handleSurfaceType = (callback) => {
    props.setFieldValue("surface_type", callback(props.values.surface_type));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Venue Details</Text>

      {/* Venue Details */}
      <View style={styles.venueDetailsContainer}>
        <View style={styles.groundImageContainer}>
          <Image
            style={styles.groundImage}
            source={require("../../../../assets/venue.png")}
            resizeMode="contain"
          />
        </View>
      </View>
      {/* Form */}
      <View>
        <View style={{ width: "50%", alignSelf: "center" }}>
          <GreenLinearGradientButton
            title={"ADD VENUE"}
            // onSelect={this.handleSubmit}
            onSelect={() => props.navigation.navigate("Venues")}
            height={45}
            loading={false}
            color={["#1F436E", "#4272B8"]}
          />
        </View>
        <View style={{ alignSelf: "center", width: "80%", marginTop: 20 }}>
          <TextInputField
            placeHolder={"Venue Name"}
            placeHolderColor={"#ffffff"}
            inputFieldBackColor={"transparent"}
            inputColor="#ffffff"
            borderBottomColor={"#ffffff"}
            borderBottomWidth={1.7}
            ref={inputRef}
            profile={true}
            onSubmitEditing={() => {
              // this.passwordTextInput.focus();
            }}
            nonEditAble={true}
            value={item?.name}
            onChangeText={props.handleChange("venue_name")}
          />

          <ErrorText
            message={"venue_name" in props.errors && props.errors.venue_name}
          />
        </View>
        <View style={{ alignSelf: "center", width: "80%" }}>
          <TextInputField
            placeHolder={"Add Location"}
            placeHolderColor={"#ffffff"}
            inputFieldBackColor={"transparent"}
            inputColor="#ffffff"
            borderBottomColor={"#ffffff"}
            borderBottomWidth={1.7}
            ref={inputRef}
            profile={true}
            onSubmitEditing={() => {
              // this.passwordTextInput.focus();
            }}
            value={props.values.area}
            onChangeText={(val) =>
              props.setValues({ ...props.values, area: val })
            }
          />

          <ErrorText message={"area" in props.errors && props.errors?.area} />
        </View>
      </View>

      <View style={styles.selectContainer}>
        <DropDownPicker
          open={openSurface}
          value={props.values.surface_type}
          items={surfaceTypes}
          setOpen={setOpenSurface}
          setValue={(callback) => handleSurfaceType(callback)}
          style={{ borderColor: "#1E2646", backgroundColor: "#1E2646" }}
          textStyle={{ color: "#ffffff" }}
          containerStyle={[styles.dropdownPickerContainer, { borderRadius: 6 }]}
          modalContentContainerStyle={{
            backgroundColor: "#1E2646",
            borderColor: "#1E2646",
            borderWidth: 1,
            marginVertical: 235,
            marginHorizontal: 20,
            borderRadius: 15,
          }}
          placeholder="Surface Type"
          modalProps={{
            transparent: true,
            presentationStyle: "fullScreen", // for iOS, but raises a warning on android if not present
          }}
          listMode="MODAL"
          theme="DARK"
        />
        <ErrorText
          message={"surface_type" in props.errors && props.errors.surface_type}
        />
      </View>
      {props.values.venue_name &&
      props.values.county &&
      props.values.area &&
      props.values.surface_type ? (
        <Buttons {...props} />
      ) : (
        <Buttons {...props} />
        // <DisableButtonGroup {...props} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addVenue: {
    flex: 3,
  },
  dropdownPickerContainer: {
    zIndex: 999,
    width: "80%",
    // marginTop: 15,
  },
  dropdownPickerContainer2: {
    zIndex: 999,
    width: "80%",
    marginTop: 15,
  },
  addAvenuIcon: {
    alignSelf: "center",
    borderRadius: 50,
    paddingLeft: 3,
    backgroundColor: Colors.green,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  container: {
    marginVertical: 10,
    width: "100%",
    flex: 1,
  },
  customVenueData: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  groundImageContainer: {
    alignItems: "center",
    width: "80%",
    height: 79,
    flex: 1,
  },
  groundImage: {
    width: "80%",
    height: 79,
    // borderRadius: 8,
  },
  inputAndLabelContainer: {
    width: "80%",
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputContainerStyle: {
    width: "100%",
    marginLeft: 0,
    marginTop: 0,
  },
  inputStyle: {
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "100%",
  },
  label: {
    textAlign: "left",
    fontSize: 15,
    // fontFamily: "SourceSansPro-SemiBold",
    color: "white",
  },
  labelContainer: {
    marginHorizontal: -20,
  },
  placePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerLeftContainer: {
    flex: 1,
    marginHorizontal: 14,
  },
  pickerRightContainer: {
    flex: 1,
    paddingRight: 10,
  },
  selectContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    // marginTop: 15,
    marginBottom: 10,
    width: "100%",
  },

  surfaceImage: {
    width: 150,
    height: 120,
    borderRadius: 8,
  },
  surfaceTypeContainer: {
    paddingRight: 14,
  },
  surfaceTypeWrapper: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
  },
  text: {
    color: Colors.white,
    width: "87%",
    alignSelf: "flex-end",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "left",
  },
  transparentButton: {
    paddingTop: 10,
    width: "50%",
    borderWidth: 1,
    borderColor: "white",
  },
  typeOfGameImage: {
    width: "80%",
    height: 120,
    borderRadius: 2,
  },
  venueDetailsContainer: {
    width: "100%",
    display: "flex",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});
