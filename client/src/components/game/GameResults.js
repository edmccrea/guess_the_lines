import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './GameResults.scss';

import teamInfo from '../../utils/teamInfo';

const GameResults = ({ auth: { user }, games, week }) => {
  const [loading, setLoading] = useState(true);
  const [line, setLine] = useState([]);
  const [userPicks, setUserPicks] = useState([]);
  const [billPicks, setBillPicks] = useState([]);
  const [salPicks, setSalPicks] = useState([]);
  const [usersPoints, setUsersPoints] = useState(0);
  const [billsPoints, setBillsPoints] = useState(0);
  const [salsPoints, setSalsPoints] = useState(0);

  useEffect(() => {
    //Get All Picks
    if (user) {
      const getPicks = async () => {
        const res = await axios.get(`/games/lines/${week}`);
        setLine(convertName(res.data));

        const res2 = await axios.get(`/picks/${user._id}/${week}`);
        setUserPicks(convertName(res2.data[0].picks));

        const res3 = await axios.get(`/picks/617bca21949eb6d15fae893c/${week}`);
        setBillPicks(convertName(res3.data[0].picks));

        const res4 = await axios.get(`/picks/617bcb01949eb6d15fae89aa/${week}`);
        setSalPicks(convertName(res4.data[0].picks));

        setLoading(false);
      };
      getPicks();
    }
  }, [user, user._id, week]);

  //Convert Team Names
  let awayTeams = [];
  let homeTeams = [];

  const convertName = (games) => {
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
    }
  };

  const getResults = (games) => {
    const alteredPicks = [];

    //Loop through each game
    games.forEach((games, i) => {
      //Grab hold of the pick to compare each game to from each user
      const comparisons = [userPicks[i], billPicks[i], salPicks[i]];

      //Comvert any picks that selected the wrong team to a positive number
      const convertScores = (picks) => {
        const result = [];
        picks.forEach((user) => {
          if (user.team_abbr !== line[i].team_abbr) {
            const altered = {
              ...user,
              point: Math.abs(user.point),
            };
            result.push(altered);
          } else {
            result.push(user);
          }
        });
        alteredPicks.push(result);
      };

      convertScores(comparisons);
    });

    //Calculate the difference between the line and the pick with the number now converted if wrong team selected
    const calcDiff = (alteredPicks) => {
      line.forEach((pick, i) => {
        alteredPicks[i].forEach((item) => {
          item.diff = Math.abs(item.point - pick.point);
        });
      });
    };

    calcDiff(alteredPicks);

    const setScore = (calcedDiffs) => {
      const gamePoints = [0, 0, 0];
      calcedDiffs.forEach((picks) => {
        let closest = 100;
        picks.forEach((pick) => {
          if (pick.diff < closest) {
            closest = pick.diff;
          }
        });

        picks.forEach((pick) => {
          if (pick.diff === closest) {
            if (picks.indexOf(pick) === 0) {
              gamePoints[0] += 1;
            }
            if (picks.indexOf(pick) === 1) {
              gamePoints[1] += 1;
            }
            if (picks.indexOf(pick) === 2) {
              gamePoints[2] += 1;
            }
          }
        });
      });
      return gamePoints;
    };
    const score = setScore(alteredPicks);
    return score;
  };

  let scores = [];
  if (!loading) {
    convertName(games);
    scores = getResults(games);
  }

  return (
    <div className='results-container'>
      <h1>How did you do?</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='results-table'>
          <div className='results-header results-row'>
            <span className='game-col results-col'>Game</span>
            <span className='results-col'>Line</span>
            <span className='results-col'>You</span>
            <span className='results-col'>Bill</span>
            <span className='results-col'>Sal</span>
          </div>
          {games.map((game, i) => {
            return (
              <div className='results-row' key={game._id}>
                <span className='game-col results-col'>
                  {awayTeams[i]} @ {homeTeams[i]}
                </span>
                <span className='results-col'>
                  {line[i].team_abbr} {line[i].point}
                </span>
                <span className='results-col'>
                  {userPicks[i].team_abbr}
                  {userPicks[i].point}
                </span>
                <span className='results-col'>
                  {billPicks[i].team_abbr} {billPicks[i].point}
                </span>
                <span className='results-col'>
                  {`${salPicks[i].team_abbr} ${salPicks[i].point}`}
                </span>
              </div>
            );
          })}
          <div className='score-row results-row'>
            <span className='results-col game-col'>Total</span>
            <span className='results-col'>*</span>
            <span className='results-col'>{scores[0]}</span>
            <span className='results-col'>{scores[1]}</span>
            <span className='results-col'>{scores[2]}</span>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(GameResults);
