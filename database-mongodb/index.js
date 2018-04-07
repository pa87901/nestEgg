const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/nestegg");

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.on('open', () => {
  console.log('mongoose connected successfully');
});