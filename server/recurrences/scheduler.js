'use strict';

const winston = require('winston');
const recurrenceStorage = require('./storage');
const messageService = require('../messages/service');
const R = require('ramda');

// Note: this strategy won't work for a multi-node server install: you'll get
// race conditions and duplicate messages. This script would need to live on
// its own box independent of the web servers in such a setup.

module.exports = {
  start: start
};

function start() {
  recurrenceStorage.listActionableRecurrences()
    .then(R.map(_fireRecurrence))
    .then(Promise.all.bind(Promise))
    .then(null, error => {
      winston.error(error);
    });
}

function _fireRecurrence(recurrence) {
  recurrence.lastFireTime = recurrence.nextFireTime;
  recurrence.nextFireTime = null;
  recurrence.timesRemaining--;

  let promise = recurrence.timesRemaining < 0 || isNaN(recurrence.timesRemaining) ?
    recurrenceStorage.removeRecurrence(recurrence._id) :
    recurrenceStorage.saveRecurrence(recurrence);

  return promise.then(() => messageService.processOutgoingMessage(
    req.body.message,
    person.sms));
}
