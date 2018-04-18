const express = require('express');

const router = express.Router();
const { Holdings, Transactions } = require('../../database-mongodb/models');

router.get('/', (req, res) => {
  Holdings.find()
  .then(holdings => {
    // console.log('Holdings from mongodb:', holdings);
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
    // console.log('MONGO symbol response:', response);
    res.status(200).send(response);
  })
  .catch(err => {
    console.error(`Unable to find a holding with symbol ${symbol}.`, err);
    res.status(500).send(err);
  });
});

router.delete('/', (req, res) => {
  const { selected } = req.body;
  // console.log('Selected holdings to delete:', selected);
  Holdings.remove({ symbol: { $in: selected } })
  .then(() => Transactions.remove({ symbol: { $in: selected } }))
  .then(response => {
    const responseBody = {
      selected,
      response
    }
    res.status(418).send(responseBody);
  })
  .catch(err => {
    console.error('error deleting symbols', err);
    res.status(500).send('NO SIR');
  });
});


module.exports = router;