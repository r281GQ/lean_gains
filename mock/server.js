const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

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

  if(!email || !password) return response.status(422).send({error: ''});

  if (email === `endre@mail.com` && password) {
    let name = "Endre";
    let email = "endre@mail.com";
    let _id = "34575756";
    let token = "jinlefno239484";
    return response.set("x-auth", token).status(200).send({ name, email, _id });
  }
  return response.status(401).send({ error: "" });
});

app.post("/api/signUp", (request, response) => {
  console.log("Endpoint /api/logIn reached with body: ", request.body);

  let { email, password, name, username } = request.body;

  if(!email || !password || !name || !username) return response.status(422).send({error: ''});

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
