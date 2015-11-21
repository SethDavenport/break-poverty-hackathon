'use strict';

const twilio = require('twilio');
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
  receiveIncomingMessage: receiveIncomingMessage
};

function sendMessageToUser(req, res) {
  u.assertRequired(req.params, 'id')
    .then(() => u.assertRequired(req.body, 'message'))
    .then(() => peopleStorage.getPersonById(req.params.id))
    .then(person => client.messages.create({
      from: senderNumber,
      to: person.sms,
      body: req.body.message
    }))
    .then(message => res.status(201).send(''))
    .then(null, u.errorHandler(res));
};

function receiveIncomingMessage(req, res) {
  console.log('INCOMING!!!!', req.body);
  res.send('OK, got your message');
}
