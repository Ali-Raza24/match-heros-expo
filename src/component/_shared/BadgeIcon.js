import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import AuthService from "../../services/AuthService";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import { connect } from "react-redux";
import {
  fetchUserTokens,
  logOutUser,
  setNotifications,
  updateUserTokens,
} from "../../redux/actions";
import config from "../../../config";

class BadgeIcon extends Component {
  constructor(props) {
    super(props);

    window.Pusher = Pusher;
    this.AuthService = new AuthService();
    this.state = {
      notifications: [],
      badgeNumber: 0,
      userId: null,
    };

    this.channelsSubscribed = false;
  }

  componentDidMount() {
    let notifications = [...this.props.notifications];
    this.setState({
      notifications: notifications,
      badgeNumber: this.props.notifications.filter((n) => !n.read).length,
    });

    this.AuthService._getAuthHeader().then((headers) => {
      this.echo = new Echo({
        broadcaster: "pusher",
        key: config.PUSHER.KEY,
        cluster: config.PUSHER.CLUSTER,
        authEndpoint: config.PUSHER.AUTH_ENDPOINT,
        auth: {
          headers: headers,
        },
      });
      this.subscribeToChannels();
    });
  }

  componentDidUpdate() {
    this.subscribeToChannels();
  }

  subscribeToChannels() {
    if (!this.props.user || !this.echo || this.channelsSubscribed) {
      return;
    }
    this.channelsSubscribed = true;

    // this.echo.channel(`users.${this.props.user.id}`)
    //   .listen('NewInviteToTeamRequestEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('AcceptInviteToTeamEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('DeclineInviteToTeamEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   //join to team with acc and decline
    //   .listen('NewJoinToTeamEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('AcceptJoinTeamEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('DeclineJoinTeamEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   //invite to game with acc and decline
    //   .listen('NewInviteToGameEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('AcceptInviteToGameEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('DeclineInviteToGameEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   //join game with acc and decline
    //   .listen('NewJoinToGameEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('AcceptJoinToGameEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('DeclineJoinToGameEvent', event => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('CreditsReceived', (event) => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('BookingCanceled', (event) => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('FailedBooking', (event) => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('NewBooking', (event) => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('RemoveTeamPlayer', (event) => {
    //     this.handleNewNotification(event.notification);
    //   })
    //   .listen('UpdateTokens', (event) => {
    //     this.props.updateUserTokens(event.user.tokens);
    //     console.log('update tokens', event);
    //   });
  }

  componentWillUnmount() {
    // this.echo.channel(`users.${this.props.user.id}`)
    //   .stopListening('NewInviteToTeamRequestEvent')
    //   .stopListening('NewJoinToTeamEvent')
    //   .stopListening('NewInviteToGameEvent')
    //   .stopListening('AcceptJoinTeamEvent')
    //   .stopListening('DeclineJoinTeamEvent')
    //   .stopListening('AcceptInviteToTeamEvent')
    //   .stopListening('DeclineInviteToTeamEvent')
    //   .stopListening('AcceptInviteToGameEvent')
    //   .stopListening('DeclineInviteToGameEvent')
    //   .stopListening('NewJoinToGameEvent')
    //   .stopListening('AcceptJoinToGameEvent')
    //   .stopListening('DeclineJoinToGameEvent')
    //   .stopListening('CreditsReceived')
    //   .stopListening('BookingCanceled')
    //   .stopListening('FailedBooking')
    //   .stopListening('NewBooking')
    //   .stopListening('RemoveTeamPlayer')
    //   .stopListening('UpdateTokens');
    // this.echo.disconnect();
  }

  handleNewNotification = (notification) => {
    let notifications = [notification, ...this.props.notifications];
    this.props.setNotifications(notifications);
    this.setState({ badgeNumber: this.state.badgeNumber + 1 });
  };

  notReadNotificationsNumber = () => {
    return this.props.notifications.filter((n) => !n.read).length;
  };

  render() {
    // const badgeNumber = this.state.notifications.filter(n => !n.read).length;
    return (
      <TouchableOpacity
        style={[styles.mainContainer, this.props.style]}
        onPress={this.props.onPress}
      >
        <Image
          source={require("../../../assets/image/bell.png")}
          style={styles.iconStyle}
        />
        {this.notReadNotificationsNumber() > 0 && (
          <View style={styles.notificationNumberContainer}>
            <Text style={styles.textStyle}>
              {this.notReadNotificationsNumber()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 32,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  iconContainer: {
    width: 30,
    height: 30,
    position: "relative",
  },
  textStyle: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: 12,
    color: "white",
  },
  notificationNumberContainer: {
    position: "absolute",
    top: 3,
    right: 23,
    backgroundColor: "#E99600",
    borderRadius: 100,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps, {
  logOutUser,
  setNotifications,
  updateUserTokens,
})(BadgeIcon);
