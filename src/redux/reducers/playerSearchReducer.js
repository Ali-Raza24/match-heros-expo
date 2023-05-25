import { PLAYER_SEARCH_CLEAR, PLAYER_SEARCH_SET_AGE_BRACKET, PLAYER_SEARCH_SET_COUNTY_ID, PLAYER_SEARCH_SET_DAY_OF_GAME, PLAYER_SEARCH_SET_TIME_OF_GAME, PLAYER_SEARCH_SET_USERNAME } from "../actions/playerSearch.action";

const initialState = {
    player: '',
    county_id: '',
    avg_game_players: '',
    day_of_game: '',
    end_game: '',

}

export const playerSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYER_SEARCH_SET_USERNAME:
            return { ...state, player: action.payload };
        case PLAYER_SEARCH_SET_COUNTY_ID:
            return { ...state, county_id: action.payload };
        case PLAYER_SEARCH_SET_AGE_BRACKET:
            return { ...state, avg_game_players: action.payload };
        case PLAYER_SEARCH_SET_DAY_OF_GAME:
            return { ...state, day_of_game: action.payload };
        case PLAYER_SEARCH_SET_TIME_OF_GAME:
            return { ...state, end_game: action.payload };
        case PLAYER_SEARCH_CLEAR:
            return initialState;
        default:
            return state;
    }
}