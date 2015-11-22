import axios from 'axios';
import { API_BASE_URL } from '../constants';

export function getMessagesForPerson(userId) {
  return axios.get(`${ API_BASE_URL }/messages/byuser/${userId}`)
    .then(response => {
      response.userId = userId;
      return response;
    });
}
