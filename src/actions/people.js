import {
  getPeople as _getPeople,
  deletePerson as _deletePerson,
  addPerson as _addPerson,
  messagePerson as _messagePerson,
} from '../api/people';

import {
  SELECT_PERSON,

  /** GET **/
  GET_PEOPLE_SUCCESS,
  GET_PEOPLE_PENDING,
  GET_PEOPLE_ERROR,

  /** DELETE **/
  DEL_PERSON_SUCCESS,
  DEL_PERSON_PENDING,
  DEL_PERSON_ERROR,

  /** ADD **/
  ADD_PERSON_SUCCESS,
  ADD_PERSON_PENDING,
  ADD_PERSON_ERROR,

  /** SEND MESSAGE **/
  MESSAGE_PERSON_SUCCESS,
  MESSAGE_PERSON_PENDING,
  MESSAGE_PERSON_ERROR,
} from '../constants';

export function selectPerson(id) {
  return {
    type: SELECT_PERSON,
    payload: {
      personId: id,
    },
  };
}

export function getPeople() {
  return {
    types: [
      GET_PEOPLE_PENDING,
      GET_PEOPLE_SUCCESS,
      GET_PEOPLE_ERROR,
    ],
    payload: {
      promise: _getPeople(),
    },
  };
}

export function deletePerson(id) {
  return {
    types: [
      DEL_PERSON_PENDING,
      DEL_PERSON_SUCCESS,
      DEL_PERSON_ERROR,
    ],
    payload: {
      promise: _deletePerson(id),
    },
  };
}

export function addPerson(person) {
  return {
    types: [
      ADD_PERSON_PENDING,
      ADD_PERSON_SUCCESS,
      ADD_PERSON_ERROR,
    ],
    payload: {
      promise: _addPerson(person),
    },
  };
}

export function messagePerson(id, message) {
  return {
    types: [
      MESSAGE_PERSON_SUCCESS,
      MESSAGE_PERSON_PENDING,
      MESSAGE_PERSON_ERROR,
    ],
    payload: {
      promise: _messagePerson(id, message),
    },
  };
}
