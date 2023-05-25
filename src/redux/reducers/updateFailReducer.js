import {RESET_UPDATE_ERRORS, UPDATE_FAIL} from '../actions';

export default function (state = false, action) {
  switch (action.type) {
    case UPDATE_FAIL:
      return action.payload;
    case RESET_UPDATE_ERRORS:
      return false;
    default:
      return state;
  }
}