import {READ_NOTIFICATION, SET_NOTIFICATIONS} from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.payload;
    default:
      return state;
  }
}
