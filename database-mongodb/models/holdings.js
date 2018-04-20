const mongoose = require('mongoose');
// const Promise = require('bluebird');
const { holdingsSchema } = require('../schema');

// Promise.promisifyAll(mongoose);

const Holdings = mongoose.model('Holdings', holdingsSchema);

const getAll = callback => {
  Holdings.find({}, (err, holdings) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, holdings);
    }
  });
};

const getOne = (symbol, callback) => {
  Holdings.findOne({ symbol }, (err, holding) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, holding);
    }
  });
};

const deleteHoldings = (symbols, callback) => {
  Holdings.remove({ symbol: { $in: symbols } }, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
  });
};

module.exports = {
  getAll,
  getOne,
  deleteHoldings
};