import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const SearchArea = (props) => {
  return (
    <React.Fragment>
      {props && (
        <View style={styles.filtersContainer}>
          <View style={styles.placePicker}>
            <View style={styles.pickerLeftContainer}>
              <RNPickerSelect
                itemStyle={{
                  color: "#808080",
                  //  fontFamily: 'SourceSansPro-Regular'
                }}
                style={pickerSelectStyles}
                value={props.gameType}
                placeholder={{ label: "Choose Game Type", value: "" }}
                onValueChange={props.onValueChange}
                items={
                  props.items.length &&
                  props.items.map((v, i) => ({ key: i, ...v }))
                }
              ></RNPickerSelect>
            </View>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    borderTopWidth: 0,
    paddingLeft: 10,
    color: "rgba(112,112,112,0.5)",
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "white",
    borderRadius: 10,
    color: "rgba(112,112,112,0.5)",
  },
});
const styles = StyleSheet.create({
  pickerLeftContainer: {
    flex: 1,
    alignItems: "center",
  },
  pickerRightContainer: {
    width: "100%",
    flex: 1,
    marginLeft: 20,
    alignItems: "center",
  },
  placePicker: {
    width: "100%",
    paddingTop: 10,
    paddingHorizontal: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "left",
  },
  search: {
    width: "100%",
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  searchSection: {
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDate: {
    borderColor: "#a2a2a2",
    borderWidth: 1,
    height: 45,
    marginTop: 15,
    borderRadius: 10,
  },
  filtersContainer: {
    width: "100%",
    marginVertical: 20,
    paddingHorizontal: 0,
  },
});

export default SearchArea;
