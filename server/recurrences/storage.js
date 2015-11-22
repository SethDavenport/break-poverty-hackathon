'use strict';

const uuid = require('uuid');
const XError = require('x-error');
const R = require('ramda');
const moment = require('moment');
const getDb = require('../db');
const u = require('../utils');

const COLLECTION_NAME = 'recurrences';

module.exports = {
  upsertRecurrence: upsertRecurrence,
  removeRecurrence: removeRecurrence,
  listRecurrencesByPerson: listRecurrencesByPerson,
  listActionableRecurrences: listActionableRecurrences
};

function upsertRecurrence(recurrence) {
  recurrence._id = recurrence._id || uuid.v4();
  return getDb()
    .then(db => {
      return db.collection(COLLECTION_NAME).update(
        { _id: recurrence._id },
        recurrence,
        { upsert: true });
    })
    .then(result => {
      return { _id: recurrence._id };
    });
}

function removeRecurrence(id) {
  return getDb()
    .then(db => db.collection(COLLECTION_NAME).remove({ _id: id }, 1));
}

// TODO: paging.
function listRecurrencesByPerson(userId) {
  return getDb()
    .then(db => {
      return db.collection(COLLECTION_NAME)
        .find({ userId: userId })
        .toArray();
    });
}

function listActionableRecurrences() {
  return getDb()
    .then(db => {
      return db.collection(COLLECTION_NAME)
        .find()
        .toArray();
    })
    .then(R.map(_injectNextFireTime))
    .then(R.filter(_shouldFireInCurrentHour));
}

function _injectNextFireTime(recurrence) {
  const nextFireTime = moment(recurrence.lastFireTime)
    .startOf('day')
    .add(recurrence.intervalDays, 'days')
    .add(recurrence.hourOfDay, 'hours')
    .format();
  return R.assoc('nextFireTime', nextFireTime, recurrence);
}

function _shouldFireInCurrentHour(recurrence) {
  const currentHour = moment().startOf('hour');
  const nextHour = moment().startOf('hour').add(1, 'hours');

  return recurrence.nextFireTime >= currentHour.format() &&
    recurrence.nextFireTime < nextHour.format();
}
