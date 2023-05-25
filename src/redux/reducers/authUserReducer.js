import {AUTH_USER} from '../actions';

export default function (state = false, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    default:
      return state;
  }
}
