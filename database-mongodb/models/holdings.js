const mongoose = require('mongoose');
const Promise = require('bluebird');
const { holdingsSchema } = require('../schema');

// Promise.promisifyAll(mongoose);

const Holdings = mongoose.model('Holdings', holdingsSchema);

// const getAll = callback => {
//   Holdings.find({}, (err, holdings) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, holdings);
//     }
//   });
// };

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

// const getOne = (symbol, callback) => {
//   Holdings.findOne({ symbol }, (err, holding) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, holding);
//     }
//   });
// };

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

// const deleteHoldings = (symbols, callback) => {
//   Holdings.remove({ symbol: { $in: symbols } }, (err, response) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, response);
//     }
//   });
// };

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

module.exports = {
  getAllHoldings,
  getOneHolding,
  deleteHoldings
};