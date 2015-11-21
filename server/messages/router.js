const express = require('express');
const jsonParser = require('body-parser').json();
const controller = require('./controller');

const router = new express.Router();
module.exports = router;

router.post('/byuser/:id', jsonParser, controller.sendMessageToUser);

router.use('*', function (req, res) {
  res.status('404').send('Not found');
});
