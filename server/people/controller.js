'use strict';

const MongoClient = require('mongodb').MongoClient;
const uuid = require('uuid');
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

function getPersonById(req, res) {
  const id = req.params.id;
  connectPromise
    .then(db => {
      u.assertRequired(req.params, 'id');
      return db.collection(COLLECTION_NAME).findOne({ _id: id });
    })
    .then(result => res.send(result))
    .then(null, u.errorHandler(res));
}

function upsertPerson(req, res) {
  connectPromise
    .then(db => {
      u.assertRequired(req.body, 'name');
      u.assertRequired(req.body, 'sms');

      return db.collection(COLLECTION_NAME).update(
        { _id: req.body._id || uuid.v4() },
        {
          name: req.body.name,
          sms: req.body.sms,
          details: req.body.details || {}
        },
        { upsert: true});
    })
    .then(result => res.send({ _id: result.result.upserted[0]._id }))
    .then(null, u.errorHandler(res));
}

function removePerson(req, res) {
  const id = req.params.id;
  connectPromise
    .then(db => {
      u.assertRequired(req.params, 'id');
      return db.collection(COLLECTION_NAME).remove({ _id: id }, 1);
    })
    .then(result => res.status(204).send(''))
    .then(null, u.errorHandler(res));
}

// TODO: Add paging later.
function listPeople(req, res) {
  connectPromise
    .then(db => {
      return db.collection(COLLECTION_NAME)
        .find()
        .toArray();
    })
    .then(result => res.send(result))
    .then(null, u.errorHandler(res));
}
