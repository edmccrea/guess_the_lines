import React, { useState } from 'react';
import './Game.scss';

import nicknames from '../../utils/nicknames';

const Game = ({ game, gameSubmit }) => {
  let awayTeam = '';
  let homeTeam = '';

  const convertName = () => {
    nicknames.forEach((name) => {
      if (game.away_team.includes(name)) {
        awayTeam = name;
      }

      if (game.home_team.includes(name)) {
        homeTeam = name;
      }
    });
  };

  convertName();

  const [awayPoints, setAwayPoints] = useState(0);
  const [homePoints, setHomePoints] = useState(0);
  const addPoints = (team) => {
    if (team === 'away') {
      setAwayPoints(awayPoints - 0.5);
      setHomePoints(homePoints + 0.5);
    }

    if (team === 'home') {
      setAwayPoints(awayPoints + 0.5);
      setHomePoints(homePoints - 0.5);
    }
  };
  return (
    <div className='game-container'>
      <div className='game-info'>
        <div className='teams'>
          <h2 className='team-info'>{awayTeam}</h2>
          <p className='team-info'>at</p>
          <h2 className='team-info'>{homeTeam}</h2>
        </div>
        <div className='time-date'>
          <p>Sunday 10th October 13:00</p>
        </div>
        <div className='game-btns'>
          <p className='predicted-line game-btns-col'>{awayPoints}</p>
          <i
            className='fas fa-chevron-left game-btns-col'
            onClick={() => addPoints('away')}
          ></i>
          <i
            className='fas fa-chevron-right game-btns-col'
            onClick={() => addPoints('home')}
          ></i>
          <p className='predicted-line game-btns-col'>{homePoints}</p>
        </div>
      </div>
      <p className='submit-btn' onClick={gameSubmit}>
        Guess
      </p>
    </div>
  );
};

export default Game;
