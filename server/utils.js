'use strict';

const XError = require('x-error');
const winston = require('winston');

module.exports = {
  assertRequired: assertRequired,
  errorHandler: errorHandler
};

function assertRequired(payload, fieldName) {
  if (!payload[fieldName]) {
    return Promise.reject(
      new XError()
        .hc(400)
        .hr({ message: `${fieldName} is required` }));
  }

  return Promise.resolve();
}

function errorHandler(res) {
  return function (error) {
    winston.error(error);

    // TODO: not the right way to handle unknown errors in nodejs!
    res.status(error.httpCode || 500)
      .send(error.httpResponse || 'Internal server error');
  }
}
