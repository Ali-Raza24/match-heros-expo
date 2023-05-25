import { GAME_SEARCH_AVG_GAME_PLAYERS, GAME_SEARCH_CLEAR_FIELDS, GAME_SEARCH_COUNTY_ID, GAME_SEARCH_ENDS_AT, GAME_SEARCH_GAME_SPEED, GAME_SEARCH_GAME_TYPE, GAME_SEARCH_STARTS_AT, GAME_SEARCH_TIME_FROM, GAME_SEARCH_TIME_TO } from "../actions/gameSearch.action";

const INITIAL_STATE = {
    starts_at: null,
    ends_at: null,
    time_from: null,
    time_to: null,
    county_id: null,
    game_type: null,
    game_speed: null,
    avg_game_players: null,
}
export const gameSearchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GAME_SEARCH_STARTS_AT:
            return { ...state, starts_at: action.payload };

        case GAME_SEARCH_ENDS_AT:
            return { ...state, ends_at: action.payload };

        case GAME_SEARCH_TIME_FROM:
            return { ...state, time_from: action.payload };

        case GAME_SEARCH_TIME_TO:
            return { ...state, time_to: action.payload };

        case GAME_SEARCH_COUNTY_ID:
            return { ...state, county_id: action.payload };

        case GAME_SEARCH_GAME_TYPE:
            return { ...state, game_type: action.payload };

        case GAME_SEARCH_GAME_SPEED:
            return { ...state, game_speed: action.payload };

        case GAME_SEARCH_AVG_GAME_PLAYERS:
            return { ...state, avg_game_players: action.payload };
        case GAME_SEARCH_CLEAR_FIELDS:
            return INITIAL_STATE;
        default:
            return state;
    }
}