const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.NODE_ENV === 'production'
    ? process.env.mongodb
    : require('./../../config/config.json').dev.mongodb
);
