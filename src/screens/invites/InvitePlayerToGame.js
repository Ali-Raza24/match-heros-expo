import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  Picker,
  Text,
  TouchableOpacity,
} from "react-native";
import PlayerService from "../../services/PlayerService";
import ImageService from "../../services/ImageService";
import Colors from "../../../assets/Colors";
import {
  ListItem,
  List,
  SearchBar,
  Avatar,
  Button,
  Icon,
} from "react-native-elements";
import counties from "../../component/_shared/Counties";

export default class InvitePlayerToGame extends Component {
  constructor(props) {
    super(props);
    this.PlayerService = new PlayerService();
    this.ImageService = new ImageService();
    this.counties = counties;
    this.state = {
      allPlayers: null,
      invitations: [],
      searchTearm: "",
      city_id: "",
      county_id: "",
      showFilter: false,
      showLoadingIcon: false,
    };
  }

  componentDidMount() {
    //invited set in state
    const invited = this.props.route.params.invited;
    this.PlayerService.getPlayers().then((players) =>
      this.setState({ allPlayers: players, invitations: invited })
    );
  }

  searchPlayer(params) {
    this.PlayerService.getPlayers(params).then((players) =>
      this.setState({ allPlayers: players, showLoadingIcon: false })
    );
  }

  searchPlayerCounty(id) {
    this.setState({ county_id: id, city_id: "" });
    let params = { county_id: id };
    this.searchPlayer(params);
  }

  searchPlayerCity(id) {
    this.setState({ city_id: id });
    let params = { city_id: id };
    this.searchPlayer(params);
  }

  getCities() {
    return this.counties.find((x) => x.id === this.state.county_id)
      ? this.counties.find((x) => x.id === this.state.county_id).cities
      : [];
  }

  isChecked(id) {
    return this.state.invitations.findIndex((player) => player.id == id) > -1;
  }

  onChange = (searchTearm) => {
    let params;
    if (this.state.city_id != "") {
      params = { player: searchTearm, city_id: this.state.city_id };
    } else if (this.state.county_id != "") {
      params = { player: searchTearm, county_id: this.state.county_id };
    } else {
      params = { player: searchTearm };
    }
    this.searchPlayer(params);
  };

  handleShowingFilter = () => {
    showFilter = !this.state.showFilter;
    this.setState({ showFilter: showFilter });
  };

  toggleInvite(player, index) {
    let invitationList = this.state.invitations.slice();
    if (!this.isChecked(player.id)) {
      player.fee = null;
      invitationList.push(player);
      this.setState({ invitations: invitationList });
    } else this.removePlayerFromList(player.id);
  }

  removePlayerFromList(id) {
    let invitationList = this.state.invitations;
    for (var i = 0; i < invitationList.length; i++) {
      if (invitationList[i].id == id) {
        invitationList.splice(i, 1);
        i--;
      }
    }
    this.setState({ invitations: invitationList });
  }

  goGack = () => {
    this.props.navigation.goBack();
    this.props.navigation.state.params.onReturnBack({
      invitationList: this.state.invitations,
    });
  };

  render() {
    const showSpinner = !this.state.allPlayers;
    if (showSpinner) {
      return <ActivityIndicator />;
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.mainContainer}>
          <View style={{ flexDirection: "row" }}>
            <SearchBar
              onChangeText={(text) => this.onChange(text)}
              containerStyle={{
                backgroundColor: "white",
                borderBottomWidth: 0,
                borderTopWidth: 0,
                flex: 1,
              }}
              inputStyle={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#ebebeb",
              }}
              round={true}
              showLoadingIcon={this.state.showLoadingIcon}
              lightTheme
              placeholder="Player name..."
            />
            <Button
              title={this.state.showFilter ? "" : "filter"}
              backgroundColor="#fff"
              color="#393939"
              icon={{
                type: "feather",
                name: "align-justify",
                color: "#393939",
              }}
              onPress={this.handleShowingFilter}
            />
          </View>
          {this.state.showFilter && (
            <View style={styles.placePicker}>
              <View style={styles.pickerLeftContainer}>
                <View style={{ marginLeft: -20 }}>
                  <Text style={styles.label}>County:</Text>
                </View>
                <Picker
                  itemStyle={{
                    color: "#808080",
                    //  fontFamily: 'SourceSansPro-Regular'
                  }}
                  style={{ borderBottomColor: "#ebebeb", borderBottomWidth: 1 }}
                  selectedValue={this.state.county_id}
                  onValueChange={(value) => this.searchPlayerCounty(value)}
                >
                  <Picker.Item label="Choose county" value="" />
                  {this.counties.map((county) => {
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
                <View style={{ marginLeft: -15 }}>
                  <Text style={styles.label}>City:</Text>
                </View>
                <Picker
                  itemStyle={{
                    color: "#808080",
                    //  fontFamily: 'SourceSansPro-Regular'
                  }}
                  style={{ borderBottomColor: "#ebebeb", borderBottomWidth: 1 }}
                  selectedValue={this.state.city_id}
                  onValueChange={(value) => this.searchPlayerCity(value)}
                >
                  <Picker.Item label="Choose city" value="" />
                  {this.getCities().map((city) => {
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
          )}

          {this.state.invitations.map((invitation) => {
            return (
              <TouchableOpacity
                key={invitation.id}
                style={{ flexDirection: "row", paddingLeft: 10 }}
                onPress={() => this.removePlayerFromList(invitation.id)}
              >
                <View style={{ width: "50%" }}>
                  <Text style={{ fontSize: 18 }} key={invitation.id}>
                    {invitation.name}
                  </Text>
                </View>
                <View>
                  <Icon name="minus" type="font-awesome" color="red" />
                </View>
              </TouchableOpacity>
            );
          })}
          <List containerStyle={{ marginBottom: 20 }}>
            {this.state.allPlayers.map((p, index) => (
              <React.Fragment key={index}>
                <ListItem
                  containerStyle={
                    this.isChecked(p.id) ? { backgroundColor: "#b7cff4" } : null
                  }
                  // avatar={this.ImageService.getPlayerAvatarUri(p.avatar, p.id)}
                  // avatarStyle={{ borderColor: Colors.blue, borderWidth: 1 }}
                  key={p.id}
                  // title={p.name}
                  // subtitle={p.county ? `${p.county}, ${p.city}` : ""}
                  onPress={() => this.toggleInvite(p, index)}
                  // onPressRightIcon={() => this.props.navigation.push("ViewPlayer", { id: p.id })}
                >
                  <Avatar
                    containerStyle={{
                      borderRadius: 30,
                      borderColor: Colors.blue,
                      borderWidth: 1,
                      width: 60,
                      height: 60,
                      //  resizeMode: "contain",
                    }}
                    avatarStyle={{
                      borderRadius: 30,
                      borderColor: Colors.blue,
                      borderWidth: 1,
                      width: 60,
                      height: 60,
                      resizeMode: "contain",
                    }}
                    source={require("../../../assets/image/default_avatar.jpg")}
                    //  source={ this.ImageService.getPlayerAvatarUri(item.avatar, item.id)}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ color: "white", fontSize: 16 }}>
                      {p?.name}
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: "normal",
                      }}
                    >
                      {p.county ? `${p.county}, ${p.city}` : ""}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron
                    color={"#0B8140"}
                    size={28}
                    style={{ color: "#ffffff", alignSelf: "center" }}
                    onPress={() =>
                      this.props.navigation.push("ViewPlayer", { id: p.id })
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </ScrollView>
        {this.state.invitations.length > 0 && (
          <View style={{ backgroundColor: "white" }}>
            <Button
              onPress={this.goGack}
              title="Done"
              backgroundColor={Colors.blue}
              fontSize={20}
              fontWeight="bold"
              containerViewStyle={{ width: "100%", marginLeft: 0 }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
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
  placePicker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  doneButton: {
    color: "red",
  },
});
