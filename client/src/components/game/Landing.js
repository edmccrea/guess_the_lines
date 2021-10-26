import React, { useState, useEffect } from 'react';
import './Landing.scss';

import Game from './Game';

const Landing = ({ games, week, setWeek, game, setGame }) => {
  //Set week functions
  useEffect(() => {
    if (week === 1) {
      setActiveLeft(false);
    } else {
      setActiveLeft(true);
    }

    if (week === 18) {
      setActiveRight(false);
    } else setActiveRight(true);
  }, [week]);

  const [activeLeft, setActiveLeft] = useState(true);
  const [activeRight, setActiveRight] = useState(true);

  const weekHandlerUp = () => {
    if (week < 18) {
      setWeek(week + 1);
    }
  };
  const weekHandlerDown = () => {
    if (week > 1) {
      setWeek(week - 1);
    }
  };

  //Set game functions
  const gameSubmit = () => {
    console.log(games.length);
    console.log(game);
    if (game < games.length - 1) {
      setGame(game + 1);
    }
  };
  return (
    <div className='landing-container'>
      <div className='week-selection'>
        <i
          className={
            activeLeft
              ? 'fas fa-chevron-left active-arrow'
              : 'fas fa-chevron-left'
          }
          onClick={weekHandlerDown}
        ></i>
        <h1>Week {week}</h1>
        <i
          className={
            activeRight
              ? 'fas fa-chevron-right active-arrow'
              : 'fas fa-chevron-right'
          }
          onClick={weekHandlerUp}
        ></i>
      </div>

      <Game className='game' game={games[game]} gameSubmit={gameSubmit} />

      {/* {games.map((game) => (
        <Game key={game._id} className='game' game={game} />
      ))} */}
    </div>
  );
};

export default Landing;
