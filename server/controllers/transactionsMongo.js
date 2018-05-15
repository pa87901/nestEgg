const express = require('express');
const {
  getAllTransactions,
  deleteTransactions,
  addTransaction,
  getSelectedTransactions,
  getRemainingTransactions
} = require('../../database-mongodb/models/transactions');
const {
  getOneHolding,
  addHolding,
  updateHolding,
  deleteHoldings
} = require('../../database-mongodb/models/holdings');


const router = express.Router();

router.get('/', (req, res) => {
  getAllTransactions()
  .then(transactions => {
    res.status(200).send(transactions);
  })
  .catch(err => {
    console.error('Unable to get transactions from mongodb.', err); // eslint-disable-line no-console
    res.status(500).send([]);
  })
});

router.delete('/', (req, res) => {
  const { selectedTransactions } = req.body;
  // Retrieve the symbols for the holdings that are about to be deleted and store them in an array or set.
  const holdingsAffected = new Map();
  getSelectedTransactions(selectedTransactions)
  .then(transactionsForDeletion => {
    transactionsForDeletion.forEach(tranx => {
      if (!holdingsAffected.has(tranx.symbol)) {
        holdingsAffected.set(tranx.symbol, 1);
      }
    });
    return deleteTransactions(transactionsForDeletion);
  })
  .then(() => {
    const symbolsDeleted = Array.from(holdingsAffected.keys());
    console.log('Holdings affected:', symbolsDeleted);
    return getRemainingTransactions(symbolsDeleted);
  })
  .then(remainingTransactions => {
    console.log('Remaining transactions:', remainingTransactions);
    const responseSet = new Set();
    // Recalculate for each symbol what holdings were affected and the shares and costprice now for those holdings.
    // Iterate through the remainingTransactions and calculate shares & cost price
    holdingsAffected.forEach((value, symb) => {
      console.log('v:', value, 's:', symb);
      const subResponse = {
        symbol: symb,
        totalShares: 0,
        averageCostPrice: 0
      };
      let aggregateWeightedPrice = 0;
      for (let i = 0; i < remainingTransactions.length; i += 1) {
        const { symbol, shares, price } = remainingTransactions[i];
        if (symbol === subResponse.symbol) {
          subResponse.totalShares += shares;
          aggregateWeightedPrice += (price * shares);
        }
      }
      // Calculated average cost price
      subResponse.averageCostPrice = aggregateWeightedPrice / subResponse.totalShares;
      // Add subResponse to set
      responseSet.add(subResponse);
    });
    console.log('Turbo boost:', responseSet);
    // Initiate an array for deleting holdings.
    const disappearingHoldings = [];
    // Update Holdings in MongoDB with responseSet
    // For each sub response object in the Set...
    let updateCountDown = responseSet.size;
    responseSet.forEach(holding => {
      if (!holding.totalShares) {
        // Delete the holding
        disappearingHoldings.push(holding.symbol);
      } else {
        updateHolding(holding)
        .then(updateRes => {
          console.log('Updated', holding.symbol, updateRes);
          updateCountDown -= 1;
        })
        .catch(err => {
          console.error('Unable to update', holding.symbol, err);
        });
      }
    });
    if (disappearingHoldings.length) {
      deleteHoldings(disappearingHoldings)
      .then(resDel => {
        console.log('Holdings deleted:', disappearingHoldings, resDel);
      })
      .catch(err => {
        console.error('Error deleting holdings:', err);
      })
    }
    if (!updateCountDown) {
      res.status(200).send({ remainingTransactions, selectedTransactions, responseSet: Array.from(responseSet) });
    } else {
      res.status(400).send({ responseSet: Array.from(responseSet) })
    }
  })
  .catch(err => {
    console.error('Unable to delete transactions from db.', err); // eslint-disable-line no-console
    res.status(500).send('Unable to delete transactions from db.');
  });
});

router.post('/', (req, res) => {
  // Placeholder
  console.log('Transaction body:', req.body);
  const payload = req.body;
  const { symbol, transactiontype, shares, price } = payload;
  // Check if the symbol on the ticket exists in the holdings table already
  getOneHolding(symbol)
  .then(existingHoldingWithSymbol => {
    if (!existingHoldingWithSymbol) {
      console.log(`Holding with symbol ${symbol} does not exist. To call the addNewHolding model method.`);
      return addHolding(payload);
    }

    // Holding exists already so to add/subtract from existing holding
    console.log('existingHoldingWithSymbol:', existingHoldingWithSymbol);
    const updatedPayload = { symbol };
    if (transactiontype === 'Buy') {
      // Add the shares to the existing shares
      const totalShares = existingHoldingWithSymbol.shares + shares;
      const averageCostPrice = ((price * shares) + (existingHoldingWithSymbol.costprice * existingHoldingWithSymbol.shares)) / totalShares;
      updatedPayload.totalShares = totalShares;
      updatedPayload.averageCostPrice = averageCostPrice;
    }

    if (transactiontype === 'Sell') {
      // Subtract the shares from the existing shares
      const totalShares = existingHoldingWithSymbol.shares - shares;
      const averageCostPrice = ((existingHoldingWithSymbol.costprice * existingHoldingWithSymbol.shares) - (price * shares)) / totalShares;
      updatedPayload.totalShares = totalShares;
      updatedPayload.averageCostPrice = averageCostPrice;
    }
    return updateHolding(updatedPayload);
  })
  .then(resFromAddingHolding => {
    console.log('Holding has been added, now to add transaction:', resFromAddingHolding);
    return addTransaction(payload)
  })
  .then(resFromAddingTransaction => {
    console.log('Transaction has been added:', resFromAddingTransaction);
    console.log('Both holding and transaction has been added. Sending back ticket response to the client.');
    res.status(418).send(resFromAddingTransaction);
  })
  .catch(err => {
    console.error('Error adding trade ticket to db.', err); // eslint-disable-line no-console
  });
});

module.exports = router;