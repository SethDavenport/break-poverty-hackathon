'use strict';

const MongoClient = require('mongodb').MongoClient;

const connectPromise = MongoClient.connect(
  process.env.MONGOLAB_URI || 'mongodb://localhost/break-poverty-hackathon');

module.exports = function () {
  return connectPromise;
}
