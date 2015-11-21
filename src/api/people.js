import axios from 'axios';

const domain = 'http://break-poverty-hackathon.herokuapp.com';

export function getPeople() {
  return axios.get(`${ domain }/api/people`);
}

export function deletePerson(id) {
  return axios
    .delete(`${ domain }/api/people/${ id }`)
    .then(() => ({
      _id: id,
    }));
}

export function addPerson(person) {
  return axios
    .post(`${ domain }/api/people`, person)
    .then(({ data }) => {
      return person.merge({ _id: data._id });
    });
}
