export class Statistic {

  constructor(games) {
    this.games = games || [];
  }

  getGameResults(id) {
    let victory = 0;
    let defeat = 0;
    let equally = 0;
    const stats = this.getTeamStats(id);
    stats.map(stat => {
      switch (stat.winner) {
        case -1:
          equally++;
          break;
        case 0:
          defeat++;
          break;
        case 1:
          victory++;
          break;
        default:
          break;
      }
    });
    return {
      victory: victory,
      defeat: defeat,
      equally: equally
    }
  }

  getGameCount() {
    return this.games.length;
  }

  getTeamGoals(id) {
    let given = 0;
    const stats = this.getTeamStats(id);
    stats.map(stat => {
      given = given + stat.full_time
    });
    return given;
  }

  getOtherTeamGoals(id) {
    let given = 0;
    const stats = this.getOtherTeamStats(id);
    stats.map(stat => {
      given = given + stat.full_time
    });
    return given;
  }


  getTeamStats(id) {
    const stats = [];
    this.games.forEach(game => {
      game.stats.map(stat => {
        if (stat.team_id == id) {
          stats.push(stat);
        }
      })
    });
    return stats;
  }

  getOtherTeamStats(id) {
    const stats = [];
    this.games.forEach(game => {
      game.stats.map(stat => {
        if (stat.team_id != id) {
          stats.push(stat);
        }
      })
    });
    return stats;
  }
}
