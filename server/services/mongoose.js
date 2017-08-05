const mongoose = require('mongoose');
const { dev: { mongodb } } = require('./../../config/config.json');

mongoose.Promise = global.Promise;

mongoose.connect(mongodb);
