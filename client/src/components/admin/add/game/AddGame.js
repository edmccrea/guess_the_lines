import React, { useState } from 'react';
import axios from 'axios';
import './AddGame.scss';
import { teams } from '../../../../utils/teams';
import { v4 as uuidv4 } from 'uuid';

const AddGame = () => {
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    commenceTime: '',
    homePoint: '',
    awayPoint: '',
  });

  const { homeTeam, awayTeam, commenceTime, homePoint, awayPoint } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/games', createNewGame(formData), config);
    setFormData({
      homeTeam: '',
      awayTeam: '',
      commenceTime: '',
      homePoint: '',
      awayPoint: '',
    });
  };

  const createNewGame = (data) => {
    const newGame = {
      id: uuidv4(),
      sport_key: 'americanfootball_nfl',
      commence_time: data.commenceTime,
      home_team: data.homeTeam,
      away_team: data.awayTeam,
      bookmakers: [
        {
          key: 'fanduel',
          title: 'FanDuel',
          last_update: Date.now(),
          markets: [
            {
              key: 'spreads',
              outcomes: [
                {
                  name: data.awayTeam,
                  price: -110,
                  point: data.awayPoint,
                },
                {
                  name: data.homeTeam,
                  price: -110,
                  point: data.homePoint,
                },
              ],
            },
          ],
        },
      ],
    };
    return newGame;
  };
  return (
    <div className='add-container'>
      <h1>Add a Game</h1>
      <form onSubmit={onSubmit}>
        <div className='home-input'>
          <select
            name='homeTeam'
            value={homeTeam}
            onChange={(e) => onChange(e)}
            required
          >
            <option value='0'>* Select Home Team</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <input
            type='number'
            name='homePoint'
            value={homePoint}
            placeholder='Point'
            step='0.5'
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='away-input'>
          <select
            name='awayTeam'
            value={awayTeam}
            onChange={(e) => onChange(e)}
            required
          >
            <option value='0'>* Select Away Team</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <input
            type='number'
            name='awayPoint'
            value={awayPoint}
            placeholder='Point'
            step='0.5'
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <label htmlFor='commenceTime'>Kickoff Date:</label>
        <input
          className='date-input'
          type='date'
          name='commenceTime'
          value={commenceTime}
          onChange={(e) => onChange(e)}
          required
        />
        <input className='submit-game' type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default AddGame;
