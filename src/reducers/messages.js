import { handleActions } from 'redux-actions';

import {
  GET_MESSAGES_PENDING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
} from '../constants';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  messages: {},
  hasError: false,
  isLoading: false,
});

const pendingState = (state) => state.merge({
  hasError: false,
  isLoading: true,
});

const errorState = (state) => state.merge({
  hasError: true,
  isLoading: false,
});

const messageReducer = handleActions({
  /** GET PEOPLE BY USER ID **/
  [GET_MESSAGES_PENDING]: pendingState,
  [GET_MESSAGES_SUCCESS]: (state, response) => state.merge({
    messages: { [response.payload.userId]: response.payload.data},
    hasError: false,
    isLoading: false,
  }),
  [GET_MESSAGES_ERROR]: errorState,
}, INITIAL_STATE);

export default messageReducer;
