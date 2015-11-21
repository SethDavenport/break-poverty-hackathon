const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');

const router = new express.Router();
module.exports = router;

router.post('/byuser/:id', bodyParser.json(), controller.sendMessageToUser);
router.post('/incoming',
  bodyParser.urlencoded({ extended: false }),
  controller.receiveIncomingMessage);

router.use('*', function (req, res) {
  res.status('404').send('Not found');
});
