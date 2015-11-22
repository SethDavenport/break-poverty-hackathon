import {
  getMessagesForPerson as _getMessagesForPerson,
  setRecurringMessageForPerson as _setRecurringMessagesForPerson,
} from '../api/messages';

import {
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_PENDING,
  GET_MESSAGES_ERROR,
  SET_RECURRING_MESSAGE_SUCCESS,
  SET_RECURRING_MESSAGE_PENDING,
  SET_RECURRING_MESSAGE_ERROR,
} from '../constants';

export function getMessagesForPerson(userId) {
  return {
    types: [
      GET_MESSAGES_PENDING,
      GET_MESSAGES_SUCCESS,
      GET_MESSAGES_ERROR,
    ],
    payload: {
      promise: _getMessagesForPerson(userId),
    },
  };
}

export function setRecurringMessageForPerson(userId) {
  return {
    types: [
      SET_RECURRING_MESSAGE_SUCCESS,
      SET_RECURRING_MESSAGE_PENDING,
      SET_RECURRING_MESSAGE_ERROR,
    ],
    payload: {
      promise: _setRecurringMessagesForPerson(userId, data),
    },
  };
}
