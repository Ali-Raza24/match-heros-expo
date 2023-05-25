import {LOGIN_FAIL} from '../actions';

export default function (state = false, action) {
  switch (action.type) {
    case LOGIN_FAIL:
      return action.payload;
    default:
      return state;
  }
}