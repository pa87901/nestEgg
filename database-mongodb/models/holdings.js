const mongoose = require('mongoose');
const Promise = require('bluebird');
const { holdingsSchema } = require('../schema');

// Promise.promisifyAll(mongoose);

const Holdings = mongoose.model('Holdings', holdingsSchema);

const getAllHoldings = () => (
  new Promise((resolve, reject) => {
    Holdings.find({}, (err, holdings) => {
      if (err) {
        reject(err);
      } else {
        resolve(holdings);
      }
    });
  })
);

const getOneHolding = symbol => (
  new Promise((resolve, reject) => {
    Holdings.findOne({ symbol }, (err, holding) => {
      if (err) {
        reject(err);
      } else {
        resolve(holding);
      }
    });
  })
);

const deleteHoldings = symbols => (
  new Promise((resolve, reject) => {
    Holdings.remove({ symbol: { $in: symbols } }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  })
);

const addHolding = ticket => {
  console.log('Received ticket to enter brand new holding:', ticket);
  const { symbol, transactiontype, price } = ticket;
  let { shares } = ticket;
  shares = transactiontype === 'Buy' ? shares : -shares;
  return new Promise((resolve, reject) => {
    Holdings.create({
      name: symbol,
      symbol,
      lastprice: price,
      currentprice: price,
      shares,
      costprice: price
    }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

const updateHolding = payload => {
  const { symbol, totalShares, averageCostPrice } = payload;
  return new Promise((resolve, reject) => {
    Holdings.update(
      { symbol },
      { $set: { shares: totalShares, costprice: averageCostPrice } },
      (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      }
    );
  });
};


module.exports = {
  getAllHoldings,
  getOneHolding,
  deleteHoldings,
  addHolding,
  updateHolding
};