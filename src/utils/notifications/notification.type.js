export const NOTIFICATION_TITLE = {
    GameInvitation: 'Game Invite',
    SquadInvite: 'Squad Invite',
    TeamInvite: 'Team Invite'
}

export const gameInvitationMessage = (invitorName) => {
    return `${invitorName} has invited you to play in a game.`
}