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
} from "react-native";
import GameService from "../../services/GameService";
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

export default Chat = () => {
  const [state, setState] = useState(initialState);
  const [conversation, setConversation] = useState(null);
  const [messagesArr, setMessages] = useState([]);
  const route = useRoute();
  const gameId = route?.params?.gameId || 1;
  const toast = useToast();

  useEffect(() => {
    authService
      .getUser()
      .then((user) => setState((prev) => ({ ...prev, loggedInUser: user })));
    handleGetGame();
  }, []);

  useLayoutEffect(() => {
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

  const handleGetGame = async () => {
    const game = await gameService.getGame(gameId);
    console.log(
      "handleGetGame function game conversation is",
      game.conversation.messages
    );
    try {
      const messages = formatDataForChat(game.conversation.messages);
      console.log("handleGetGame function Messages is", messages);
      setMessages(messages);
      setConversation(game.conversation);
    } catch (err) {
      console.log("handleGetGame function error is", err?.response?.data);
    }
  };

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
          .then(() => handleGetGame());
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
  return (
    <React.Fragment>
      <StatusBar backgroundColor="#5E89E2" />
      <View style={{ paddingTop: getStatusBarHeight() }} />
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
        showUserAvatar={true}
      />
    </React.Fragment>
  );
};
