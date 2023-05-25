export const getHomeAndAwayTeam = (gameSize, players, callback) => {
  if (!gameSize) {
    validatePlayers(callback, players.length, 10);
    return false;
  }
  if (gameSize == "5-v-5") {
    validatePlayers(callback, players.length, 10);
    return homeAndAway(players, 5);
  }
  if (gameSize == "6-v-6") {
    validatePlayers(callback, players.length, 12);
    return homeAndAway(players, 6);
  }
  if (gameSize == "7-v-7") {
    validatePlayers(callback, players.length, 14);
    return homeAndAway(players, 7);
  }

  if (gameSize == "9-v-9") {
    validatePlayers(callback, players.length, 18);
    return homeAndAway(players, 9);
  }

  if (gameSize == "11-v-11") {
    validatePlayers(callback, players.length, 22);
    return homeAndAway(players, 11);
  }

  return players;
};

const homeAndAway = (players, homeEndIndex) => {
  const home = homeTeam(players, homeEndIndex);
  const away = awayTeam(players, home);
  return {
    home,
    away,
  };
};

const homeTeam = (players, endIndex) => {
  const team = [...players].slice(0, endIndex);
  return team;
};

const awayTeam = (players, homeTeam) => {
  return [...players].slice(homeTeam.length, players.length);
};

const validatePlayers = (callback, playersLength, valueToValidateWith) => {
  if (
    playersLength > valueToValidateWith ||
    playersLength.length < valueToValidateWith ||
    playersLength === 0
  ) {
    callback("The Players should be equal to Game Size.");
    return false;
  }
};
