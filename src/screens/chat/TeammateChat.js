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
  TextInput,
} from "react-native";
import GameService from "../../services/GameService";
import { Icon } from "react-native-elements";
//   import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
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
  const [messagesArr, setMessages] = useState([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: null,
      },
      image: `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80`,
    },
  ]);
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
      // setMessages(oldMessages);
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
  console.log("messages array is:#@#@#@", messagesArr);
  const onSend = async (messages) => {
    console.log("messages array inside onSend Function:#@#@#@", messages);
    try {
      if (conversation && conversation.id) {
        const { _id, createdAt, text, user } = messages[0];
        console.log("Send Message Response", messages);
        const response = await chatService
          .sendMessage(conversation.id, text)
          .then(() => {
            // handleGetGame()
          });
        setMessages([...messagesArr, messages[0]]);
      }
      setMessages([...messagesArr, messages[0]]);
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
  const sendButtonIcon = (props) => {
    // if (sendProps?.text.trim().length > 0) {
    return (
      <View
        style={{
          minHeight: 60,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Send {...props}>
          <View
            // onPress={(messages) => onSend(messages)}
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
          </View>
        </Send>
      </View>
    );
    // }
    // return null;
  };
  const renderComposer = (props) => {
    return (
      <Composer {...props}>
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
      </Composer>
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
            _id: "2",
            name: "Awais",
            avatar: null,
          }}
          // renderComposer={renderComposer}
          //   minInputToolbarHeight={60}
          renderSend={sendButtonIcon}
          renderActions={() => (
            <View
              style={{
                minHeight: 60,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",

                // backgroundColor: "#121212",
                // flexDirection: "row",
              }}
            >
              <View
                style={{
                  display: "flex",
                  height: 40,
                  width: 40,
                  borderWidth: 1,
                  borderColor: "#121212",
                  // backgroundColor: "#4070B4",
                  borderRadius: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  // marginRight: 10,
                }}
              >
                <Image
                  source={require("../../../assets/cameraIcon.png")}
                  style={{ resizeMode: "contain", height: 13, width: 15 }}
                />
              </View>
            </View>
          )}
          showUserAvatar={true}
          alwaysShowSend={true}
          scrollToBottomStyle={{
            position: "absolute",
            left: "47%",
            borderWidth: 0,
            borderColor: "#ffffff",
            shadowColor: "#0000000F",
            shadowOffset: {
              height: 3,
              width: 0,
            },
            shadowRadius: 40,
            shadowOpacity: 1,
            elevation: 1,
          }}
          minComposerHeight={40}
          minInputToolbarHeight={60}
          textInputStyle={{
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: "#dddddd",
            marginTop: 10,
            marginBottom: 10,
            paddingLeft: 10,
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 10,
            fontSize: 16,
            marginLeft: 0,
          }}
          // renderInputToolbar={(props) => (
          //   <View
          //     style={{
          //       backgroundColor: "#ffffff",
          //       height: 42,
          //       justifyContent: "center",
          //     }}
          //   >
          //     <View
          //       style={{
          //         display: "flex",
          //         paddingHorizontal: 16,
          //         height: 30,
          //         width: "90%",
          //         flexDirection: "row",
          //         alignSelf: "center",
          //         borderWidth: 1,
          //         borderColor: "#D0D3D9",
          //         alignItems: "center",
          //         // justifyContent: "center",
          //       }}
          //     >
          //       <View
          //         style={{
          //           height: 30,
          //           width: 30,
          //           // alignItems: "center",
          //           justifyContent: "center",
          //         }}
          //       >
          //         <Image
          //           source={require("../../../assets/cameraIcon.png")}
          //           style={{ width: 15, height: 13, resizeMode: "contain" }}
          //         />
          //       </View>
          //       <View
          //         style={{
          //           display: "flex",
          //           height: 30,
          //           width: "90%",
          //         }}
          //       >
          //         <TextInput
          //           multiline={true}
          //           style={{
          //             height: 30,
          //             paddingVertical: 3,
          //             width: "100%",
          //           }}
          //         />
          //       </View>
          //       <View
          //         style={{
          //           display: "flex",
          //           height: 30,
          //           width: "10%",
          //           backgroundColor: "#4070B4",
          //           borderRadius: 6,
          //           alignItems: "center",
          //           justifyContent: "center",
          //         }}
          //       >
          //         <Image
          //           source={require("../../../assets/sendButton.png")}
          //           style={{ resizeMode: "contain", height: 20, width: 20 }}
          //         />
          //       </View>
          //     </View>
          //   </View>
          // )}
          // renderInputToolbar={(props) => {
          //   return (
          //     <InputToolbar
          //       {...props}
          //       containerStyle={{
          //         marginLeft: 15,
          //         marginRight: 15,
          //         marginBottom: 10,
          //         borderWidth: 0.5,
          //         borderColor: "grey",
          //         borderRadius: 25,
          //       }}
          //     />
          //   );
          // }}
        />
      </View>
    </React.Fragment>
  );
};
