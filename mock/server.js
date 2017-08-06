const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const _ = require('lodash');

const {
  workoutLogs,
  workoutLogDates,
  workoutTargets,
  latestMeasurements,
  userDetails,
  kcalTargets,
  auth,
  dailyLogs,
  dailyLogDates
} = require('./../shared/test_constants');

const app = express();

app.use(bodyParser.json());

app.use(cors(corsConfig));

app.post('/api/login', (request, response) => {
  console.log('Endpoint /api/logIn reached with body: ', request.body);

  let { email, password } = request.body;

  if (!email || !password) return response.status(422).send({ error: '' });

  return response
    .set('x-auth', auth.token)
    .status(200)
    .send(_.omit(auth, ['token']));
});

app.get('/api/workoutlogs/dates', (request, response) => {
  return response.status(200).send(workoutLogDates);
});

app.get('/api/userdetails', (request, response) => {
  return response.status(200).send(userDetails);
});

app.get('/api/workouttargets', (request, response) => {
  return response.status(200).send(workoutTargets);
});

app.delete('/api/workouttargets/:id', (request, response) => {
  return response
    .status(200)
    .send(_.find(workoutTargets, value => value._id === request.params.id));
});

app.get('/api/latestmeasurements', (request, response) => {
  return response.status(200).send(latestMeasurements);
});

app.post('/api/workouttargets', (request, response) => {
  let workoutTarget = request.body;
  workoutTarget._id = `${Math.random()}_workout_target`;

  response.status(200).send(workoutTarget);
});

app.put('/api/userdetails', (request, response) => {
  return response.status(200).send(request.body);
});

app.get('/api/kcaltargets', (request, response) => {
  return response.status(200).send(kcalTargets);
});

app.post('/api/kcaltargets', (request, response) => {
  console.log('ENDPOINT REACHED : KCALTARGET POST', request.body);
  const { rest, training } = request.body;

  const sendBack = {
    _id: `${Math.random()}_kcal_target`,
    startDate: moment(),
    endDate: undefined,
    isLatest: true,
    rest,
    training
  };

  const newTargets = _.map(_.cloneDeep(kcalTargets), target => {
    target.isLatest = false;
    return target;
  })
  return response.status(201).send([...newTargets, sendBack]);
});

app.post('/api/dailylogs', (request, response) => {
  console.log('Endpoint POST /api/dailylogs reached with body: ', request.body);
  let dailyLog = request.body;
  dailyLog._id = `${Math.random()}_daily_log`;
  dailyLog.date = dailyLog.date ? dailyLog.date : moment();
  return response.status(201).send(dailyLog);
});

app.get('/api/dailylogs', (request, response) => {
  console.log(
    'Endpoint GET /api/dailylogs reached with query: ',
    request.query.month
  );

  return response.status(200).send(dailyLogs);
});

app.get('/api/dailylogs/dates', (request, response) => {
  console.log('Endpoint GET /api/dailylogs/dates reached');

  return response.status(200).send(dailyLogDates);
});

app.post('/api/workoutlogs', (request, response) => {
  console.log(
    'Endpoint POST /api/workoutlogs reached with body: ',
    request.body
  );
  let { exercises, date } = request.body;
  exercises = _.map(exercises, exex => {
    return {
      name: exex.name,
      note: exex.note,
      marker: false,
      sets: exex.sets
    };
  });
  let workoutLog = {
    _id: ` ${Math.random()}_workout_log `,
    date: date ? date : moment(),
    exercises
  };
  return response.status(201).send(workoutLog);
});

app.delete('/api/workoutlogs/:id', (request, response) => {
  console.log();
  return response
    .status(200)
    .send(_.find(workoutLogs, log => log._id === request.params.id));
});

app.delete('/api/dailylogs/:id', (request, response) => {
  console.log();
  return response
    .status(200)
    .send(_.find(dailyLogs, log => log._id === request.params.id));
});

app.put('/api/workoutlogs', (request, response) => {
  console.log('Endpoint /api/workoutlogs reached with body: ', request.body);
  return response.status(200).send(request.body);
});

app.get('/api/workoutlogs', (request, response) => {
  console.log(
    'Endpoint GET: /api/workoutlogs reached with query[month]: ',
    request.query.month
  );

  return response.status(200).send(workoutLogs);
});

app.post('/api/signup', (request, response) => {
  console.log('Endpoint /api/logIn reached with body: ', request.body);

  let { email, password, name, userName } = request.body;

  if (!email || !password || !name || !userName)
    return response.status(422).send({ error: '' });

  if (email === `endre@mail.com` && password && name) {
    let name = 'Endre';
    let email = 'endre@mail.com';
    let _id = '34575756';
    let token = 'jinlefno239484';
    return response.set('x-auth', token).status(201).send({ name, email, _id });
  }
  return response.status(401).send({ error: '' });
});

app.listen(4000, () => {
  console.log('Mockserver started on port: 4000');
});
