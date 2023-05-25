import { ALL_GAME_LOBBY_CONFIRMED_PLAYERS, ALL_INVITED_PLAYERS, CANCEL_REMOVE_PLAYER_FROM_GAME_LOBBY, CREATOR_REMOVE_PLAYER_FROM_GAME_LOBBY } from "../actions/gamelobby.action";

const initialState = {
    creatorRemovePlayer: false,
    confirmedPlayers: [],
    allInvitedPlayers: []
};

export const gameLobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CANCEL_REMOVE_PLAYER_FROM_GAME_LOBBY: {
            return { ...state, creatorRemovePlayer: action.payload }
        }
        case CREATOR_REMOVE_PLAYER_FROM_GAME_LOBBY: {
            return { ...state, creatorRemovePlayer: action.payload }
        }
        case ALL_GAME_LOBBY_CONFIRMED_PLAYERS:
            return { ...state, confirmedPlayers: action.payload };
        case ALL_INVITED_PLAYERS:
            return { ...state, allInvitedPlayers: action.payload };
        default:
            return state;
    }
}