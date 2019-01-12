import { combineReducers } from 'redux';

import user from './user';
import todo from './todo';

// https://redux.js.org/basics/reducers
export default combineReducers({
  user,
  todo,
});
