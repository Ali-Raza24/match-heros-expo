export const PLAYER_SEARCH_SET_USERNAME = "PLAYER_SEARCH_SET_USERNAME";
export const PLAYER_SEARCH_SET_COUNTY_ID = "PLAYER_SEARCH_SET_COUNTY_ID";
export const PLAYER_SEARCH_SET_AGE_BRACKET = "PLAYER_SEARCH_SET_AGE_BRACKET";
export const PLAYER_SEARCH_SET_DAY_OF_GAME = "PLAYER_SEARCH_SET_DAY_OF_GAME";
export const PLAYER_SEARCH_SET_TIME_OF_GAME = "PLAYER_SEARCH_SET_TIME_OF_GAME";
export const PLAYER_SEARCH_CLEAR = "PLAYER_SEARCH_CLEAR";


export const playerSearchSetUsernameAction = (value) => {
    return {
        type: PLAYER_SEARCH_SET_USERNAME,
        payload: value
    }
}

export const playerSearchSetCountyIdAction = (value) => {
    return {
        type: PLAYER_SEARCH_SET_COUNTY_ID,
        payload: value
    }
}
export const playerSearchSetAgeBracketAction = (value) => {
    return {
        type: PLAYER_SEARCH_SET_AGE_BRACKET,
        payload: value
    }
}

export const playerSearchSetDayOfGameAction = (value) => {
    return {
        type: PLAYER_SEARCH_SET_DAY_OF_GAME,
        payload: value
    }
}

export const playerSearchSetTimeOfGameAction = (value) => {
    return {
        type: PLAYER_SEARCH_SET_TIME_OF_GAME,
        payload: value
    }
}

export const playerSearchClearAction = () => {
    return {
        type: PLAYER_SEARCH_CLEAR
    }
}

