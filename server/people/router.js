const express = require('express');
const jsonParser = require('body-parser').json();
const controller = require('./controller');

const router = new express.Router();
module.exports = router;

router.get('/', controller.listPeople);
router.post('/', jsonParser, controller.upsertPerson);

router.get('/:id', controller.getPersonById);
router.delete('/:id', controller.removePerson);

router.use('*', function (req, res) {
  res.status('404').send('Not found');
});
