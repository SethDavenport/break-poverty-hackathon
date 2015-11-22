const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');

const router = new express.Router();
module.exports = router;

router.get('/byuser/:id', controller.getRecurrencesForPerson);
router.post('/', bodyParser.json(), controller.upsertRecurrence);

router.use('*', function (req, res) {
  res.status('404').send('Not found');
});
