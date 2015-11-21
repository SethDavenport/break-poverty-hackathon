'use strict';

const uuid = require('uuid');
const XError = require('x-error');
const getDb = require('../db');
const u = require('../utils');

const COLLECTION_NAME = 'messages';

module.exports = {
  saveMessage: saveMessage,
  getMessageHistoryBySms: getMessageHistoryBySms
};

function saveMessage(message) {
  return getDb()
    .then(db => db.collection(COLLECTION_NAME).insert(message));
}

// TODO: paging.
function getMessageHistoryBySms(sms) {
  return getDb()
    .then(db => {
      return db.collection(COLLECTION_NAME)
        .find({ sms: sms })
        .sort({ date: -1 })
        .toArray();
    });
}
