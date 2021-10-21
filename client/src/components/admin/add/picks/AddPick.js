import React, { useState } from 'react';
import axios from 'axios';
import './AddPick.scss';

const AddPick = () => {
  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  const [formData, setFormData] = useState({
    user: '',
    week: '',
  });

  const { user, week } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Select the week to make picks and display data
  const [gameWeek, setGameWeek] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadWeekHandler = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://localhost:5000/week/${formData.week}`);
    setGameWeek(res.data);
    setLoading(false);
    setFormData({
      user: '',
      week: '',
    });
  };

  const [homePicked, setHomePicked] = useState(false);
  const [awayPicked, setAwayPicked] = useState(false);

  const selectHomePick = () => {
    if (!homePicked) {
      setHomePicked(true);
    } else {
      setHomePicked(false);
    }
  };

  const selectAwayPick = () => {
    if (!awayPicked) {
      setAwayPicked(true);
    } else {
      setAwayPicked(false);
    }
  };

  //Submit picks to Database
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='add-container'>
      <h1>Add New Picks</h1>
      <form onSubmit={loadWeekHandler} className='week-form'>
        <select name='user' value={user} onChange={(e) => onChange(e)}>
          <option value='Bill'>Bill</option>
          <option value='Sal'>Sal</option>
        </select>

        <select name='week' value={week} onChange={(e) => onChange(e)}>
          <option value='0'>*Select a Week</option>
          {weeks.map((week) => (
            <option value={week} key={week}>
              {week}
            </option>
          ))}
        </select>
        <input type='submit' value='Choose Week' />
      </form>

      {loading ? (
        <p>Select a week...</p>
      ) : (
        !loading &&
        gameWeek[0].games.length > 1 && (
          <form onSubmit={onSubmit} className='picks-form'>
            <h3 className='pick-title'>Week {gameWeek[0].week}</h3>
            <p className='pick-instructions'>
              Select a winner, then choose the point spread.
            </p>
            {gameWeek[0].games.map((game) => (
              <div className='pick-row' key={game._id}>
                <div
                  className={homePicked ? 'pick-box picked' : 'pick-box'}
                  onClick={selectHomePick}
                >
                  <p className='pick'>{game.home_team}</p>
                  <input type='number' step='0.5' className='pick-spread' />
                </div>
                <div
                  className={awayPicked ? 'pick-box picked' : 'pick-box'}
                  onClick={selectAwayPick}
                >
                  <p className='pick'>{game.away_team}</p>
                  <input type='number' step='0.5' className='pick-spread' />
                </div>
              </div>
            ))}
            <input type='submit' value='Submit Picks' />
          </form>
        )
      )}
      {!loading && gameWeek[0].games.length < 1 && (
        <p>
          No games found yet in week {gameWeek[0].week}, please select a
          different week.
        </p>
      )}
    </div>
  );
};

export default AddPick;

// select bill or sal
// select week
// map over games in that week
// display games
// under each game display team with point selection on the side
//Add pick by routing to either /bill or /sal and set the user and id specially there
