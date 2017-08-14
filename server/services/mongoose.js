const mongoose = require('mongoose');
const { dev: { mongodb } } = require('./../../config/config.json');

const env = process.env;

mongoose.Promise = global.Promise;

mongoose.connect(mongodb || env.mongodb);
