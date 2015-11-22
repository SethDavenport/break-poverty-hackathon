'use strict';

const MongoClient = require('mongodb').MongoClient;
const uuid = require('uuid');
const moment = require('moment');
const u = require('../utils');
const storage = require('./storage');

module.exports = {
  upsertRecurrence: upsertRecurrence,
  getRecurrencesForPerson: getRecurrencesForPerson
};

function upsertRecurrence(req, res) {
  u.assertRequired(req.body, 'repeatsLeft')
    .then(() => u.assertRequired(req.body, 'userId'))
    .then(() => u.assertRequired(req.body, 'message'))
    .then(() => storage.upsertRecurrence({
      _id: req.body._id,
      intervalDays: req.body.intervalDays || 0,
      hourOfDay: req.body.hourOfDay || 0,
      repeatsLeft: req.body.repeatsLeft,
      userId: req.body.userId,
      message: req.body.message,
      lastFireTime: moment().startOf('day').format()
    }))
    .then(result => res.send(result))
    .then(null, u.errorHandler(res));
}

function getRecurrencesForPerson(req, res) {
  u.assertRequired(req.params, 'id')
    .then(() => storage.listRecurrencesByPerson(req.params.id))
    .then(result => res.send(result))
    .then(null, u.errorHandler(res));
}
