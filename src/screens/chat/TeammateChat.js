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
  Alert,
} from "react-native";
import GameService from "../../services/GameService";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
//   import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import io from "socket.io-client";
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
  Actions,
  Bubble,
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
import { useSelector } from "react-redux";
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
const SOCKET_URL = "https://unpand.dmteknologi.com/api/messages.php";
// const pusher = new Pusher("054ed4ae6f8bf42469eb", {
//   cluster: "mt1",
//   auth: {
//     headers: {
//       Authorization: "Bearer " + authService._getToken().then((token) => token),
//     },
//   },
// });
const pusher = new Pusher("054ed4ae6f8bf42469eb", {
  cluster: "mt1",
  encrypted: true,
});

export default TeammateChat = (props) => {
  const user = useSelector((state) => state.user);
  // const authServces = new AuthService();
  console.log("user data is in menue:#@#@#@", user?.id);
  const [state, setState] = useState(initialState);
  const [conversation, setConversation] = useState(null);
  const [startCamera, setStartCamera] = useState(false);
  const [imagePath, setPickedImagePath] = useState("");
  const [pusherChannel, setPusherChannel] = useState(null);
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
  const playerId = route?.params?.playerId || "1";
  const toast = useToast();

  useEffect(() => {
    authService
      .getUser()
      .then((user) => setState((prev) => ({ ...prev, loggedInUser: user })));
    //   handleGetGame();
    getChatMessages();
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
    // console.log("C-ID", conversation?.id);
    // pusher.connection.bind("state_change", (states) =>
    //   console.log("Connected Pusher", states)
    // );
    // const channel = pusher.subscribe(`chat`);
    // channel.bind("pusher:subscription_succeeded", () =>
    //   console.log("Connection established to channel")
    // );
    // const channel = pusher.subscribe("chat");
    // channel.bind("message-sent", (data) => {
    //   console.log("messages list inside pusher is:#@#@#@#@", data?.message);
    // });
    // console.log("channel messages is:#@#@#@$#$@", channel);
    // channel.handleEvent((event) => console.log(`Event received: ${event}`));
    // console.log(
    //   "channel event is:#@#@#2",
    //   channel.handleEvent(({ data }) => console.log("first", data))
    // );
    // channel.bind("message-sent", (data) => {
    //   console.log("PUSHER", data);
    //   const formatedMessage = formatNewMessage(data.message);
    //   const oldMessages = [...messages];
    //   oldMessages.unshift(formatedMessage);
    //   // setMessages(oldMessages);
    // });
    // return () => {
    //   channel.unsubscribe();
    // };
  }, []);
  useEffect(() => {
    const channel = pusher.subscribe("chat");
    setPusherChannel(channel);
    // PREVIOUSLY
    // channel.bind(EVENT_NAME, (pusherData) => {
    //   ...
    //   Accessing "data" here would give the state used
    //   during binding the event
    //});
  }, []);
  useEffect(() => {
    console.log("Updated data : ");
    if (pusherChannel && pusherChannel.bind) {
      console.log("Unbinding Event");
      pusherChannel.unbind("message-sent");
      console.log("Rebinding Event");
      pusherChannel.bind("message-sent", (pusherData) => {
        // USE UPDATED "data" here
        console.log("updated pusher data is:#@#@#@$$@", pusherData);
      });
    }
  }, [pusherChannel]);
  const getChatMessages = async () => {
    try {
      // const receiver_id = 1;
      const response = await chatService.getMessage(playerId).then((res) => {
        // handleGetGame()
        // console.log("response.data messages list is", res?.data?.data);
        return res?.data?.data;
      });
      console.log("messages list is:#@#@#@", response);
      const formatMessages = formatDataForChat(response);
      console.log("format messages is :3@#@#@", formatMessages);
      setMessages([...formatMessages]);
      // setMessages([...messagesArr, messages[0]]);
    } catch (err) {
      console.log("Send Chat Message Error: ", err?.response);
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
  // const __startCamera = async () => {
  //   const {status} = await Camera.requestPermissionsAsync()
  //   if (status === 'granted') {
  //     // start the camera
  //     setStartCamera(true)
  //   } else {
  //     Alert.alert('Access denied')
  //   }
  // }
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log("image object is:#@#@", result);

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      console.log("image path is:#@#@#@", result.assets[0].uri);
      return result.assets[0].uri;
    }
  };
  const formatNewMessage = (message) => {
    return {
      _id: message?.id,
      text: message?.message,
      createdAt: moment(message.created_at).toDate(),
      user: {
        _id: message.receiver_id,
        name: null,
        avatar: null,
      },
    };
  };

  const formatDataForChat = (messages) => {
    return messages.map((message) => {
      return formatNewMessage(message);
    });
  };
  // console.log("messages array is:#@#@#@", messagesArr);
  const onSend = async (messages) => {
    console.log(
      "messages array inside onSend Function:#@#@#@",
      messages,
      playerId
    );
    try {
      if (true) {
        const { _id, createdAt, text, user } = messages[0];
        console.log("Send Message Response", messages);
        const data = {
          receiver_id: playerId,
          message: text,
        };
        const response = await chatService.sendMessage(data).then(() => {
          // handleGetGame()
        });
        setMessages([messages[0], ...messagesArr]);
      }
      // setMessages([...messagesArr, messages[0]]);
    } catch (err) {
      console.log("Send Chat Message Error: ", err?.response);
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

  const renderBubble = (props) => {
    const message_sender_id = props.currentMessage.user._id;
    console.log(
      "sender id in bubble chat#@#@",
      message_sender_id,
      user.id,
      props.currentMessage
    );
    return (
      <Bubble
        {...props}
        position={message_sender_id == user.id ? "right" : "left"}
        textStyle={{
          right: {
            color: "#ffffff",
            fontSize: 12,
          },
          left: {
            // color: "#ffffff",
            fontSize: 12,
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: "#4A74EA",
            marginRight: 5,
            marginVertical: 5,
          },
          left: {
            marginLeft: 12,
            backgroundColor: "#FFFFFF",
            marginVertical: 5,
          },
        }}
      />
    );
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
  // const renderComposer = (props) => {
  //   return (
  //     <Composer {...props}>
  //       <TouchableOpacity
  //         style={{
  //           display: "flex",
  //           height: 40,
  //           width: 40,
  //           backgroundColor: "#4070B4",
  //           borderRadius: 6,
  //           justifyContent: "center",
  //           alignItems: "center",
  //           marginRight: 10,
  //         }}
  //       >
  //         <Image
  //           source={require("../../../assets/sendButton.png")}
  //           style={{ resizeMode: "contain", height: 20, width: 20 }}
  //         />
  //       </TouchableOpacity>
  //     </Composer>
  //   );
  // };
  return (
    <React.Fragment>
      <StatusBar backgroundColor="#5E89E2" />
      {/* <View style={{ paddingTop: getStatusBarHeight() }} /> */}
      <View style={{ backgroundColor: "#11172D", display: "flex", flex: 1 }}>
        <GiftedChat
          messages={messagesArr}
          onSend={(messages) => onSend(messages)}
          // user={{
          //   _id: "4",
          //   name: "Awais",
          //   avatar: null,
          // }}
          renderBubble={renderBubble}
          // renderComposer={renderComposer}
          //   minInputToolbarHeight={60}
          renderSend={sendButtonIcon}
          renderActions={(props) => (
            <Actions
              {...props}
              containerStyle={{
                minHeight: 50,
                width: 40,
                // backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
              options={{
                "Take a Photo": openCamera,
              }}
              // onSend = ({ image: "https://picsum.photos/id/237/200/300" });
              // onSend={(args) => console.log("send args from action", args)}
              icon={() => (
                <View
                  style={{
                    minHeight: 50,
                    // alignItems: "flex-end",
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",
                    display: "flex",
                    // flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      height: 40,
                      width: 40,
                      borderWidth: 1,
                      borderColor: "#dddddd",
                      // backgroundColor: "#4070B4",
                      borderRadius: 6,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
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
            />
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
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
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

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   TextInput,
//   Platform,
// } from "react-native";
// import {
//   Bubble,
//   Composer,
//   GiftedChat,
//   InputToolbar,
//   Message,
//   Send,
//   TouchableOpacity,
// } from "react-native-gifted-chat";
// import { useChatState } from "./vincereChatProvider";
// import Header from "../atom/ChatHeader";

// const Chat = ({ navigation }) => {
//   const [messageList, setMsgList] = useState([]);
//   const {
//     messages,
//     loadMoreMessages,
//     loadingChatMessages,
//     sendMessage,
//     chatIsConnected,
//     renderMessageImage,
//     profile,
//   } = useChatState();

//   useEffect(() => {
//     if (messages && messages.length > 0) {
//       let giftedChatMessages = messages.map((chatMessage) => {
//         let gcm = {
//           _id: chatMessage.id,
//           text: chatMessage.message,
//           // createdAt: chatMessage.createdAt,
//           sentFromParticipant: chatMessage.sentFromParticipant,
//           user: {
//             _id: chatMessage.id,
//             name: chatMessage.firstName + " " + chatMessage.lastName,
//             avatar:
//               chatMessage.fileURLs && chatMessage.fileURLs.length > 0
//                 ? chatMessage.fileURLs[0]
//                 : "",
//           },
//         };
//         return gcm;
//       });
//       if (messageList.length > 0) {
//         GiftedChat.append(
//           giftedChatMessages.slice(Math.max(giftedChatMessages.length - 20, 1))
//         );
//       }
//       setMsgList(giftedChatMessages);
//     }
//   }, [messages]);

//   const ifCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
//     return contentOffset.y === 0;
//   };

//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={styles.container}>
//         <Header
//           navigation={navigation}
//           headerTitle={"Coach"}
//           headerChat={"online"}
//         />
//         <View style={{ ...styles.chatContainer }}>
//           <GiftedChat
//             messages={messageList}
//             onSend={(messages) => {
//               sendMessage(messages[0].text);
//             }}
//             user={{
//               _id: profile.uid,
//               name: profile.firstName + " " + profile.lastName,
//             }}
//             renderUsernameOnMessage={false}
//             inverted={false}
//             listViewProps={{
//               scrollEventThrottle: 400,
//               onScroll: async ({ nativeEvent }) => {
//                 if (ifCloseToTop(nativeEvent)) {
//                   loadMoreMessages();
//                 }
//               },
//               showsVerticalScrollIndicator: false,
//             }}
//             renderAvatar={null}
//             renderComposer={(props) => {
//               return (
//                 <Composer {...props} textInputStyle={styles.textInputStyle} />
//               );
//             }}
//             minComposerHeight={44}
//             renderBubble={(props) => {
//               return (
//                 <Bubble
//                   {...props}
//                   textStyle={{
//                     right: {
//                       color: "#F7E5E5",
//                     },
//                     left: {
//                       color: "#F7E5E5",
//                     },
//                   }}
//                   wrapperStyle={{
//                     left: styles.wrapperLeftStyle,
//                     right: styles.wrapperRightStyle,
//                   }}
//                 />
//               );
//             }}
//             renderMessage={(props) => {
//               const renderMsg = messageList.filter(
//                 (item) =>
//                   item._id &&
//                   item.text === props.currentMessage.text &&
//                   props.currentMessage._id
//               );
//               return (
//                 <Message
//                   {...props}
//                   // renderDay={() => <Text>Date</Text>}
//                   position={renderMsg[0].sentFromParticipant ? "left" : "right"}
//                 />
//               );
//             }}
//             renderSend={(props) => {
//               return (
//                 <Send
//                   {...props}
//                   textStyle={styles.sendColor}
//                   containerStyle={{ marginBottom: 5 }}
//                   alwaysShowSend={true}
//                 >
//                   <Image
//                     style={{ height: 44 }}
//                     source={
//                       props.text
//                         ? require("../../assets/images/send.png")
//                         : require("../../assets/images/mic.png")
//                     }
//                   />
//                 </Send>
//               );
//             }}
//             keyboardShouldPersistTaps={"never"}
//           />
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapperLeftStyle: {
//     backgroundColor: "#2F65A7",
//     borderTopEndRadius: 20,
//     borderBottomEndRadius: 20,
//     borderBottomStartRadius: 20,
//     borderTopStartRadius: 0,
//     padding: 5,
//   },
//   wrapperRightStyle: {
//     backgroundColor: "#00274C",
//     borderTopEndRadius: 0,
//     borderBottomEndRadius: 20,
//     borderBottomStartRadius: 20,
//     borderTopStartRadius: 20,
//     padding: 5,
//   },
//   textInputStyle: {
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 10,
//     paddingTop: Platform.OS === "ios" ? 13 : 3,
//     marginEnd: 5,
//     paddingHorizontal: 10,
//     backgroundColor: "#FFFFFF",
//   },
//   container: {
//     flex: 1,
//   },
//   chatContainer: {
//     flex: 1,
//     marginHorizontal: 25,
//   },
// });

// export default Chat;
