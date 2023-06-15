import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import Colors from "../../../../assets/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import Buttons from "./ButtonGroup";
import ErrorText from "./ErrorText";
import TwoWaySlider from "../../../component/molecules/TwoWaySlider";

const flashIcon =
  "https://img.icons8.com/external-nawicon-flat-nawicon/452/external-flash-energy-nawicon-flat-nawicon.png";

/**
 *
 * @param {values,setValues,wizardRef,isLastStep,...props,navigation} props [values,setValues,wizardRef, isLastStep]:These are coming from the parent component
 * @param {...props,navigation} props are coming from the react navigation.
 * @returns The React Component
 */
export default function StepFour(props) {
  const [openGameSpeed, setOpenGameSpeed] = useState(false);
  const [openAvgPlayer, setOpenAvgPlayer] = useState(false);
  const [gameSpeed, setGameSpeed] = useState("");
  const [averagePlayerAge, setAveragePlayerAge] = useState("");
  // Header Right configuration
  // The Skip text will navigate to the Next Screen without setting up optional game details
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => props.wizardRef.current.next()}>
          <Text style={styles.text}>Skip</Text>
        </TouchableOpacity>
      ),
    });
    return () => {
      props.navigation.setOptions({ headerRight: null });
    };
  }, [props.navigation]);

  const gameSpeeds = useMemo(() => {
    return [
      { key: 1, label: "Slow", value: "slow" },
      { key: 1, label: "Moderate", value: "moderate" },
      { key: 1, label: "Fast", value: "fast" },
      { key: 1, label: "Mixed", value: "mixed" },
    ];
  }, []);

  const averageAges = useMemo(
    () => [
      { id: 1, label: "13-15", value: "13-15" },
      { id: 2, label: "15-18", value: "15-18" },
      { id: 3, label: "18-25", value: "18-25" },
      { id: 4, label: "25-35", value: "25-35" },
      { id: 5, label: "35-45", value: "35-45" },
      { id: 6, label: "45-55", value: "45-55" },
      { id: 7, label: "55-65", value: "55-65" },
      { id: 8, label: "65+", value: "65+" },
    ],
    []
  );

  useLayoutEffect(() => {
    if (props.values?.game_speed) {
      setGameSpeed(props.values.game_speed);
    }
  }, []);

  const handleGameSpeed = (callback) => {
    props.setFieldValue("game_speed", callback(props.values.game_speed));
    setGameSpeed(callback(gameSpeed));
  };
  const callBacks = (min, max) => {
    props.setValues({
      ...props.values,
      minAgeOfPlayer: min,
      maxAgeOfPlayer: max,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ width: "100%", alignSelf: "center" }}>
        <View style={{ width: "80%", alignSelf: "center" }}>
          <Text style={{ ...styles.text, textAlign: "left" }}>
            Add (optional match details)
          </Text>

          <View style={styles.gameSpeedContainer}>
            {/* <Text style={styles.gameSpeedText}>Match Speed</Text> */}

            {/* Game Speed Picker */}
            <View style={styles.pickerContainer}>
              <DropDownPicker
                open={openGameSpeed}
                items={gameSpeeds}
                setOpen={setOpenGameSpeed}
                value={props.values.game_speed}
                setValue={(callback) => handleGameSpeed(callback)}
                style={{ borderColor: "#1E2646", backgroundColor: "#1E2646" }}
                textStyle={{ color: "#ffffff" }}
                containerStyle={[
                  styles.dropdownPickerContainer,
                  { borderRadius: 6 },
                ]}
                modalContentContainerStyle={{
                  backgroundColor: "#1E2646",
                  borderColor: "#1E2646",
                  borderWidth: 1,
                  marginVertical: 200,
                  marginHorizontal: 20,
                  borderRadius: 15,
                }}
                placeholder="Match Speed"
                modalProps={{
                  transparent: true,
                  presentationStyle: "fullScreen", // for iOS, but raises a warning on android if not present
                }}
                listMode="MODAL"
                theme="DARK"
              />
              <ErrorText
                message={
                  "game_speed" in props.errors && props.errors.game_speed
                }
              />
            </View>
          </View>

          {/* Average Player Age */}
          <View>
            <View>
              <Text style={{ ...styles.averageGameText, textAlign: "left" }}>
                Average age of players
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 18,
                }}
              >
                <Image
                  source={require("../../../../assets/averageAgePlayer.png")}
                  style={{ resizeMode: "contain", height: 129, width: 109 }}
                />
              </View>
            </View>

            <View>
              <TwoWaySlider callBack={callBacks} />
            </View>
            {/* <View style={styles.pickerContainer}>
          <DropDownPicker
            open={openAvgPlayer}
            items={averageAges}
            setOpen={setOpenAvgPlayer}
            value={props.values.avg_game_players}
            setValue={(callback) =>
              props.setFieldValue(
                "avg_game_players",
                callback(props.values.avg_game_players)
              )
            }
            style={{ borderColor: "white" }}
            containerStyle={styles.dropdownPickerContainer2}
            placeholder="Average age of players"
            modalContentContainerStyle={{
              backgroundColor: "#fff",
              borderColor: "#000",
              borderWidth: 1,
              marginVertical: 220,
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
          <ErrorText
            message={
              "avg_game_players" in props.errors &&
              props.errors.avg_game_players
            }
          />
        </View> */}
          </View>
        </View>

        <Buttons customStyleContainer={{ marginTop: 30 }} {...props} />
      </View>
    </ScrollView>
  );
}

// Picker Styles

// const pickerSelectStyles = StyleSheet.create({
//     viewContainer: {
//         backgroundColor: Colors.white,
//         width: '100%',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         borderRadius: 10,
//         marginVertical: 10
//     },
//     inputIOS: {
//         marginVertical: 7,
//         width: '90%',
//         backgroundColor: 'white',
//         borderRadius: 10,
//         color: 'rgba(112,112,112,0.5)'
//         // to ensure the text is never behind the icon
//     },
//     inputAndroid: {
//         marginVertical: 7,
//         marginHorizontal: 4,
//         width: '90%',
//         backgroundColor: 'white',

//         borderRadius: 10,
//         color: 'rgba(112,112,112,0.5)'
//     },
// })

const styles = StyleSheet.create({
  averageGameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  averageGameTextAndImageWrapper: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  averageGameText: {
    color: "white",
    fontSize: 21,
    marginBottom: 7,
    textAlign: "center",
  },
  averageGameImage: {
    width: 110,
    height: 100,
    maxHeight: 100,
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
  },
  dropdownPickerContainer2: {
    zIndex: 999,
    width: "100%",
    marginTop: 15,
    height: "auto",
  },
  gameSpeedContainer: {
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    alignSelf: "center",
    width: "100%",
  },
  gameSpeedText: {
    color: "white",
    fontSize: 21,
    textAlign: "left",
  },
  gameSpeedIconWrapper: {
    width: 50,
    height: 50,
  },
  gameSpeedTextAndIconWrapper: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});
