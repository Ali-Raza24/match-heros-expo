import "react-native-gesture-handler";
import {
  ActivityIndicator,
  LogBox,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/reducers/rootReducer";
import ReduxThunk from "redux-thunk";
import { Provider, useSelector } from "react-redux";
import MyStack from "./src/navigation/StackNavigation";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
  "Modal with 'fullScreen' presentation style and 'transparent' value is not supported.",
]);

export default function App() {
  return (
    <>
      <Provider store={store}>
        <MyStack />
      </Provider>
    </>
  );
}
