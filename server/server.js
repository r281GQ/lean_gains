const express = require('express');
const passport = require('passport');
const path = require('path');
const { dev: { cookie } } = require('./../config/config.json');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const app = express();

//1. cookiesession
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookie]
  })
);

//2. init
app.use(passport.initialize());
//3. session
app.use(passport.session());

require('./models/user')(mongoose);
require('./models/daily_log')(mongoose);
require('./services/passport');
require('./services/mongoose');

//4. routes
require('./routes/auth')(app)(passport);

app.use(express.static(path.join(__dirname, '/../build')));

app.listen(3050, () => {
  console.log('Server started on port: 3050');
});
