const express = require('express');

const router = express.Router();
const { Holdings } = require('../../database-mongodb/models');

router.get('/', (req, res) => {
  console.log('Holdings model:', Holdings);
  Holdings.find()
  .then(holdings => {
    console.log('Holdings from mongodb:', holdings);
    res.status(200).send(JSON.stringify(holdings));
  })
  .catch(err => {
    console.error('Unable to get holdings from mongodb.', err);
    res.status(500).send([]);
  });
});

module.exports = router;