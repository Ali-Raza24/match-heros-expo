export const CREATOR_REMOVE_PLAYER_FROM_GAME_LOBBY = "CREATE_REMOVE_PLAYER_FROM_GAME_LOBBY";
export const CANCEL_REMOVE_PLAYER_FROM_GAME_LOBBY = "CANCEL_REMOVE_PLAYER_FROM_GAME_LOBBY";
export const ALL_GAME_LOBBY_CONFIRMED_PLAYERS = "ALL_GAME_LOBBY_CONFIRMED_PLAYERS";
export const ALL_INVITED_PLAYERS = "ALL_INVITED_PLAYERS";

export const removePlayerFromGameLobby = () => {
    return {
        type: CREATOR_REMOVE_PLAYER_FROM_GAME_LOBBY,
        payload: true
    }
}

export const cancelRemovePlayerFromGameLobby = () => {
    return {
        type: CANCEL_REMOVE_PLAYER_FROM_GAME_LOBBY,
        payload: false
    }
}


export const allConfirmedPlayers = (confirmedPlayers) => {
    return {
        type: ALL_GAME_LOBBY_CONFIRMED_PLAYERS,
        payload: confirmedPlayers
    };
};

export const allInvitedPlayersAction = (allInvitedPlayersList) => {
    return {
        type: ALL_INVITED_PLAYERS,
        payload: allInvitedPlayersList
    }
}