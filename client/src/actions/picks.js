import axios from 'axios';

import {
  GET_USER_PICKS,
  GET_BILL_PICKS,
  GET_SAL_PICKS,
  PICKS_ERROR,
} from './types';

export const setUsersPicks = (userId) => async (dispatch) => {
  try {
  } catch {}
};

export const getUsersPicks = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/picks/${userId}`);

    dispatch({
      type: GET_USER_PICKS,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.errors;

    //set alert here

    dispatch({
      type: PICKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getBillPicks = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/picks/617bca21949eb6d15fae893c`);

    dispatch({
      type: GET_BILL_PICKS,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.errors;

    //set alert here

    dispatch({
      type: PICKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getSalPicks = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/picks/617bcb01949eb6d15fae89aa`);

    dispatch({
      type: GET_SAL_PICKS,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.errors;

    //set alert here

    dispatch({
      type: PICKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
