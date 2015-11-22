import {
  getMessagesForPerson as _getMessagesForPerson,
} from '../api/messages';

import {
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_PENDING,
  GET_MESSAGES_ERROR,
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
