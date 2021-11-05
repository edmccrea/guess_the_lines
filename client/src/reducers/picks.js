import {
  GET_USER_PICKS,
  GET_BILL_PICKS,
  GET_SAL_PICKS,
  PICKS_ERROR,
} from '../actions/types';

// const initialState = {
//   loading: true,
//   picks: null,
//   error: {},
// };

const initialState = {
  loading: true,
  userPicks: [],
  billPicks: [],
  salPicks: [],
  error: {},
};

function pickReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_PICKS:
      return {
        ...state,
        userPicks: payload,
        loading: false,
      };
    case GET_BILL_PICKS:
      return {
        ...state,
        billPicks: payload,
        loading: false,
      };
    case GET_SAL_PICKS:
      return {
        ...state,
        salPicks: payload,
        loading: false,
      };
    case PICKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        picks: null,
      };
    default:
      return state;
  }
}

export default pickReducer;
