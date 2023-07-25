// import React from "react";
// import {ImageBackground, View, StyleSheet} from "react-native";

// const Cover = (props) => {
//   const {cover} = props;
//   return (
//     <View style={styles.coverContainer}>
//       <ImageBackground
//         source={cover}
//         style={styles.backgroundContainer}>
//       </ImageBackground>
//     </View>
//   );
// };

// export default Cover;

// const styles = StyleSheet.create({
//   coverContainer: {
//     height: 200,
//     position: "relative"
//   },
//   backgroundContainer: {
//     height: "100%",
//     width: "100%",
//     justifyContent: "flex-end",
//     alignItems: "center"
//   }
// });

import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import get from "lodash/get";
import { uniqBy } from "lodash";
import AsyncStorageService from "../../services/storage-service";

const eventTypes = {
  CONNECT: "connection",
  RECONNECT: "reconnect",
  DISCONNECT: "disconnect",
  SHARED_CONVERSATION_SEND_MESSAGE: "sharedConversationMessage",
  NEW_SHARED_CONVERSATION_MESSAGE: "newSharedConversationMessage",
  SUBSCRIBE_TO_PARTICIPANT_SHARED_CONVERSATION:
    "subscribeToParticipantSharedConversation",
};

Object.freeze(eventTypes);

const ONE_MINUTE_IN_MS = 1000 * 10;

const useSocketTimeout = (authenticateCallback) => {
  const timeoutInterval = useRef(null);
  useEffect(() => {
    timeoutInterval.current = setInterval(
      authenticateCallback,
      ONE_MINUTE_IN_MS
    );
    return () => {
      clearInterval(timeoutInterval.current);
    };
  }, [authenticateCallback]);
};

const ChatStateContext = React.createContext(null);
let socketInstance = null;

export function useChatState() {
  const state = useContext(ChatStateContext);
  if (!state) {
    throw new Error("useChatState must be used within ChatStateContext");
  }
  return state;
}

const chatControls = {
  currentPage: 1,
  totalMessagePage: 1,
  loadingChat: false,
};

// this chatSocket will be used at every instance
export function ChatStateProvider({
  children,
  ROOT_ENDPOINT = "https://apidev.vincerehealth.org",
  getJWTToken = () => "",
}) {
  const userType = "participant";
  const [profile, setProfile] = useState({});
  const [chatIsConnected, setChatIsConnected] = useState(false);
  const [loadingChatMessages, setLoadingChatMessages] = useState(false);
  const [messages, setCurrentMessages] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = await getJWTToken();
    const m2mToken = await AsyncStorageService.getString(
      "@vincereHealth_Token"
    );
    console.log("m2mToken in vincereChatProvider component####", m2mToken);
    const userProfile = await axios({
      method: "get",
      url: "https://partnerapidev.vincerehealth.org/v2/participant/account/email/ranaawais3553+45@gmail.com",
      headers: {
        Authorization: `Bearer ${m2mToken}`,
      },
    });
    setProfile(userProfile.data.data);
    setFirstName(userProfile.data.data.firstName);
    setLastName(userProfile.data.data.lastName);
  };

  const getCustomSocket = () => {
    if (getCustomSocket.socket) {
      return getCustomSocket.socket;
    }
    getCustomSocket.socket = io(ROOT_ENDPOINT, {
      path: "/api/chat/socket",
      secure: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      transports: ["websocket"],
    });
    getCustomSocket.socket.customOn = (event, callback) => {
      getCustomSocket.socket.off(event); // clear all existing listeners
      getCustomSocket.socket.on(event, callback);
    };
    return getCustomSocket.socket;
  };

  const getSharedConversationMessages = async (page = 1, limit = 30) => {
    const token = await getJWTToken();
    return axios({
      method: "get",
      url: `${ROOT_ENDPOINT}/api/chat/v2/sharedConversation/participant/messages?page=${page}&limit=${limit}`,
      headers: {
        Authorization: `${token}`,
      },
    });
  };

  if (!socketInstance) {
    socketInstance = io(ROOT_ENDPOINT, {
      path: "/api/chat/socket",
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      debug: true,
      forceNew: true,
      reconnectionAttempts: Infinity,
    });
  }

  const socketProxy = socketInstance; // TODO: potentially do more stuff with tihs
  socketProxy.customOn = (event, callback) => {
    socketProxy.off(event); // clear all existing listeners
    socketProxy.on(event, callback);
  };

  const authenticateUser = async () => {
    const jwtToken = await getJWTToken();
    console.log(
      "jwt token in authenticateUser function ###",
      jwtToken,
      userType,
      firstName,
      lastName
    );
    socketProxy.emit("authenticate", {
      jwtToken,
      userType,
      firstName,
      lastName,
    });
  };

  const listenForConnect = (callback) => {
    socketProxy.customOn(eventTypes.CONNECT, callback);
    socketProxy.customOn(eventTypes.RECONNECT, callback);
  };

  const listenForDisconnect = (callback) => {
    socketProxy.customOn(eventTypes.DISCONNECT, callback);
  };

  const sendSharedConversationMessage = (
    participantUUID,
    ackId,
    channel,
    body,
    fileURLs = []
  ) => {
    socketProxy.emit(eventTypes.SHARED_CONVERSATION_SEND_MESSAGE, {
      participantUUID: "",
      body,
      ackId,
      fileURLs,
      channel,
    });
  };

  const listenForNewSharedMessages = (callback) => {
    socketProxy.customOn(eventTypes.NEW_SHARED_CONVERSATION_MESSAGE, callback);
  };

  const closeSocket = () => {
    socketProxy.close();
    getCustomSocket.socket = null;
  };

  const loadMoreMessages = (first = false) => {
    if (
      !chatControls.loadingChat &&
      chatControls.currentPage <= chatControls.totalMessagePage
    ) {
      // setCurrentMessagePage((prev) => prev + 1)
      if (!first) {
        chatControls.currentPage += 1;
      }
      getConversationMessages();
    }
  };

  useEffect(() => {
    setCurrentMessages([]);

    authenticateUser();
    listenForConnect(() => {
      console.log("listenForConnect");
      authenticateUser();
      setChatIsConnected(true);
    });

    listenForDisconnect(() => {
      console.log("listenForDisconnect");
      setChatIsConnected(false);
    });

    listenForNewSharedMessages((message) => {
      console.log(message, "listenForNewSharedMessages");
      setCurrentMessages((previousMessages) => [...previousMessages, message]);
    });

    loadMoreMessages(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    authenticateUser();
    setChatIsConnected(socketProxy.connected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketProxy.connected]);

  useSocketTimeout(authenticateUser);

  const getConversationMessages = async () => {
    if (chatControls.currentPage <= chatControls.totalMessagePage) {
      setLoadingChatMessages(true);
      try {
        chatControls.loadingChat = true;
        const result = await getSharedConversationMessages(
          chatControls.currentPage
        );
        chatControls.loadingChat = false;
        const data = get(result, "data.data", {});
        chatControls.totalMessagePage = data.pages;
        setCurrentMessages((previous) => {
          const newMessages = data.messages.slice().reverse();
          const allMessages = [...newMessages, ...previous];
          return uniqBy(allMessages, "uuid");
        });
        setLoadingChatMessages(false);
      } catch (e) {
        console.log("Error while fetching messages ", e);
      }
    }
  };

  const sendMessage = (body, imageUrl = null) => {
    const ackId = Date.now();
    imageUrl
      ? sendSharedConversationMessage("", ackId, "app", body, [imageUrl])
      : sendSharedConversationMessage("", ackId, "app", body);
    setCurrentMessages((previousMessages) => [
      ...previousMessages,
      {
        body: body,
        message: body,
        contentType: "text",
        createdAt: new Date().toString(),
        senderName: `${firstName} ${lastName}`,
        senderType: "user",
        senderInitials: `${get(firstName, "0")}${get(lastName, "0")}`,
        firstName: firstName,
        lastName: lastName,
        id: ackId,
        messageId: ackId,
        sentFromParticipant: true,
        status: "pending",
        imageUrl: null,
        channel: "app",
        newlySent: true,
      },
    ]);
  };

  const providerValue = {
    loadingChatMessages,
    sendMessage,
    chatIsConnected,
    loadMoreMessages,
    messages,
    closeSocket,
    profile,
  };

  return (
    <ChatStateContext.Provider value={providerValue}>
      {children}
    </ChatStateContext.Provider>
  );
}
