import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Landing.scss';
import { convertName } from '../../utils/convertName';

import Game from './Game';
import GameResults from './GameResults';
import { setAlert } from '../../actions/alert';
import { getUsersPicks, getBillPicks, getSalPicks } from '../../actions/picks';

const Landing = ({
  auth: { user },
  setAlert,
  games,
  week,
  setWeek,
  game,
  setGame,
  getUsersPicks,
  getBillPicks,
  getSalPicks,
  test,
}) => {
  const [loading, setLoading] = useState(true);

  const weekHandlerUp = () => {
    if (week < 18) {
      setLoading(true);
      setWeek(week + 1);
    }
  };
  const weekHandlerDown = () => {
    if (week > 1) {
      setLoading(true);
      setWeek(week - 1);
    }
  };

  //Set user picks & week buttons

  const [showResults, setShowResults] = useState(false);
  const [userPicks, setUserPicks] = useState([]);
  const [picksSubmitted, setPicksSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      getUsersPicks(user._id);
    }
    getBillPicks();
    getSalPicks();
  }, [user, getUsersPicks, getBillPicks, getSalPicks]);

  useEffect(() => {
    setShowResults(false);
    if (user) {
      test.userPicks.forEach((pick) => {
        if (pick.week === week) {
          setShowResults(true);
          setUserPicks(convertName(pick.picks));
          return;
        }
      });
      setLoading(false);
    }

    if (!user) {
      setLoading(false);
      setUserPicks([]);
      setShowResults(false);
    }
    // setLoading(false);

    if (week === 1) {
      setActiveLeft(false);
    } else {
      setActiveLeft(true);
    }

    if (week === 18) {
      setActiveRight(false);
    } else setActiveRight(true);
    setPicksSubmitted(false);
  }, [user, week, picksSubmitted, test.userPicks]);

  //Set week functions
  const [activeLeft, setActiveLeft] = useState(true);
  const [activeRight, setActiveRight] = useState(true);

  //Game functions
  // eslint-disable-next-line
  const [pick, setPick] = useState({});
  const [picks, setPicks] = useState([]);
  const [gameEnd, setGameEnd] = useState(false);

  const gameSubmit = () => {
    if (user) {
      if (game < games.length - 1) {
        setGame(game + 1);
        setActiveRight(false);
        setActiveLeft(false);
      }

      if (game === games.length - 1) {
        setGame(game);
        setGameEnd(true);
      }
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
    setActiveLeft(true);
    setActiveRight(true);
    setLoading(true);
    setPicksSubmitted(true);
    setAlert('Picks submitted', 'primary');
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

Landing.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getUsersPicks: PropTypes.func.isRequired,
  getBillPicks: PropTypes.func.isRequired,
  getSalPicks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  test: state.picks,
});

export default connect(mapStateToProps, {
  setAlert,
  getUsersPicks,
  getBillPicks,
  getSalPicks,
})(Landing);
