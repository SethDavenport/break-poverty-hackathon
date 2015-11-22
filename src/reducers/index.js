import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import user from './user';
import people from './people';
import messages from './messages';

const rootReducer = combineReducers({
  user,
  people,
  messages,
  router: routerStateReducer,
});

export default rootReducer;
