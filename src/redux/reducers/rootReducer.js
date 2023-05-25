import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import notificationsReducer from "./notificationsReducer";
import loginFailReducer from "./loginFailReducer";
import loginRequestReducer from "./loginRequestReducer";
import userTokensReducer from "./userTokensReducer";
import updateRequestReducer from "./updateRequestReducer";
import updateFailReducer from "./updateFailReducer";
import { gameLobbyReducer } from "./gameLobbyReducer";
import { gameReducer } from "./gameReducer";
import { gameSearchReducer } from "./gameSearchReducer";
import { playerSearchReducer } from "./playerSearchReducer";

export default combineReducers({
  user: authUserReducer,
  notifications: notificationsReducer,
  loginFail: loginFailReducer,
  loginRequest: loginRequestReducer,
  userTokens: userTokensReducer,
  updateRequest: updateRequestReducer,
  updateFail: updateFailReducer,
  gameLobby: gameLobbyReducer,
  game: gameReducer,
  gameSearch: gameSearchReducer,
  playerSearch: playerSearchReducer
})
