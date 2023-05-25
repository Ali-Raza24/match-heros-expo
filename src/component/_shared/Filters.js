import React, { Component } from "react";
import { Picker, StyleSheet, View } from "react-native";
import { Button, FormLabel } from "react-native-elements";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

class Filters extends Component {
  render() {
    return (
      <View style={styles.filtersContainer}>
        <View style={styles.placePicker}>
          <View style={styles.pickerLeftContainer}>
            <View>
              <FormLabel labelStyle={styles.label}>County:</FormLabel>
            </View>
            <Picker
              itemStyle={{
                color: "#808080",
                // fontFamily: 'SourceSansPro-Regular'
              }}
              style={{ borderBottomColor: "#ebebeb", borderBottomWidth: 1 }}
              selectedValue={this.props.county_id}
              onValueChange={(value) => this.searchGameCounty(value)}
            >
              <Picker.Item label="Choose county" value="" />
              {this.props.counties.map((county) => {
                return (
                  <Picker.Item
                    key={county.id}
                    label={county.name}
                    value={county.id}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={styles.pickerRightContainer}>
            <View>
              <FormLabel labelStyle={styles.label}>City:</FormLabel>
            </View>
            <Picker
              itemStyle={{
                color: "#808080",
                // fontFamily: "SourceSansPro-Regular",
              }}
              style={{ borderBottomColor: "#ebebeb", borderBottomWidth: 1 }}
              selectedValue={this.props.city_id}
              onValueChange={(value) => this.props.searchGameCity(value)}
            >
              <Picker.Item label="Choose city" value="" />
              {this.props.getCities().map((city) => {
                return (
                  <Picker.Item
                    key={city.id}
                    label={city.name}
                    value={city.id}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.placePicker}>
          <View style={styles.pickerLeftContainer}>
            <Button
              title={
                this.props.startDate !== ""
                  ? moment(this.props.startDate).format("DD/MM/YYYY").toString()
                  : "Start time:"
              }
              backgroundColor="#fff"
              buttonStyle={styles.buttonDate}
              color="#393939"
              icon={{ type: "social", name: "alarm", color: "#393939" }}
              onPress={this.props.toggleStartPicker}
            />
            <DateTimePicker
              isVisible={this.props.isVisibleStartPicker}
              onConfirm={this.props.handleStartDate}
              onCancel={this.props.toggleStartPicker}
              mode={"date"}
              is24Hour={true}
              cancelTextIOS={"Exit"}
              confirmTextIOS={"OK"}
              minuteInterval={30}
            />
          </View>
          <View style={styles.pickerRightContainer}>
            <Button
              title={
                this.props.endDate !== ""
                  ? moment(this.props.endDate).format("DD/MM/YYYY").toString()
                  : "Start time:"
              }
              backgroundColor="#fff"
              buttonStyle={styles.buttonDate}
              color="#393939"
              icon={{ type: "social", name: "alarm", color: "#393939" }}
              onPress={this.props.toggleEndPicker}
            />
            <DateTimePicker
              isVisible={this.props.isVisibleEndPicker}
              onConfirm={this.props.handleEndDate}
              onCancel={this.props.toggleEndPicker}
              mode={"date"}
              is24Hour={true}
              cancelTextIOS={"Exit"}
              confirmTextIOS={"OK"}
              minuteInterval={30}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerLeftContainer: {
    flex: 1,
  },
  pickerRightContainer: {
    flex: 1,
    marginLeft: 10,
  },
  placePicker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "left",
  },
  segmentSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingHorizontal: 54,
  },
  buttonDate: {
    borderColor: "#a2a2a2",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
  },
  filtersContainer: {
    width: "97%",
    borderColor: "#ebebeb",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
export default Filters;
