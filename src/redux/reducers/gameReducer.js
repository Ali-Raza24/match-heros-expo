import { SET_DELETED_GAME_ID } from "../actions/game.action";

const initialState = {
    deletedGameId: null
}

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DELETED_GAME_ID:
            return { ...state, deletedGameId: action.payload };
        default:
            return state;
    }
}