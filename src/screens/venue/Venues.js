import React, { Component } from "react";
import {
  View,
  RefreshControl,
  StyleSheet,
  Picker,
  FlatList,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import VenueService from "../../services/VenueService";
import {
  ListItem,
  SearchBar,
  Button,
  FormLabel,
  Avatar,
} from "react-native-elements";
// import Colors from "../../../../assets/Colors";
import counties from "../../component/_shared/Counties";
// import BadgeIcon from "../../_shared/BadgeIcon";
import ImageService from "../../services/ImageService";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
// import RNPickerSelect from "react-native-picker-select";
import SearchArea from "../../component/_shared/SearchArea";
import TextBold from "../../component/_shared/TextBold";
import SvgImage from "../../../assets/signIn.svg";

export default class Venues extends Component {
  constructor(props) {
    super(props);
    this.VenueService = new VenueService();
    this.ImageService = new ImageService();
    this.counties = counties;
    this.state = {
      venues: [],
      refreshing: false,
      endReached: false,
      city_id: "",
      county_id: "",
      showFilter: false,
      nextLink: "",
      loading: true,
    };
  }

  componentDidMount() {
    this.getVenues();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getVenues().then(() => this.setState({ refreshing: false }));
  };

  getVenues(params) {
    return this.VenueService.getVenues(params).then((response) => {
      this.setState({
        venues: response.data,
        nextLink: response.links.next,
        loading: false,
      });
    });
  }

  onChange = (searchTearm) => {
    let params = { venue: searchTearm };
    if (this.state.city_id != "") {
      params.city_id = this.state.city_id;
    } else if (this.state.county_id != "") {
      params.county_id = this.state.county_id;
    }
    this.getVenues(params);
  };

  getCities = () => {
    console.log("get cities", this.state.county_id);
    if (this.state.county_id === "") {
      return [{ name: "City", id: "" }];
    }
    let filteredCounty = this.counties.find(
      (x) => x.id === this.state.county_id
    );
    console.log(filteredCounty);
    return filteredCounty ? filteredCounty.cities : [{ name: "City", id: "" }];
  };

  handleShowingFilter = () => {
    let showFilter = !this.state.showFilter;
    this.setState({ showFilter: showFilter });
  };

  searchVenueCounty(id) {
    this.setState({ county_id: id, city_id: "" });
    let params = { county_id: id };
    this.getVenues(params);
  }

  searchVenueCity(id) {
    this.setState({ city_id: id });
    let params = { city_id: id };
    this.getVenues(params);
  }

  handleLoadMore = () => {
    if (this.state.nextLink) {
      this.setState({ endReached: true });
      this.VenueService.getNextVenues(this.state.nextLink).then((response) =>
        this.setState({
          endReached: false,
          nextLink: response.links.next,
          venues: [...this.state.venues, ...response.data],
        })
      );
    }
  };

  renderFooter = () => {
    return this.state.endReached && this.state.nextLink !== null ? (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size={50} color="#2b87ff" animating={true} />
        </View>
      </View>
    ) : null;
  };

  renderEmptyList = () => {
    return (
      <View
        style={{
          paddingVertical: 100,
          paddingHorizontal: 26,
          width: "100%",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <TextBold
          style={{
            color: "white",
            paddingVertical: 20,
            lineHeight: 30,
            fontSize: 20,
            // fontFamily: 'SourceSansPro-Bold',
            textAlign: "center",
          }}
          text="No Results found"
        />
      </View>
    );
  };

  render() {
    const routes = this.props.navigation.getState()?.routes;
    const prevRoute = routes[routes?.length - 2];
    console.log("previous route name is:#@#@#@", prevRoute?.name);
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
        {/* //   <LinearGradient style={{ flex: 1,  }} colors={["#5E89E2", "#0E1326"]}> */}
        <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />

        <View style={styles.mainContainer}>
          <View style={styles.searchSection}>
            <View style={styles.search}>
              <TouchableOpacity
                style={{ paddingBottom: 15, paddingLeft: 10, zIndex: 999 }}
              >
                <Image
                  source={require("../../../assets/search.png")}
                  style={{ width: 16, height: 16 }}
                />
              </TouchableOpacity>
              <SearchBar
                searchIcon={false}
                style={{ backgroundColor: "#ffffff" }}
                containerStyle={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  padding: 0,
                  margin: 0,
                  paddingLeft: 20,
                  borderTopWidth: 0,
                  justifyContent: "flex-start",
                  borderBottomWidth: 0,
                }}
                inputContainerStyle={{ backgroundColor: "#fff" }}
                inputStyle={{
                  backgroundColor: "#ffffff",
                  paddingBottom: 0,
                  color: "white",
                }}
                lightTheme={true}
                onChangeText={this.onChange}
                placeholder={"Search Venues"}
                placeholderTextColor="#ADB1B2"
              />
              {/* Navigate to Player Search Filter Screen */}
              <TouchableOpacity
              //   onPress={() => this.props.navigation.navigate("SearchPlayerFilter")}
              >
                <View
                  style={{
                    height: 20,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingBottom: 25,
                    width: 20,
                  }}
                >
                  <Image
                    source={require("../../../assets/filter.png")}
                    style={{ width: 16, height: 10.7 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.searchSection}>
            <View style={styles.search}>
              <TouchableOpacity
                style={{ paddingBottom: 15, paddingLeft: 10 }}
              >

                <Image source={require("../../../assets/search.png")}
                  style={{ width: 16, height: 16 }} />

              </TouchableOpacity>
              <SearchBar
                noIcon
                containerStyle={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  padding: 0,
                  margin: 0,
                  paddingLeft: 20,
                  borderTopWidth: 0,
                  justifyContent: 'flex-start',
                  borderBottomWidth: 0
                }}
                inputStyle={{ backgroundColor: 'transparent', paddingBottom: 0, color: 'white' }}
                lightTheme={true}
                onChangeText={this.onChange}
                placeholder={'Search Venues'}
                ref={input => {
                  this.searchTextInput = input
                }}
                onSubmitEditing={() => {
                  this.searchTextInput.blur()
                }}
                placeholderTextColor='white'
              />
              <TouchableOpacity
                onPress={this.handleShowingFilter}>
                <View style={{
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingBottom: 30,
                  width: 20
                }}>
                  {this.state.showFilter ?
                    <Image source={require("../../../assets/filter.png")}
                      style={{ width: 16, height: 10.7 }} />
                    :
                    <Image source={require("../../../assets/filter.png")}
                      style={{ width: 16, height: 10.7 }} />
                  }
                </View>
              </TouchableOpacity>
            </View>

          </View> */}

          {this.state.showFilter && (
            <View style={{ width: "100%", paddingHorizontal: 26 }}>
              <SearchArea
                county_id={this.state.county_id}
                counties={this.counties}
                searchCounty={(county) => this.searchVenueCounty(county)}
                city_id={this.state.city_id}
                searchCity={(city) => this.searchVenueCity(city)}
                getCities={this.getCities}
                dateTime={false}
              />
            </View>
          )}
          {this.state.loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                size={50}
                color="#2b87ff"
                animating={this.state.loading}
              />
            </View>
          ) : (
            <FlatList
              style={{
                backgroundColor: "transparent",
                paddingHorizontal: 26,
              }}
              data={this.state.venues}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  containerStyle={{
                    alignItems: "center",
                    backgroundColor: "transparent",
                    borderBottomColor: "#0B8140",
                    borderBottomWidth: 0.5,
                    justifyContent: "center",
                    paddingTop: 10,
                    flex: 1,
                    flexDirection: "row",
                    paddingBottom: 10,
                    height: 100,
                  }}
                  activeOpacity={1}
                  style={{ backgroundColor: "transparent" }}
                  onPress={() =>
                    prevRoute?.name == "Dashboard"
                      ? this.props.navigation.navigate("VenuesInfo", {
                          item: item,
                        })
                      : this.props.navigation.navigate("CreateMatch", {
                          item: item,
                        })
                  }
                >
                  <Avatar
                    containerStyle={{ height: 70, width: 70, borderRadius: 35 }}
                    avatarStyle={{
                      height: 70,
                      width: 70,
                      borderRadius: 35,
                      resizeMode: "cover",
                    }}
                    source={require("../../../assets/image/default_avatar.jpg")}
                    //    source={ this.ImageService.getVenueUri(item.id, item.image)}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ color: "#ffffff", fontSize: 16 }}>
                      {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{ color: "#ffffff", fontSize: 14 }}
                    >
                      {item.location.county.name +
                        ", " +
                        item.location.city.name}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron
                    color={"#0B8140"}
                    size={28}
                    style={{ color: "#ffffff", alignSelf: "center" }}
                  />
                </ListItem>
              )}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.2}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
              ListEmptyComponent={this.renderEmptyList}
            />
          )}
          {this.state.loading && <ActivityIndicator />}
        </View>
      </>
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
  mainContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  pickerLeftContainer: {
    flex: 1,
    marginLeft: 20,
  },
  pickerRightContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  search: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  searchSection: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  placePicker: {
    paddingHorizontal: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "transparent",
  },
  filtersContainer: {
    width: "100%",
    padding: 10,
    marginBottom: 5,
  },
});
