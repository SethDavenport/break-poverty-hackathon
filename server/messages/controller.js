'use strict';

const twilio = require('twilio');
const moment = require('moment');
const messageStorage = require('./storage');
const peopleStorage = require('../people/storage');
const u = require('../utils');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const senderNumber = process.env.TWILIO_SENDER_NUMBER;

if (!accountSid) throw new Error('process.env.TWILIO_SID not set');
if (!authToken) throw new Error('process.env.TWILIO_TOKEN not set');
if (!senderNumber) throw new Error('process.env.TWILIO_SENDER_NUMBER not set');

var client = twilio(accountSid, authToken);

module.exports = {
  sendMessageToUser: sendMessageToUser,
  receiveIncomingMessage: receiveIncomingMessage,
  getMessageHistoryForPerson: getMessageHistoryForPerson
};

function sendMessageToUser(req, res) {
  u.assertRequired(req.params, 'id')
    .then(() => u.assertRequired(req.body, 'message'))
    .then(() => peopleStorage.getPersonById(req.params.id))
    .then(person => {
      client.messages.create({
        from: senderNumber,
        to: person.sms,
        body: req.body.message
      });
      return person;
    })
    .then((person) => messageStorage.saveMessage({
      sms: person.sms,
      date: moment().format(),
      text: req.body.message,
      incoming: false
    }))
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
