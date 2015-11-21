'use strict';

const MongoClient = require('mongodb').MongoClient;
const uuid = require('uuid');
const XError = require('x-error');
const u = require('../utils');

const COLLECTION_NAME = 'people';
let connectPromise = MongoClient.connect(
  process.env.MONGOLAB_URI || 'mongodb://localhost/break-poverty-hackathon');

module.exports = {
  getPersonById: getPersonById,
  upsertPerson: upsertPerson,
  removePerson: removePerson,
  listPeople: listPeople
};

function getPersonById(id) {
  return connectPromise
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
  const id = person._id || uuid.v4();
  return connectPromise
    .then(db => {
      return db.collection(COLLECTION_NAME).update(
        { _id: id },
        person,
        { upsert: true });
    })
    .then(result => {
      return { _id: id };
    });
}

function removePerson(id) {
  return connectPromise
    .then(db => db.collection(COLLECTION_NAME).remove({ _id: id }, 1));
}

function listPeople() {
  return connectPromise
    .then(db => {
      return db.collection(COLLECTION_NAME)
        .find()
        .toArray();
    });
}
