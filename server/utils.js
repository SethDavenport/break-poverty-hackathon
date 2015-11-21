'use strict';

const XError = require('x-error');

module.exports = {
  assertRequired: assertRequired,
  errorHandler: errorHandler
};

function assertRequired(payload, fieldName) {
  if (!payload[fieldName]) {
    throw new XError()
      .hc(400)
      .hr({ message: `${fieldName} is required` });
  }
}

function errorHandler(res) {
  return function (error) {
    // TODO: not the right way to handle unknown errors in nodejs!
    res.status(error.httpCode || 500)
      .send(error.httpResponse || 'Internal server error');
  }
}
