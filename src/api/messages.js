import axios from 'axios';
import { API_BASE_URL } from '../constants';

export function getMessagesForPerson(userId) {
  return axios.get(`${ API_BASE_URL }/messages/byuser/${userId}`)
    .then(response => {
      response.userId = userId;
      return response;
    });
}
// /api/recurrences/byuser/:id
// {
//   intervalDays: 3,
//   hourOfDay: 16,
//   repeatsLeft: 4,
//   userId: <a user id>,
//   message: "The message you want to send"
// }
export function setRecurringMessageForPerson(userId, data) {
  return axios
    .post(`${ API_BASE_URL }/recurrences/byuser/${ userId }`, data);
}
