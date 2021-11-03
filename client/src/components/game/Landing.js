import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Landing.scss';
import { convertName } from '../../utils/convertName';

import Game from './Game';
import GameResults from './GameResults';

const Landing = ({ auth: { user }, games, week, setWeek, game, setGame }) => {
  const [loading, setLoading] = useState(true);
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

  //Set user picks & week buttons

  const [showResults, setShowResults] = useState(true);
  const [userPicks, setUserPicks] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (user) {
      const getUserPicks = async () => {
        const res = await axios.get(`/picks/${user._id}/${week}`);
        if (res.data.length === 0) {
          setUserPicks([]);
          setShowResults(false);
          setLoading(false);
        }
        if (res.data.length > 0) {
          setUserPicks(convertName(res.data[0].picks));
          setShowResults(true);
          setLoading(false);
        }
      };
      getUserPicks();
    }

    if (!user) {
      setUserPicks([]);
      setShowResults(false);
      setLoading(false);
    }

    if (week === 1) {
      setActiveLeft(false);
    } else {
      setActiveLeft(true);
    }

    if (week === 18) {
      setActiveRight(false);
    } else setActiveRight(true);
  }, [user, week]);

  //Set week functions
  const [activeLeft, setActiveLeft] = useState(true);
  const [activeRight, setActiveRight] = useState(true);

  //Game functions
  const [pick, setPick] = useState({});
  const [picks, setPicks] = useState([]);
  const [gameEnd, setGameEnd] = useState(false);

  const gameSubmit = () => {
    if (game < games.length - 1) {
      setGame(game + 1);
      setActiveRight(false);
    }

    if (game === games.length - 1) {
      setGame(game);
      setGameEnd(true);
    }
  };

  //Submit picks to database
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const savePicks = () => {
    axios.post(
      '/picks',
      {
        week,
        picks,
      },
      config
    );
    setPick({});
    setPicks([]);
    setGame(0);
    setGameEnd(false);
    setShowResults(true);
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
      {loading ? (
        <p className='loading-container'>Loading...</p>
      ) : showResults ? (
        <GameResults
          games={games}
          week={week}
          userPicks={userPicks}
          setUserPicks={setUserPicks}
        />
      ) : !games.length ? (
        <p>There are no lines for this week yet.</p>
      ) : !gameEnd ? (
        <Game
          className='game'
          game={games[game]}
          gameSubmit={gameSubmit}
          setPick={setPick}
          pick={pick}
          setPicks={setPicks}
          picks={picks}
        />
      ) : (
        <p
          className={gameEnd ? 'submit-btn' : 'submit-btn submit-hidden'}
          onClick={savePicks}
        >
          Save Picks
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
