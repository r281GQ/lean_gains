import Immutable, { fromJS } from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";
import moment from "moment";

export const INITIAL_STATE = fromJS({
  0: {
    _id: "444",
    date: undefined,
    exercises: [
      {
        name: "sd",
        _id: "",
        sets: [
          {
            _id: "",
            reps: "",
            kg: ""
          }
        ]
      }
    ]
  }
});

import workoutlog, {
} from "./../../../src/store/reducers/workout_log";
import {
  WRITE_WORKOUT_LOG,
  WRITE_WORKOUT_LOGS
} from "./../../../src/store/actions/workout_log";
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
      },

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
      },

    ]
  }
];


chai.use(chaiImmutable);

describe.only("description", () => {
  let stateWithWorkout;

  it("should get back the workoutlog", () => {
    const nextState = workoutlog(INITIAL_STATE, {
      type: WRITE_WORKOUT_LOGS, payload: workoutlogs
    });
    console.log(nextState);
    console.log(nextState.get('rereter'));
    // expect(nextState).to.equal(INITIAL_STATE);
  });
});
