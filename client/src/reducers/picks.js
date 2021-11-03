import { GET_PICKS, PICKS_ERROR } from '../actions/types';

const initialState = {
  loading: true,
  picks: null,
  error: {},
};

function pickReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PICKS:
      return {
        ...state,
        picks: payload,
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
