import axios from 'axios';
import { API_BASE_URL } from '../constants';

export function getPeople() {
  return axios.get(`${ API_BASE_URL }/people`);
}

export function deletePerson(id) {
  return axios
    .delete(`${ API_BASE_URL }/people/${ id }`)
    .then(() => ({
      _id: id,
    }));
}

export function addPerson(person) {
  return axios
    .post(`${ API_BASE_URL }/people`, person)
    .then(({ data }) => {
      return person.merge({ _id: data._id });
    });
}

export function messagePerson(id, message) {
  return axios
    .post(`${ API_BASE_URL }/messages/byuser/${ id }`, message)
    .then(() => ({
      _id: id,
    }));
}
