import React, {
  Component,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import GameService from "../../services/GameService";
import { Icon } from "react-native-elements";
//   import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import { GiftedChat } from "react-native-gifted-chat";
import ChatService from "../../services/ChatService";
import ImageService from "../../services/ImageService";
import AuthService from "../../services/AuthService";
// import config from "../../../config";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import moment from "moment";

const authService = new AuthService();
const gameService = new GameService();
const chatService = new ChatService();
const imageService = new ImageService();
// window.Pusher = new Pusher('e74f15a5a517688c7598', {
//   cluster: process.env.PUSHER_CLUSTER
// });

const initialState = {
  loggedInUser: null,
};

const pusher = new Pusher("e74f15a5a517688c7598", {
  cluster: "ap2",
  auth: {
    headers: {
      Authorization: "Bearer " + authService._getToken().then((token) => token),
    },
  },
});

export default TeammateChat = (props) => {
  const [state, setState] = useState(initialState);
  const [conversation, setConversation] = useState(null);
  const [messagesArr, setMessages] = useState([]);
  const route = useRoute();
  const playerName = route?.params?.playerName || "Player";
  const toast = useToast();

  useEffect(() => {
    authService
      .getUser()
      .then((user) => setState((prev) => ({ ...prev, loggedInUser: user })));
    //   handleGetGame();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginLeft: 16, marginRight: 12 }}
          >
            <Image
              source={require("../../../assets/arrowGreen.png")}
              style={{
                // marginLeft: 6,
                transform: [{ rotate: "180deg" }],
                marginRight: 6,
              }}
            />
          </TouchableOpacity>
          <View>
            <Image
              source={require("../../../assets/image/default_avatar.jpg")}
              style={{ height: 30, width: 30, borderRadius: 15 }}
            />
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text
              style={{
                color: "#ffffff",
                lineHeight: 21,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {playerName}
            </Text>
          </View>
        </View>
      ),
    });
    console.log("C-ID", conversation?.id);
    pusher.connection.bind("state_change", (states) =>
      console.log("Connected Pusher", states)
    );
    const channel = pusher.subscribe(`conversation.${conversation?.id}`);
    channel.bind("pusher:subscription_succeeded", () =>
      console.log("Connection established to channel")
    );
    channel.bind("NewMessage", (data) => {
      console.log("PUSHER", data);
      const formatedMessage = formatNewMessage(data.message);
      const oldMessages = [...messages];
      oldMessages.unshift(formatedMessage);
      setMessages(oldMessages);
    });
    return () => {
      channel.unsubscribe();
    };
  }, [conversation]);

  // const handleGetGame = async () => {
  //   const game = await gameService.getGame(gameId);
  //   console.log(
  //     "handleGetGame function game conversation is",
  //     game.conversation.messages
  //   );
  //   try {
  //     const messages = formatDataForChat(game.conversation.messages);
  //     console.log("handleGetGame function Messages is", messages);
  //     setMessages(messages);
  //     setConversation(game.conversation);
  //   } catch (err) {
  //     console.log("handleGetGame function error is", err?.response?.data);
  //   }
  // };

  const formatNewMessage = (message) => {
    return {
      _id: message.id,
      text: message.body,
      createdAt: moment(message.created_at).toDate(),
      user: {
        _id: message.user.id,
        name: message.user.name,
        avatar: imageService.getPlayerAvatarUri(
          message.user.avatar,
          message.user.id
        ).uri,
      },
    };
  };

  const formatDataForChat = (messages) => {
    return messages.map((message) => {
      return formatNewMessage(message);
    });
  };

  const onSend = async (messages) => {
    try {
      if (conversation && conversation.id) {
        const { _id, createdAt, text, user } = messages[0];
        console.log("Send Message Response", messages);
        const response = await chatService
          .sendMessage(conversation.id, text)
          .then(() => {
            // handleGetGame()
          });
        // setMessages(...messagesArr, messages[0]);
      }
    } catch (err) {
      console.log("Send Chat Message Error: ", err);
      if (err) {
        alert("Something went wrong!");
        // toast.show("Something went wrong.", {
        //   type: "danger",
        //   placement: "top",
        // });
        return;
      }
    }
  };

  const { loggedInUser } = state;
  const showSpinner = !loggedInUser;
  if (showSpinner) {
    return <ActivityIndicator />;
  }
  const sendButtonIcon = (sendProps) => {
    if (sendProps?.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={{
            display: "flex",
            height: 40,
            width: 40,
            backgroundColor: "#4070B4",
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Image
            source={require("../../../assets/sendButton.png")}
            style={{ resizeMode: "contain", height: 20, width: 20 }}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };
  const renderComposer = () => {
    return (
      <TouchableOpacity
        style={{
          display: "flex",
          height: 40,
          width: 40,
          backgroundColor: "#4070B4",
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <Image
          source={require("../../../assets/sendButton.png")}
          style={{ resizeMode: "contain", height: 20, width: 20 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <React.Fragment>
      <StatusBar backgroundColor="#5E89E2" />
      {/* <View style={{ paddingTop: getStatusBarHeight() }} /> */}
      <View style={{ backgroundColor: "#11172D", display: "flex", flex: 1 }}>
        <GiftedChat
          messages={messagesArr}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: loggedInUser.id,
            name: loggedInUser.name,
            avatar: imageService.getPlayerAvatarUri(
              loggedInUser.images.avatar,
              loggedInUser.id
            ),
          }}
          //   minInputToolbarHeight={60}
          renderSend={sendButtonIcon}
          //   renderComposer={renderComposer}
          showUserAvatar={true}
        />
      </View>
    </React.Fragment>
  );
};
