import {LOGIN_REQUEST} from '../actions';

export default function (state = false, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return action.payload;
    default:
      return state;
  }
}