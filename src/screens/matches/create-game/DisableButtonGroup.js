import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SuccessButton from "../../../component/_shared/SuccessButton";

export default function DisableButtonGroup(props) {
  //   console.log("props values is:!....", props);
  return (
    <View style={[styles.buttonContainer, props.customStyleContainer]}>
      {props.isLastStep === false ? (
        <SuccessButton
          title="Cancel"
          transparent
          outline
          customStyle={{ backgroundColor: "#203761" }}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      ) : null}
      <SuccessButton
        title={props.isLastStep ? "Finish" : "Next"}
        customStyle={{ backgroundColor: "#0A5129" }}
        {...props}
        onPress={
          props.onPress ? props.onPress : () => props.wizardRef.current.next()
        }
        disabled={true}
      />
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
});
