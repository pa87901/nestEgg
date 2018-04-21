const express = require('express');
const {
  getAllHoldings,
  getOneHolding,
  deleteHoldings
} = require('../../database-mongodb/models/holdings');
const { deleteTransactions } = require('../../database-mongodb/models/transactions');


const router = express.Router();

router.get('/', (req, res) => {
  getAllHoldings()
  .then(holdings => {
    res.status(200).send(holdings);
  })
  .catch(err => {
    console.error('Unable to get holdings from mongodb.', err);
    res.status(500).send([]);
  });
});

router.get('/:symbol', (req, res) => {
  const { symbol } = req.params;
  getOneHolding(symbol)
  .then(holding => {
    res.status(200).send(holding);
  })
  .catch(err => {
    console.error(`Unable to find a holding with symbol ${symbol}.`, err);
    res.status(500).send(err);
  })
});

router.delete('/', (req, res) => {
  const { selected } = req.body;
  console.log('Symbols to delete:', selected);
  deleteHoldings(selected)
  .then(() => deleteTransactions(selected))
  .then(response => {
    const payload = {
      response,
      selected
    }
    res.status(303).send(payload);
  })
  .catch(err => {
    console.error('error deleting symbols', err);
    res.status(500).send('NO SIR');
  });
});

module.exports = router;