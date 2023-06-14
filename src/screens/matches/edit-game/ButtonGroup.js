import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SuccessButton from "../../../component/_shared/SuccessButton";

export default function Buttons(props) {
  return (
    <View style={[styles.buttonContainer, props.customStyleContainer]}>
      {props.isLastStep === false ? (
        <SuccessButton
          title="Cancel"
          transparent
          outline
          customStyle={{ borderWidth: 1, borderColor: "white" }}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      ) : null}
      <SuccessButton
        title={props.isLastStep ? "Finish" : "Next"}
        {...props}
        onPress={
          props.onPress ? props.onPress : () => props.wizardRef.current.next()
        }
        disabled={props.wizardRef.current.isLastStep}
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
