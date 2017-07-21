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
//TODO: every time needs to be consisntently converted to timesatamps
const corsConfig = {
  origin: '*',
  allowedHeaders: [
    'Accept-Version',
    'Authorization',
    'Credentials',
    'Content-Type',
    'x-auth'
  ],
  exposedHeaders: ['X-Request-Id', 'x-auth']
};

app.use(bodyParser.json());

app.use(cors(corsConfig));

app.post('/api/logIn', (request, response) => {
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

app.get('/api/latestmeasurements', (request, response) => {
  return response.status(200).send(latestMeasurements);
});

app.post('/api/workouttargets', (request, response) => {
  console.log(request.body);
  let g = request.body;
  g._id = '34564545';
  // let targets = [
  //   {
  //     _id: 0,
  //     type: "main",
  //     startDayofTraining: undefined,
  //     onEveryxDay: undefined,
  //     onDays: [1],
  //     exercises: ["deadlift"]
  //   },
  //   {
  //     _id: 4,
  //     type: "main",
  //     startDayofTraining: moment("05-05-2017", "DD-MM-YYYY"),
  //     onEveryxDay: 4,
  //     onDays: [],
  //     exercises: ["bench"]
  //   }
  // ];

  response.status(200).send(g);
});

app.get('/api/kcaltargets', (request, response) => {
  response.status(200).send(kcalTargets);
});

app.post('/api/kcaltarget', (request, response) => {
  console.log('ENDPOINT REACHED : KCALTARGET POST', request.body);
  const { rest, training } = request.body;

  const sendBack = {
    _id: '45645645',
    startDate: moment(),
    endDate: undefined,
    isLatest: true,
    isCycling: true,
    rest,
    training
  };

  let prev = {
    _id: '4567fgfg',
    startDate: undefined,
    endDate: undefined,
    isLatest: false,
    isCycling: true,
    // flat: {
    //   kcal: 3000,
    //   protein: undefined,
    //   carbohydrate: undefined,
    //   fat: undefined,
    //   fiber: undefined
    // },
    rest: {
      kcal: 1000,
      protein: undefined,
      carbohydrate: undefined,
      fat: undefined
    },
    training: {
      kcal: 2100,
      protein: undefined,
      carbohydrate: undefined,
      fat: undefined
    }
  };
  console.log('PAYLOAF', [prev, sendBack]);
  return response.status(201).send([sendBack, prev]);
});

app.post('/api/dailylogs', (request, response) => {
  console.log('Endpoint POST /api/dailylogs reached with body: ', request.body);
  let dailyLog = request.body;
  dailyLog._id = 'randomId';
  dailyLog.date = moment();
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
  console.log('Endpoint POST /api/workoutlogs reached with body: ', request.body);
  let { exercises } = request.body;
  let exercises1 = _.map(exercises, exex => {
    return {
      name: exex.name,
      note: exex.note,
      marker: false,
      sets: exex.sets
    };
  });
  let h = {
    _id: 'rereter12',
    date: request.body.date ? request.body.date : moment(),
    exercises: exercises1
  };
  return response.status(201).send(h);
});

app.delete('/api/workoutlogs/:id', (request, response) => {
  return response.status(200).send({});
});

app.put('/api/workoutlogs', (request, response) => {
  console.log('Endpoint /api/workoutlogs reached with body: ', request.body);
  let h = {
    _id: 'rereter',
    date: moment(),
    exercises: [
      {
        name: 'dead',
        _id: 'sdefsd',
        sets: [
          {
            _id: 'sdfsd',
            reps: 5,
            weight: 5465
          }
        ]
      }
    ]
  };
  return response.status(200).send(h);
});

app.get('/api/workoutlogs', (request, response) => {
  console.log(
    'Endpoint GET: /api/workoutlogs reached with query[month]: ',
    request.query.month
  );

  return response.status(200).send(workoutLogs);
});

app.post('/api/signUp', (request, response) => {
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
