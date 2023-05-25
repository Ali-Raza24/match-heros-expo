import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import AuthService from "../../services/AuthService";
import { ListItem } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import moment from "moment";
import { connect } from "react-redux";
import {
  logOutUser,
  readNotification,
  setNotifications,
} from "../../redux/actions";
import TextBold from "../../component/_shared/TextBold";
import SvgImage from "../../../assets/signIn.svg";
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.AuthService = new AuthService();
    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    //  Copy notifications
    let notifications = this.props.notifications.slice().map((notification) => {
      return { ...notification };
    });
    //  Set state with fresh copy of notifications
    this.setState({ notifications: notifications });
  }

  handleNotificationPress = (type, id, related_id) => {
    this.setNotificationToRead(id);
    if (type === "invited_team") {
      this.props.navigation.navigate("PlayerAnswerOnInvitations", {
        id: related_id,
        playerId: id,
      });
      //this.setNotificationToRead(id);
    }
    if (type === "invited_teammate") {
      this.props.navigation.navigate("PlayerAnswerOnTeammateInvitation");
      //this.setNotificationToRead(id);
    }
    if (type === "accept_team") {
      this.props.navigation.navigate("ViewTeam", { id: related_id });
      //this.setNotificationToRead(id);
    }
    if (type === "decline_team") {
      this.props.navigation.navigate("ViewTeam", { id: related_id });
      //this.setNotificationToRead(id);
    }
    if (type === "join_team") {
      //id: related id je id tima na koji se navigira i za koji se pribavljaju join request-i.
      this.props.navigation.navigate("TeamJoinRequests", { id: related_id });
      //this.setNotificationToRead(id);
    }
    //acc and decline join team: related type is same as above.
    if (type === "invite_game") {
      this.props.navigation.navigate("PlayerAnswerOnInvitations", {
        id: related_id,
        playerId: id,
      });
      //this.setNotificationToRead(id);
    }
    if (type === "accept_game") {
      this.props.navigation.navigate("ViewGame", { id: related_id });
      //this.setNotificationToRead(id);
    }
    if (type === "decline_game") {
      this.props.navigation.navigate("ViewGame", { id: related_id });
      //this.setNotificationToRead(id);
    }
    //join game
    if (type === "join_game") {
      console.log("Request", related_id);
      this.props.navigation.push("GameJoinRequests", { id: related_id });
      //this.setNotificationToRead(id);
    }
    if (type === "invite_team_game") {
      this.props.navigation.navigate("TeamInvites", { id: related_id });
      //this.setNotificationToRead(id);
    }
    if (type === "new_booking") {
      //this.setNotificationToRead(id);
    }
    if (type === "remove_game_player") {
      //this.setNotificationToRead(id);
    }
  };

  markAllAsRead = () => {
    let notifications = [...this.props.notifications];
    notifications.map((notification) => {
      if (!notification.read) {
        notification.read = true;
        this.setNotificationToRead(notification.id);
      }
    });
  };

  setNotificationToRead(id) {
    let notifications = [...this.props.notifications];
    this.AuthService.setNotificationToRead(id).then((res) => {
      notifications = notifications.map((notification) => {
        if (notification.id === id) notification.read = true;
        return notification;
      });
      this.props.setNotifications(notifications);
    });
  }

  renderNotifications() {
    if (this.props.notifications.length === 0) {
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
            text={"You don't have notifications yet."}
          />
        </View>
      );
    }
    return (
      <FlatList
        style={{ backgroundColor: "transparent", flex: 1 }}
        data={this.props.notifications}
        showsVerticallScrollIndicator={false}
        renderItem={({ item }) => {
          // console.log("items in notification component#@#@#@", item);
          return (
            <ListItem
              key={item.id.toString()}
              // title={item.title}
              // subtitle={moment(item.created_at).fromNow()}
              // subtitleStyle={styles.arrivalPeriod}
              // hideChevron
              containerStyle={item.read ? styles.read : styles.notRead}
              // titleStyle={item.read ? styles.readText : styles.notReadText}
              onPress={() =>
                this.handleNotificationPress(
                  item.related_type,
                  item.id,
                  item.related_id
                )
              }
            >
              <ListItem.Content>
                <ListItem.Title
                  style={item.read ? styles.readText : styles.notReadText}
                >
                  {item.title}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.arrivalPeriod}>
                  {moment(item.created_at).fromNow()}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        }}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SvgImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 16,
            bottom: 0,
          }}
        />
        {/* <LinearGradient style={{ flex: 1 }} colors={["#5E89E2", "#0E1326"]}> */}
        <StatusBar backgroundColor="#1E2646" barStyle={"light-content"} />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          style={styles.mainContainer}
        >
          <View style={{ width: "100%" }}>
            {this.props.notifications?.length > 0 && (
              <TouchableOpacity onPress={this.markAllAsRead}>
                <Text style={styles.markRead}>Mark all as read</Text>
              </TouchableOpacity>
            )}
          </View>
          {this.renderNotifications()}
        </ScrollView>
        {/* </LinearGradient> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingHorizontal: 26,
    backgroundColor: "transparent",
    paddingVertical: 10,
    // flex: 1
  },
  notRead: {
    backgroundColor: "transparent",
    borderBottomWidth: 0.8,
    borderBottomColor: "#203761",
    paddingVertical: 5,
    marginBottom: 10,
  },
  notReadText: {
    fontSize: 16,
    color: "white",
  },
  read: {
    backgroundColor: "transparent",
    borderBottomWidth: 0.8,
    borderBottomColor: "#203761",
    paddingVertical: 5,
    marginBottom: 10,
  },
  readText: {
    fontSize: 18,
    color: "#959FB4",
  },
  arrivalPeriod: {
    fontSize: 13,
    color: "#959FB4",
  },
  markRead: {
    fontSize: 16,
    textAlign: "right",
    color: "white",
    paddingTop: 10,
    paddingBottom: 20,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps, { setNotifications })(Notifications);
