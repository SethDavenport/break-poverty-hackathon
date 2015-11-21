const path = require('path');
const express = require('express');
const winston = require('winston');
const people = require('./people/router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/dist', express.static('dist'));

// Serve the front end.
app.get('/', function(req, res) {
  res.sendFile(path.normalize(path.join(__dirname, '..', 'index.html')));
});

// Serve the REST API.
app.use('/api/people', people);

app.listen(PORT, '0.0.0.0', function(err) {
  if (err) {
    // TODO: fix node error handling.
    winston.error(err);
    return;
  }

  winston.info(`Listening at http://localhost:${ PORT }`);
});
