import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Button } from "react-native-elements";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import DatePicker from "react-native-datepicker";

class SearchAreaOld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {this.props && (
          <View style={styles.filtersContainer}>
            <View style={styles.placePicker}>
              <View style={styles.pickerLeftContainer}>
                <RNPickerSelect
                  itemStyle={{
                    color: "#808080",
                    //  fontFamily: 'SourceSansPro-Regular'
                  }}
                  style={pickerSelectStyles}
                  value={this.props.county_id}
                  placeholder={{ label: "County", value: "" }}
                  onValueChange={(value) => this.props.searchCounty(value)}
                  items={this.props.counties.map((county) => {
                    return {
                      key: county.id,
                      label: county.name,
                      value: county.id,
                    };
                  })}
                ></RNPickerSelect>
              </View>
              {this.props.county_id !== "" && (
                <View style={styles.pickerRightContainer}>
                  <RNPickerSelect
                    itemStyle={{
                      color: "#808080",
                      //   fontFamily: "SourceSansPro-Regular",
                    }}
                    style={pickerSelectStyles}
                    value={this.props.city_id}
                    placeholder={{ label: "City", value: "" }}
                    onValueChange={(value) => this.props.searchCity(value)}
                    items={this.props.getCities().map((city) => {
                      return { key: city.id, label: city.name, value: city.id };
                    })}
                  ></RNPickerSelect>
                </View>
              )}
            </View>
            {this.props.dateTime && (
              <View style={styles.placePicker}>
                <View style={styles.pickerLeftContainer}>
                  {/*<Button*/}
                  {/*    title={this.props.startDate !== "" ? moment(this.props.startDate).format('DD/MM/YYYY').toString() : "Start time"}*/}
                  {/*    backgroundColor="#fff"*/}
                  {/*    buttonStyle={styles.buttonDate}*/}
                  {/*    containerViewStyle={{width: '100%'}}*/}
                  {/*    color='rgba(112,112,112,0.5)'*/}
                  {/*    fontSize={16}*/}
                  {/*    onPress={this.props.toggleStartPicker}*/}
                  {/*/>*/}
                  <DatePicker
                    style={{
                      width: "100%",
                      paddingVertical: 5,
                    }}
                    showIcon={false}
                    mode="date"
                    //format="DD/MM/YYYY"
                    placeholder={"Start Date"}
                    date={
                      this.props.startDate ? this.props.startDate : moment()
                    }
                    // minDate="1950-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateText: {
                        fontSize: 18,
                        // fontFamily: "SourceSansPro-Regular",
                      },
                      dateInput: {
                        alignItems: "flex-start",
                        backgroundColor: "white",
                        borderWidth: 0,
                        paddingLeft: 5,
                        height: 50,
                        borderBottomWidth: 1,
                      },
                    }}
                    onDateChange={this.props.handleStartDate}
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
                    isDarkModeEnabled={true}
                  />
                </View>
                <View style={styles.pickerRightContainer}>
                  {/*<Button*/}
                  {/*    title={this.props.endDate !== "" ? moment(this.props.endDate).format('DD/MM/YYYY').toString() : "End time"}*/}
                  {/*    backgroundColor="#fff"*/}
                  {/*    buttonStyle={styles.buttonDate}*/}
                  {/*    containerViewStyle={{width: '100%'}}*/}
                  {/*    color='rgba(112,112,112,0.5)'*/}
                  {/*    fontSize={16}*/}
                  {/*    onPress={this.props.toggleEndPicker}*/}
                  {/*/>*/}
                  <DatePicker
                    style={{
                      width: "100%",
                      paddingVertical: 5,
                    }}
                    showIcon={false}
                    mode="date"
                    //format="DD/MM/YYYY"
                    placeholder={"End Date"}
                    date={this.props.startDate ? this.props.endDate : moment()}
                    // minDate="1950-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateText: {
                        fontSize: 18,
                        // fontFamily: "SourceSansPro-Regular",
                      },
                      dateInput: {
                        alignItems: "flex-start",
                        backgroundColor: "white",
                        borderWidth: 0,
                        paddingLeft: 5,
                        height: 50,
                        borderBottomWidth: 1,
                      },
                    }}
                    onDateChange={this.props.handleEndDate}
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
            )}
          </View>
        )}
      </React.Fragment>
    );
  }
}

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

export default SearchAreaOld;
