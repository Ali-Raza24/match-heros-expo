import {UPDATE_REQUEST} from '../actions';

export default function (state = true, action) {
  switch (action.type) {
    case UPDATE_REQUEST:
      return action.payload;
    default:
      return state;
  }
}