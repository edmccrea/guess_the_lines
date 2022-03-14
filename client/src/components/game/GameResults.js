import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './GameResults.scss';

import { convertName } from '../../utils/convertName';
import podcastLinks from '../../utils/podcastLinks';

const GameResults = ({ games, week, userPicks, picks }) => {
  const [loading, setLoading] = useState(true);
  const [line, setLine] = useState([]);
  const [billPicks, setBillPicks] = useState([]);
  const [salPicks, setSalPicks] = useState([]);

  const winningPick = [];

  useEffect(() => {
    //Get All Picks
    picks.billPicks.forEach((pick) => {
      if (pick.week === week) {
        setBillPicks(convertName(pick.picks));
        return;
      }
    });

    picks.salPicks.forEach((pick) => {
      if (pick.week === week) {
        setSalPicks(convertName(pick.picks));
        return;
      }
    });

    const getLine = async () => {
      const res = await axios.get(`/api/games/lines/${week}`);
      setLine(convertName(res.data));
      setLoading(false);
    };
    getLine();
  }, [week, picks.billPicks, picks.salPicks]);

  const getResults = (games) => {
    const alteredPicks = [];

    //Loop through each game
    games.forEach((game, i) => {
      //Grab hold of the pick to compare each game to from each user
      const comparisons = [userPicks[i], billPicks[i], salPicks[i]];

      //Convert any picks that selected the wrong team to a positive number
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

        const closestPicks = [];
        picks.forEach((pick, i) => {
          if (pick.diff === closest) {
            if (picks.indexOf(pick) === 0) {
              closestPicks.push(i);
              gamePoints[i] += 1;
            }
            if (picks.indexOf(pick) === 1) {
              closestPicks.push(i);
              gamePoints[i] += 1;
            }
            if (picks.indexOf(pick) === 2) {
              closestPicks.push(i);
              gamePoints[i] += 1;
            }
          }
        });
        winningPick.push(closestPicks);
      });
      return gamePoints;
    };
    const score = setScore(alteredPicks);
    return score;
  };

  let winningScore = 0;
  let winner = [];

  //Calculate the winning score of the game
  const decideWinner = (scores) => {
    scores.forEach((score, i) => {
      if (score > winningScore) {
        winningScore = score;
      }
    });

    let arr = [];

    scores.forEach((score) => {
      if (score === winningScore) {
        arr.push(true);
      } else {
        arr.push(false);
      }
    });
    winner = arr;
    return winner;
  };

  //Create and display the win/draw phrase

  const generateWinPhrase = (array) => {
    const names = ['You', 'Bill', 'Sal'];

    const tieCheck = (array) => {
      let arr = [];
      array.forEach((item) => {
        if (item) {
          arr.push(item);
        }
      });
      return arr;
    };

    if (tieCheck(array).length < 2) {
      const index = array.indexOf(true);
      const winnerPhrases = [
        `${names[index]} must have been cheating this week, right? Winner.`,
        `The others didnt stand a chance. ${names[index]} took this one home.`,
        `A well deserved win this week for ${names[index]}`,
        `${names[index]} won! Let's see if that luck continues next week.`,
      ];

      const i = Math.floor(Math.random() * winnerPhrases.length);

      return winnerPhrases[i];
    }

    if (tieCheck(array).length === 2) {
      const getAllIndexes = (arr, val) => {
        var indexes = [],
          i = -1;
        while ((i = arr.indexOf(val, i + 1)) !== -1) {
          indexes.push(i);
        }
        return indexes;
      };
      const indexes = getAllIndexes(array, true);
      const tiePhrase = `It really came down to the wire and we couldn't find a winner. ${
        names[indexes[0]]
      } and ${names[indexes[1]]} tie this week.`;

      return tiePhrase;
    }

    if (tieCheck(array).length === 3) {
      return 'Unbelievable. A three way tie this week. What are the chances?';
    }
  };

  let winPhrase = '';
  let scores = [];
  const names = convertName(games);
  if (!loading) {
    scores = getResults(games);
    let test = decideWinner(scores);
    winPhrase = generateWinPhrase(test);
  }

  return (
    <div className='results-container'>
      <h2>How did you do?</h2>
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
                  {names[1][i]} @ {names[0][i]}
                </span>
                <span className='results-col'>
                  {line[i].team_abbr} {line[i].point}
                </span>
                <span
                  className={
                    winningPick[i].includes(0)
                      ? 'winning-pick results-col'
                      : 'results-col'
                  }
                >
                  {userPicks[i].team_abbr} {userPicks[i].point}
                </span>
                <span
                  className={
                    winningPick[i].includes(1)
                      ? 'winning-pick results-col'
                      : 'results-col'
                  }
                >
                  {billPicks[i].team_abbr} {billPicks[i].point}
                </span>
                <span
                  className={
                    winningPick[i].includes(2)
                      ? 'winning-pick results-col'
                      : 'results-col'
                  }
                >
                  {salPicks[i].team_abbr} {salPicks[i].point}
                </span>
              </div>
            );
          })}
          <div className='score-row results-row'>
            <span className='results-col game-col'>Total</span>
            <span className='results-col'>*</span>
            <span className={winner[0] ? 'winner results-col' : 'results-col'}>
              {scores[0]}
            </span>
            <span className={winner[1] ? 'winner results-col' : 'results-col'}>
              {scores[1]}
            </span>
            <span className={winner[2] ? 'winner results-col' : 'results-col'}>
              {scores[2]}
            </span>
          </div>
          <div className='win-phrase'>
            <p>{winPhrase}</p>
          </div>
          <div className='podcast-link'>
            <p>
              Listen to the podcast{' '}
              <Link
                to={{ pathname: podcastLinks[week - 1].link }}
                target='_blank'
              >
                here.
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  picks: state.picks,
});

export default connect(mapStateToProps)(GameResults);
