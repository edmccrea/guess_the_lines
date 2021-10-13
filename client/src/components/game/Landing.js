import React from 'react';
import './Landing.scss';

import Game from './Game';

const Landing = ({ games, checkGames }) => {
  return (
    <div className='landing-container'>
      <h1>Week One</h1>
      {games.map((game) => (
        <Game key={game.id} className='game' game={game} />
      ))}
    </div>
  );
};

export default Landing;
