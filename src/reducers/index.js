import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import user from './user';
import people from './people';

const rootReducer = combineReducers({
  user,
  counter,
  people,
  router: routerStateReducer,
});

export default rootReducer;
