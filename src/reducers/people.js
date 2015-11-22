import { handleActions } from 'redux-actions';

import {
  GET_PEOPLE_PENDING,
  GET_PEOPLE_SUCCESS,
  GET_PEOPLE_ERROR,
  DEL_PERSON_PENDING,
  DEL_PERSON_SUCCESS,
  DEL_PERSON_ERROR,
  ADD_PERSON_PENDING,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_ERROR,
  MESSAGE_PERSON_SUCCESS,
  MESSAGE_PERSON_PENDING,
  MESSAGE_PERSON_ERROR,
} from '../constants';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  peopleList: [],
  hasError: false,
  isLoading: false,
});

const pendingState = (state) => state.merge({
  hasError: false,
  isLoading: true,
});

const successState = (transformPayload, state, { payload }) => state.merge({
  peopleList: transformPayload(payload, state),
  hasError: false,
  isLoading: false,
});

const errorState = (state) => state.merge({
  hasError: true,
  isLoading: false,
});

const peopleReducer = handleActions({
  /** GET PEOPLE **/
  [GET_PEOPLE_PENDING]: pendingState,
  [GET_PEOPLE_SUCCESS]: successState.bind(null, ({ data }) => data),
  [GET_PEOPLE_ERROR]: errorState,

  /** DELETE PERSON **/
  [DEL_PERSON_PENDING]: pendingState,
  [DEL_PERSON_SUCCESS]: successState.bind(null, ({ _id }, state) =>
    state
      .get('peopleList')
      .filter((person) => person.get('_id') !== _id)
  ),
  [DEL_PERSON_ERROR]: errorState,

  /** ADD PERSON **/
  [ADD_PERSON_PENDING]: pendingState,
  [ADD_PERSON_SUCCESS]: successState.bind(null, ({ data }, state) => {
    return state
      .get('peopleList')
      .concat(data);
  }),
  [ADD_PERSON_ERROR]: errorState,
  /** MESSAGE PERSON **/
  [MESSAGE_PERSON_PENDING]: pendingState,
  [MESSAGE_PERSON_SUCCESS]: successState.bind(null, ({ _id }, state) => {
    return state;
  }),
  [MESSAGE_PERSON_ERROR]: errorState,
}, INITIAL_STATE);

export default peopleReducer;
