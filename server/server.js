const express = require('express');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const COOKIE =
  process.env.NODE_ENV === 'production'
    ? process.env.COOKIE
    : require('./../config/config.json').dev.COOKIE;

const PORT = process.env.NODE_ENV === 'development' ? 3050 : process.env.PORT;

//TODO: error codes
//TODO: validation middleware
//TODO: tests
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./models/user')(mongoose);
require('./models/daily_log')(mongoose);
require('./models/calorie_target')(mongoose);
require('./models/workout_target')(mongoose);
require('./models/workout_log')(mongoose);
require('./models/calorie_log')(mongoose);
require('./services/passport');
require('./services/mongoose');

require('./routes/auth')(app)(passport);
require('./routes/daily_log')(app);
require('./routes/user_detail')(app);
require('./routes/calorie_target')(app);
require('./routes/workout_target')(app);
require('./routes/workout_log')(app);
require('./routes/calorie_log')(app);

app.use(express.static(path.join(__dirname, '/../build')));

app.get('*', (request, response) => {
  response.redirect('/');
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
