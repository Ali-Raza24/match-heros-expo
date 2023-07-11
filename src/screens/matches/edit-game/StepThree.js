import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
// import SuccessButton from "../../../_shared/SuccessButton";
import Colors from "../../../../assets/Colors";
import DateTimePicker from "react-native-modal-datetime-picker";
import Buttons from "./ButtonGroup";
import moment from "moment";
import ErrorText from "./ErrorText";
const timeManagementIcon =
  "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/452/external-time-management-work-from-home-flaticons-lineal-color-flat-icons-2.png";

/**
 *
 * @param {values,setValues,wizardRef,isLastStep,...props,navigation} props [values,setValues,wizardRef, isLastStep]:These are coming from the parent component
 * @param {...props,navigation} props are coming from the react navigation.
 * @returns The React Component
 */
export default function StepThree(props) {
  const [state, setState] = useState({ isVisibleDatePicker: false });
  const [buttonTitle, setButtonTitle] = useState("Choose Date:");
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [matchDuration, setMatchDuration] = useState("");
  const [currentDate, setCurrentDate] = useState(props.values.starts_at);
  const [duration, setDuration] = useState("");

  const showPicker = () => {
    setState((prev) => ({ ...prev, isVisibleDatePicker: true }));
  };

  const hidePicker = () => {
    setState((prev) => ({ ...prev, isVisibleDatePicker: false }));
  };

  const durations = useMemo(
    () => [
      { key: 1, label: "30 Minutes", value: 30 },
      { key: 2, label: "60 Minutes", value: 60 },
      { key: 3, label: "90 Minutes", value: 90 },
    ],
    []
  );

  const handleDuration = (callback) => {
    props.setFieldValue(
      "match_duration",
      callback(props.values.match_duration)
    );
    setMatchDuration(callback(matchDuration));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Choose date and time</Text>

      <View
        style={{
          width: "80%",
          marginTop: 30,
          alignSelf: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => showPicker()}
          activeOpacity={0.6}
          style={{ width: "50%" }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              lineHeight: 16,
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            Date:
          </Text>
          <View
            style={{
              backgroundColor: "#1E2646",
              width: 137,
              height: 45,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../../../../assets/calender.png")}
              style={{
                height: 16,
                width: 18,
                resizeMode: "contain",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                lineHeight: 16,
                color: "#ffffff",
              }}
            >
              {props.values.starts_at
                ? moment(props.values.starts_at).format("DD. MMM YYYY")
                : "March 2023"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showPicker()}
          activeOpacity={0.6}
          style={{ width: "50%" }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              lineHeight: 16,
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            Time:
          </Text>
          <View
            style={{
              backgroundColor: "#1E2646",
              width: 97,
              height: 45,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                lineHeight: 16,
                color: "#ffffff",
              }}
            >
              {props.values.starts_at
                ? moment(props.values.starts_at).format("HH:mm")
                : "08:00"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.transparentButtonWrapper}>
          <ErrorText
            message={"starts_at" in props.errors && props.errors.starts_at}
          />
        </View>

        {state.isVisibleDatePicker && (
          <DateTimePicker
            isVisible={state.isVisibleDatePicker}
            onConfirm={(datetime) => {
              setState((prev) => ({ ...prev, isVisibleDatePicker: false }));
              let formatdDate = moment(datetime).format("YYYY-MM-DD HH:mm:ss");
              props.setFieldValue("starts_at", formatdDate);
              setButtonTitle(moment(formatdDate).format("DD. MMM YYYY HH:mm"));
            }}
            onCancel={hidePicker}
            mode={"datetime"}
            is24Hour={true}
            date={new Date()}
            isDarkModeEnabled={false}
            cancelTextIOS={"Exit"}
            confirmTextIOS={"OK"}
            minuteInterval={30}
          />
        )}
      </View>

      <View style={styles.selectContainer}>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "left",
            fontSize: 14,
            lineHeight: 16,
            color: "#ffffff",
            marginBottom: 8,
          }}
        >
          Set Match Duration:
        </Text>
        <ScrollView
          style={{
            height: Dimensions.get("window").height / 4,
            width: "80%",
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            {["30", "60", "90"].map((data, index) => (
              <TouchableOpacity
                onPress={() => {
                  props.setValues({ ...props.values, match_duration: data });
                  setDuration(data);
                }}
                key={index}
                style={{ height: 48 }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    color: duration == data ? "#ffffff" : "#2A345A",
                  }}
                >
                  {data}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <ErrorText
          message={
            "match_duration" in props.errors && props.errors.match_duration
          }
        />
      </View>
      <Buttons {...props} />
    </ScrollView>
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
  selectContainer: {
    alignItems: "center",
    marginTop: 25,
    width: "80%",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },

  text: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  timeManagementContainer: {
    marginVertical: 40,
    paddingHorizontal: 10,
    width: "90%",
    marginLeft: "auto",
    alignItems: "center",
    marginRight: "auto",
  },
  timeManagementWrapper: {
    width: 110,
    height: 110,
    marginTop: 10,
  },
  timeManagementIcon: {
    width: "100%",
    height: "100%",
  },
  timeManagementText: {
    color: "white",
    fontSize: 15,
    paddingHorizontal: 6,
    marginTop: 12,
    letterSpacing: 2,
  },
  transparentButtonWrapper: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 30,
  },
  transparentButton: {
    paddingTop: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
  },
});
