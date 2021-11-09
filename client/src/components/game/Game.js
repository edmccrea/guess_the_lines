import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Game.scss';

import teamInfo from '../../utils/teamInfo';
import { setAlert } from '../../actions/alert';

const Game = ({
  auth: { user },
  setAlert,
  game,
  gameSubmit,
  setPick,
  setPicks,
  picks,
  gameEnd,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

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

  //Display day & date
  const displayDate = (game) => {
    const config = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(game.commence_time);
    return date.toLocaleDateString('en-GB', config);
  };

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
    if (!user) {
      setAlert('You must be logged on in order to guess', 'primary');
    }

    if ((user && awayPoints === 0) || (user && homePoints === 0)) {
      setAlert(
        "No Pick'ems, please select a point spread for home and away",
        'primary'
      );
    }

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

      setAwayPoints(0);
      setHomePoints(0);
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
          <p>{displayDate(game)}</p>
        </div>
        <div className='game-btns'>
          <div className='point'>
            <p className='predicted-line game-btns-col'>{awayPoints}</p>
            {width < 1100 ? <p>Away</p> : ''}
          </div>
          <i
            className='fas fa-chevron-left game-btns-col'
            onClick={() => addPoints('away')}
          ></i>
          <i
            className='fas fa-chevron-right game-btns-col'
            onClick={() => addPoints('home')}
          ></i>
          <div className='point'>
            <p className='predicted-line game-btns-col'>{homePoints}</p>
            {width < 1100 ? <p>Home</p> : ''}
          </div>
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

Game.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Game);
