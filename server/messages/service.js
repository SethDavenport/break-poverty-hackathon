'use strict';

'use strict';

const twilio = require('twilio');
const moment = require('moment');
const messageStorage = require('./storage');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const senderNumber = process.env.TWILIO_SENDER_NUMBER;

if (!accountSid) throw new Error('process.env.TWILIO_SID not set');
if (!authToken) throw new Error('process.env.TWILIO_TOKEN not set');
if (!senderNumber) throw new Error('process.env.TWILIO_SENDER_NUMBER not set');

var client = twilio(accountSid, authToken);

module.exports = {
  processOutgoingMessage: processOutgoingMessage
};

function processOutgoingMessage(message, sms) {
  return Promise.all([
    _sendMessage(message, sms),
    _saveMessage(message, sms)
  ]);
}

function _sendMessage(message, sms) {
  return client.messages.create({
    from: senderNumber,
    to: sms,
    body: message
  });
}

function _saveMessage(message, sms) {
  return messageStorage.saveMessage({
    sms: sms,
    date: moment().format(),
    text: message,
    incoming: false
  });
}
