import teamInfo from '../utils/teamInfo';

export const convertName = (games) => {
  let awayTeams = [];
  let homeTeams = [];
  let arr = [];
  games.forEach((game) => {
    teamInfo.forEach((team) => {
      if ('away_team' in game) {
        if (game.away_team.includes(team.name)) {
          awayTeams.push(team.abbreviation);
        }

        if (game.home_team.includes(team.name)) {
          homeTeams.push(team.abbreviation);
        }
      }
      if ('team_name' in game) {
        if (
          game.team_name.includes(team.name) ||
          game.team_name.includes(team.nickname)
        ) {
          game = { ...game, team_abbr: team.abbreviation };
          arr.push(game);
        }
      }
    });
  });

  if (arr.length > 0) {
    return arr;
  } else {
    return [homeTeams, awayTeams];
  }
};
