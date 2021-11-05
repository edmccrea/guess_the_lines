import { combineReducers } from 'redux';
import auth from './auth';
import picks from './picks';
import alert from './alert';

export default combineReducers({
  auth,
  picks,
  alert,
});
