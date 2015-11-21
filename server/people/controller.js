'use strict';

const MongoClient = require('mongodb').MongoClient;
const uuid = require('uuid');
const u = require('../utils');
const storage = require('./storage');

module.exports = {
  getPersonById: getPersonById,
  upsertPerson: upsertPerson,
  removePerson: removePerson,
  listPeople: listPeople
};

function getPersonById(req, res) {
  const id = req.params.id;
  u.assertRequired(req.params, 'id')
    .then(() => storage.getPersonById(req.params.id))
    .then(result => res.send(result))
    .then(null, u.errorHandler(res));
}

function upsertPerson(req, res) {
  u.assertRequired(req.body, 'name')
    .then(() => u.assertRequired(req.body, 'sms'))
    .then(() => storage.upsertPerson({
      _id: req.body._id || uuid.v4(),
      name: req.body.name,
      sms: req.body.sms,
      details: req.body.details || {}
    }))
    .then(result => res.send(result))
    .then(null, u.errorHandler(res));
}

function removePerson(req, res) {
  const id = req.params.id;
  u.assertRequired(req.params, 'id')
    .then(() => storage.removePerson(id))
    .then(result => res.status(204).send(''))
    .then(null, u.errorHandler(res));
}

// TODO: Add paging later.
function listPeople(req, res) {
  storage.listPeople()
    .then(result => res.send(result))
    .then(null, u.errorHandler(res));
}
