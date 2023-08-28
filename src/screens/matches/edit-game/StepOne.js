import { View, Text, StyleSheet, Image } from "react-native";
import React, { useMemo, useState } from "react";
import Colors from "../../../../assets/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonGroup from "./ButtonGroup";
import ErrorText from "./ErrorText";

/**
 *
 * @param {values,setValues,wizardRef,isLastStep,...props,navigation} props [values,setValues,wizardRef, isLastStep]:These are coming from the parent component
 * @param {...props,navigation} props are coming from the react navigation.
 * @returns The React Component
 */

export default function StepOne(props) {
  const [openGameType, setOpenGameType] = useState(false);
  const [openGameSize, setOpenGameSize] = useState(false);

  const gameTypes = useMemo(
    () => [
      { label: "Friendly Match", value: "Friendly Match" },
    { label: "Futsal", value: "Futsal" },
    { label: "Ladies Football", value: "Ladies Football" },
    { label: "Walking Football", value: "Walking Football" },
    ],
    []
  );

  const gameSizes = useMemo(
    () => [
      { label: "5 v 5", value: "5-v-5" },
      { label: "6 v 6", value: "6-v-6" },
      { label: "7 v 7", value: "7-v-7" },
      { label: "9 v 9", value: "9-v-9" },
      { label: "11 v 11", value: "11-v-11" },
      { label: "Unlimited", value: "unlimited" },
    ],
    []
  );

  if (!props.values) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose your game type and size</Text>

      {/* Select Container */}
      <View style={styles.selectContainer}>
        <Image
          resizeMode="contain"
          style={styles.typeOfGameImage}
          source={require("../../../../assets/kick.png")}
        />

        <DropDownPicker
          open={openGameType}
          items={gameTypes}
          setOpen={setOpenGameType}
          value={props.values.game_type}
          setValue={(callback) =>
            props.setFieldValue("game_type", callback(props.values.game_type))
          }
          style={{ borderColor: "#1E2646", backgroundColor: "#1E2646" }}
          containerStyle={[styles.dropdownPickerContainer, { borderRadius: 6 }]}
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
          placeholder="Type of match"
          listMode="MODAL"
          theme="DARK"
        />
        {/* <ErrorText
          message={"game_type" in props.errors && props.errors.game_type}
        /> */}
      </View>
      <View style={[styles.selectContainer, { marginTop: 30 }]}>
        <Image
          resizeMode="contain"
          style={styles.typeOfGameImage}
          source={require("../../../../assets/footballPlayer.png")}
        />
        <DropDownPicker
          open={openGameSize}
          items={gameSizes}
          setOpen={setOpenGameSize}
          value={props.values.game_size}
          setValue={(callback) =>
            props.setFieldValue("game_size", callback(props.values.game_size))
          }
          style={{ borderColor: "#1E2646", backgroundColor: "#1E2646" }}
          textStyle={{ color: "#ffffff" }}
          containerStyle={[styles.dropdownPickerContainer, { borderRadius: 6 }]}
          placeholder="Game size"
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
          listMode="MODAL"
          theme="DARK"
        />
        {/* <ErrorText
          message={"game_size" in props.errors && props.errors.game_size}
        /> */}
      </View>

      <ButtonGroup customStyleContainer={{ marginTop: 30 }} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  dropdownPickerContainer: {
    zIndex: 999,
    width: "80%",
    marginTop: 15,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  selectContainer: {
    alignItems: "center",
    marginTop: 10,
    position: "relative",
    width: "100%",
  },
  typeOfGameImage: {
    width: 150,
    height: 150,
  },
});

// const pickerContainer = StyleSheet.create({

//     viewContainer: {
//         backgroundColor: Colors.white,
//         width: '60%',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         borderRadius: 10,
//         marginVertical: 10
//     },
//     inputIOS: {
//         marginVertical: 7,
//         width: '100%',
//         backgroundColor: 'white',
//         borderRadius: 10,
//         color: 'rgba(112,112,112,0.5)'
//         // to ensure the text is never behind the icon
//     },
//     inputAndroid: {
//         marginVertical: 7,
//         width: '100%',
//         backgroundColor: 'white',
//         paddingLeft: 20,
//         borderRadius: 10,
//         color: 'rgba(112,112,112,0.5)'
//     },
// })
