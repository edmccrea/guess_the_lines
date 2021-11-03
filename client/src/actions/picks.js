import axios from 'axios';

import { GET_PICKS, PICKS_ERROR } from './types';

export const getPicks = (userId, week) => async (dispatch) => {
  try {
    const res = await axios.get(`/picks/${userId}/${week}`);

    dispatch({
      type: GET_PICKS,
      payload: res.data[0].picks,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    //set alert here

    dispatch({
      type: PICKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
