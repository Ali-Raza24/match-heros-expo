import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
  /* YOUR FIREBASE CONFIG OBJECT PROPERTIES HERE */
  apiKey: "AIzaSyA55S4wrcWXDabsxFA0DUMo8-jgTCR2OGQ",
  authDomain: "matchherochat.firebaseapp.com",
  projectId: "matchherochat",
  storageBucket: "matchherochat.appspot.com",
  messagingSenderId: "463609261729",
  appId: "1:463609261729:web:2f0b4987969b6fe3548ae0",
  measurementId: "G-003THT7C02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
