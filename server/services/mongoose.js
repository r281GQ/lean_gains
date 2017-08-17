const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.NODE_ENV === 'development'
    ? require('./../../config/config.json').dev.MONGOURI
    : process.env.MONGOURI
);
