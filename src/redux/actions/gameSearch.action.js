export const GAME_SEARCH_STARTS_AT = "GAME_SEARCH_STARTS_AT";
export const GAME_SEARCH_ENDS_AT = "GAME_SEARCH_ENDS_AT";
export const GAME_SEARCH_TIME_FROM = "GAME_SEARCH_TIME_FROM";
export const GAME_SEARCH_TIME_TO = "GAME_SEARCH_TIME_TO";
export const GAME_SEARCH_COUNTY_ID = "GAME_SEARCH_COUNTY_ID";
export const GAME_SEARCH_GAME_TYPE = "GAME_SEARCH_GAME_TYPE";
export const GAME_SEARCH_GAME_SPEED = "GAME_SEARCH_GAME_SPEED";
export const GAME_SEARCH_AVG_GAME_PLAYERS = "GAME_SEARCH_AVG_GAME_PLAYERS";
export const GAME_SEARCH_CLEAR_FIELDS = "GAME_SEARCH_CLEAR_FIELDS";

export const gameSearchStartsAtAction = (value) => {
    return {
        type: GAME_SEARCH_STARTS_AT,
        payload: value
    }
}

export const gameSearchEndsAtAction = (value) => {
    return {
        type: GAME_SEARCH_ENDS_AT,
        payload: value
    }
}

export const gameSearchTimeFromAction = (value) => {
    return {
        type: GAME_SEARCH_TIME_FROM,
        payload: value
    }
}

export const gameSearchTimeToAction = (value) => {
    return {
        type: GAME_SEARCH_TIME_TO,
        payload: value
    }
}

export const gameSearchCountyIdAction = (value) => {
    return {
        type: GAME_SEARCH_COUNTY_ID,
        payload: value
    }
}

export const gameSearchGameTypeAction = (value) => {
    return {
        type: GAME_SEARCH_GAME_TYPE,
        payload: value
    }
}
export const gameSearchGameSpeedAction = (value) => {
    return {
        type: GAME_SEARCH_GAME_SPEED,
        payload: value
    }
}
export const gameSearchAverageGamePlayersAction = (value) => {
    return {
        type: GAME_SEARCH_AVG_GAME_PLAYERS,
        payload: value
    }
}

export const gameSearchClearFieldsAction = () => {
    return {
        type: GAME_SEARCH_CLEAR_FIELDS
    }
}