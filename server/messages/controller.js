'use strict';

const moment = require('moment');
const messageService = require('./service');
const messageStorage = require('./storage');
const peopleStorage = require('../people/storage');
const u = require('../utils');

module.exports = {
  sendMessageToUser: sendMessageToUser,
  receiveIncomingMessage: receiveIncomingMessage,
  getMessageHistoryForPerson: getMessageHistoryForPerson
};

function sendMessageToUser(req, res) {
  u.assertRequired(req.params, 'id')
    .then(() => u.assertRequired(req.body, 'message'))
    .then(() => peopleStorage.getPersonById(req.params.id))
    .then(person => messageService.processOutgoingMessage(req.body.message, person.sms))
    .then(message => res.status(201).send(''))
    .then(null, u.errorHandler(res));
};

function receiveIncomingMessage(req, res) {
  u.assertRequired(req.body, 'From')
    .then(() => u.assertRequired(req.body, 'Body'))
    .then(() => messageStorage.saveMessage({
      sms: req.body.From,
      date: moment().format(),
      text: req.body.Body,
      incoming: true
    }))
    .then(() => {
      res.set('Content-Type', 'text/xml');
      res.send(
        `<?xml version="1.0" encoding="UTF-8" ?>
        <Response>
          <Message>Your message has been received</Message>
        </Response>`);
    })
    .then(null, u.errorHandler(res));
}

function getMessageHistoryForPerson(req, res) {
  u.assertRequired(req.params, 'id')
    .then(() => peopleStorage.getPersonById(req.params.id))
    .then(person => messageStorage.getMessageHistoryBySms(person.sms))
    .then(results => res.send(results))
    .then(null, u.errorHandler(res));
}
