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
      _id: 0,
      type: "main",
      startDayofTraining: undefined,
      onEveryxDay: undefined,
      onDays: [1],
      exercises: ["deadlift"]
    },
    {
      _id: 4,
      type: "main",
      startDayofTraining: moment("05-05-2017", "DD-MM-YYYY"),
      onEveryxDay: 4,
      onDays: [],
      exercises: ["bench"]
    }
  ];

  response.status(200).send(targets);
});

app.get("/api/kcaltargets", (request, response) => {
  let targets = [{
    _id: 'sdf7sdfsd',
    startDate: moment("05-05-2017", "DD-MM-YYYY"),
    endDate: undefined,
    isLatest: true,
    isCycling: true,
    flat: {
      kcal: 3000,
      protein: 100,
      carbohydrate: 130,
      fat: 60,
      fiber: 20
    },
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
  }];
  response.status(200).send(targets);
});

app.get("/api/measurements", (request, response) => {});

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
  console.log("Server started on port: 4000");
});
