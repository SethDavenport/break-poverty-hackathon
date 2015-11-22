'use strict';

const uuid = require('uuid');
const XError = require('x-error');
const getDb = require('../db');
const u = require('../utils');

const COLLECTION_NAME = 'people';

module.exports = {
  getPersonById: getPersonById,
  upsertPerson: upsertPerson,
  removePerson: removePerson,
  listPeople: listPeople
};

function getPersonById(id) {
  return getDb()
    .then(db => db.collection(COLLECTION_NAME).findOne({ _id: id }))
    .then(person => {
      if (!person) {
        throw new XError(`No such person:${id}`)
          .hc(404)
          .hr('Not found');
      }

      return person;
    });
}

function upsertPerson(person) {
  person._id = person._id || uuid.v4();
  return getDb()
    .then(db => {
      return db.collection(COLLECTION_NAME).update(
        { _id: person._id },
        person,
        { upsert: true });
    })
    .then(result => {
      return { _id: person._id };
    });
}

function removePerson(id) {
  return getDb()
    .then(db => db.collection(COLLECTION_NAME).remove({ _id: id }, 1));
}

function listPeople() {
  return getDb()
    .then(db => {
      return db.collection(COLLECTION_NAME)
        .find()
        .toArray();
    });
}
