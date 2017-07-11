const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();

const corsConfig = {
  origin: "http://localhost:8080",
  allowedHeaders: [
    "Accept-Version",
    "Authorization",
    "Credentials",
    "Content-Type",
    "x-auth"
  ],
  exposedHeaders: ["X-Request-Id", "x-auth"]
};

app.use(bodyParser.json());

app.use(cors(corsConfig));

app.post("/api/logIn", (request, response) => {
  console.log("Endpoint /api/logIn reached with body: ", request.body);

  let { email, password } = request.body;

  if (!email || !password) return response.status(422).send({ error: "" });

  if (email === `endre@mail.com` && password) {
    let name = "Endre";
    let email = "endre@mail.com";
    let _id = "34575756";
    let token = "jinlefno239484";
    return response.set("x-auth", token).status(200).send({ name, email, _id });
  }
  return response.status(401).send({ error: "" });
});

app.get("/api/userdetails", (request, response) => {
  let userDetails = {
    _id: "sdf7asifnsa",
    dob: moment("22-05-1988", "DD-MM-YYYY"),
    gender: "male",
    picture: undefined,
    email: "endre@mail.com",
    username: "kfbr392",
    weightDisplayPreference: "kg",
    lengthDisplayPreference: "m"
  };

  response.status(200).send(userDetails);
});

app.get("/api/workouttargets", (request, response) => {
  let targets = [
    {
      _id: '0workoutTarget',
      type: "main",
      name: 'first',
      onDays: [1],
      exercises: ["deadlift"]
    },
    {
      _id: '1workoutTarget',
      type: "main",
        name: 'second',
      startDayofTraining: moment("05-05-2017", "DD-MM-YYYY"),
      onEveryxDay: 1,
      exercises: ["bench"]
    }
  ];

  response.status(200).send(targets);
});

app.get('/api/latestmeasurements', (request, response)=> {


  const measurements= {
    height: 175,
    neck: 36,
    weight: 67,
    chest: 90,
    rightArm: 40,
    leftArm: 41,
    aboveBelly: 81,
    belly: 82,
    belowBelly: 87,
    hips: 92,
    rightThigh: 50,
    leftThigh: 50
  };
  return response.status(200).send(measurements);

});

app.post("/api/workouttargets", (request, response) => {
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

app.get("/api/kcaltargets", (request, response) => {
  let targets = [
    {
      _id: "sdf7sdfsd",
      startDate: moment("05-05-2017", "DD-MM-YYYY"),
      endDate: undefined,
      isLatest: true,
      isCycling: true,
      rest: {
        kcal: 1000,
        protein: 100,
        carbohydrate: 30,
        fat: 80,
        fiber: 20
      },
      training: {
        kcal: 2100,
        protein: 110,
        carbohydrate: 210,
        fat: 30,
        fiber: 20
      }
    }
  ];
  response.status(200).send(targets);
});

app.post('/api/kcaltarget', (request, response) => {
  console.log('ENDPOINT REACHED : KCALTARGET POST', request.body);
  const {rest, training} = request.body;

  const sendBack = {
    _id: '45645645',
    startDate: moment(),
    endDate: undefined,
    isLatest: true,
    isCycling: true,
    rest,
    training
  }

  let prev =  {
    _id: "4567fgfg",
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
  }
  console.log('PAYLOAF', [prev, sendBack]);
  return response.status(201).send([sendBack, prev]);
})

app.post("/api/dailylogs", (request, response) => {
  console.log("Endpoint POST /api/dailylog reached with body: ", request.body);
  let dailyLog = request.body;
  dailyLog._id = "randomId";
  dailyLog.date = moment();
  return response.status(201).send(dailyLog);
});

// app.get("api/dailylogs/latest", )

app.get("api/dailylogs", (request, response) => {
  console.log("Endpoint GET /api/dailylog reached with body: ", request.query);

  let list = [
    {
      _id: 0,
      date: moment("04-04-2017", "DD-MM-YYYY"),
      macros: {
        protein: 110,
        carbohydrate: 90,
        fat: 60
      },
      measurements: {
        neck: undefined,
        weight: 123,
        chest: undefined,
        rightArm: undefined,
        leftArm: undefined,
        aboveBelly: undefined,
        belly: undefined,
        belowBelly: undefined,
        hips: 45,
        rightThigh: undefined,
        leftThigh: undefined
      },
      sleepIssues: 4,
      stressIssues: 5,
      hungerIssues: 2,
      fatigueLethargy: 1
    },
    {
      _id: 1,
      date: moment("03-05-2017", "DD-MM-YYYY"),
      macros: {
        protein: 103,
        carbohydrate: 30,
        fat: 90
      },
      measurements: {
        neck: undefined,
        weight: 145,
        chest: 23,
        rightArm: undefined,
        leftArm: undefined,
        aboveBelly: undefined,
        belly: undefined,
        belowBelly: undefined,
        hips: undefined,
        rightThigh: undefined,
        leftThigh: undefined
      },
      sleepIssues: 1,
      stressIssues: 2,
      hungerIssues: 3,
      fatigueLethargy: 4
    }
  ];

  return response.status(200).send(list);
});

app.post("/api/workoutlogs", (request, response) => {
  console.log("Endpoint /api/workoutlogs reached with body: ", request.body);
  let h = {
    _id: "rereter",
    date: moment(),
    exercises: [
      {
        name: "dead",
        _id: "sdefsd",
        sets: [
          {
            _id: "sdfsd",
            reps: 5,
            kg: 5465
          }
        ]
      }
    ]
  };
  return response.status(201).send(h);
});

app.delete("/api/workoutlogs/:id", (request, response) => {
  return response.status(200).send({});
});

app.put("/api/workoutlogs", (request, response) => {
  console.log("Endpoint /api/workoutlogs reached with body: ", request.query);
  let h = {
    _id: "rereter",
    date: moment(),
    exercises: [
      {
        name: "dead",
        _id: "sdefsd",
        sets: [
          {
            _id: "sdfsd",
            reps: 5,
            kg: 5465
          }
        ]
      }
    ]
  };
  return response.status(201).send(h);
});

app.get("/api/workoutlogs", (request, response) => {
  console.log("Endpoint /api/workoutlogs reached with body: ", request.query);
  let dailyLog = request.body;
  dailyLog._id = "randomId";

  let workoutlogs = [
    {
      _id: "rereter",
      date: moment(),
      exercises: [
        {
          name: "dead",
          _id: "sdefsd",
          sets: [
            {
              _id: "sdfsd",
              reps: 5,
              kg: 5465
            }
          ]
        }
      ]
    },

    {
      _id: "4dghrt",
      date: moment(),
      exercises: [
        {
          name: "sqau",
          _id: "sdefsd",
          sets: [
            {
              _id: "sdfsd",
              reps: 5,
              kg: 5465
            }
          ]
        }
      ]
    }
  ];
  return response.status(200).send(workoutlogs);
});

app.post("/api/signUp", (request, response) => {
  console.log("Endpoint /api/logIn reached with body: ", request.body);

  let { email, password, name, username } = request.body;

  if (!email || !password || !name || !username)
    return response.status(422).send({ error: "" });

  if (email === `endre@mail.com` && password && name) {
    let name = "Endre";
    let email = "endre@mail.com";
    let _id = "34575756";
    let token = "jinlefno239484";
    return response.set("x-auth", token).status(201).send({ name, email, _id });
  }
  return response.status(401).send({ error: "" });
});

app.listen(4000, () => {
  console.log("Mockserver started on port: 4000");
});
