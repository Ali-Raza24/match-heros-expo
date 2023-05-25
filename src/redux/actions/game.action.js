export const SET_DELETED_GAME_ID = "SET_DELETED_GAME_ID";

export const setDeletedGameIdAction = (gameId) => {
    return {
        type: SET_DELETED_GAME_ID,
        payload: gameId
    }
}
