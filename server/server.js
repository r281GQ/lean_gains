const express = require('express');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const { dev: { cookie } } = require('./../config/config.json');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookie]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./models/user')(mongoose);
require('./models/daily_log')(mongoose);
require('./models/calorie_target')(mongoose);
require('./models/workouttargets')(mongoose);
require('./models/workoutlog')(mongoose);
require('./services/passport');
require('./services/mongoose');

require('./routes/auth')(app)(passport);
require('./routes/models')(app);
require('./routes/user_details')(app);
require('./routes/calorietarget')(app);
require('./routes/workouttargets')(app);
require('./routes/workoutlog')(app);

// app.use(express.static(path.join(__dirname, '/../build')));

app.listen(3050, () => console.log('Server started on port: 3050'));
