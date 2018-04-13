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

router.get('/:symbol', (req, res) => {
  const { symbol } = req.params;
  Holdings.findOne({ symbol })
  .then(response => {
    console.log('MONGO symbol response:', response);
    res.status(200).send(response);
  })
  .catch(err => {
    console.error(`Unable to find a holding with symbol ${symbol}.`, err);
    res.status(500).send(err);
  });
});

module.exports = router;