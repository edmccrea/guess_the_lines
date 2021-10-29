import React, { useState, useEffect } from 'react';
import './Game.scss';

import teamInfo from '../../utils/teamInfo';

const Game = ({
  game,
  gameSubmit,
  setPick,
  pick,
  setPicks,
  picks,
  gameEnd,
}) => {
  //Convert team names
  let awayTeam = '';
  let homeTeam = '';

  const convertName = () => {
    teamInfo.forEach((team) => {
      if (game.away_team.includes(team.nickname)) {
        awayTeam = team.nickname;
      }

      if (game.home_team.includes(team.nickname)) {
        homeTeam = team.nickname;
      }
    });
  };

  convertName();

  //Set point spreads
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

  //Submit pick
  const pickSubmit = async () => {
    if (awayPoints <= 0) {
      setPick({
        team_name: awayTeam,
        point: awayPoints,
      });

      setPicks([
        ...picks,
        {
          team_name: awayTeam,
          point: awayPoints,
        },
      ]);
    }

    if (homePoints <= 0) {
      setPick({
        team_name: homeTeam,
        point: homePoints,
      });
      setPicks([
        ...picks,
        {
          team_name: homeTeam,
          point: homePoints,
        },
      ]);
    }

    setAwayPoints(0);
    setHomePoints(0);
  };

  useEffect(() => {
    console.log(pick);
    console.log(picks);
  }, [pick, picks]);

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
      <p
        className={gameEnd ? 'submit-btn submit-hidden' : 'submit-btn'}
        onClick={() => {
          pickSubmit();
          gameSubmit();
        }}
      >
        Guess
      </p>
    </div>
  );
};

export default Game;
