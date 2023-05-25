import {UPDATE_USER_TOKENS} from '../actions';

export default function (state = 0, action) {
  switch (action.type) {
    case UPDATE_USER_TOKENS:
      return action.payload;
    default:
      return state;
  }
}