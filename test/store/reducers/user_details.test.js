import Immutable, { fromJS } from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";
import moment from "moment";

import userDetails, {
  INITIAL_STATE
} from "./../../../src/store/reducers/user_details";
import {
  WRITE_USER_DETAILS,
  WRITE_WORKOUT_TARGET,
  UNSET_PICTURE,
  DELETE_WORKOUT_TARGET
} from "./../../../src/store/actions/user_details_actions";

chai.use(chaiImmutable);

describe("description", () => {
  let stateWithWorkout;

  it("should get back the INITIAL_STATE", () => {
    const nextState = userDetails(undefined, {
      type: "nonexisting action type"
    });
    expect(nextState).to.equal(INITIAL_STATE);
  });

  it("should write the basic info the the userDetals", () => {
    const nextState = userDetails(undefined, {
      type: WRITE_USER_DETAILS,
      payload: {
        dob: moment('22-05-1988', 'DD-MM-YYYY').valueOf(),
        sex: "male",
        picture: `https://somerandomurl/pictureid`,
        userName: "kfbr392"
      }
    });
    expect(nextState.get("sex")).to.equal("male");
    expect(nextState.get("picture")).to.equal(
      `https://somerandomurl/pictureid`
    );
    expect(nextState.get("dob")).to.equal(
      moment("22-05-1988", "DD-MM-YYYY").valueOf()
    );
    expect(nextState.get("userName")).to.equal("kfbr392");
  });

  it("should write the appropriate values", () => {
    let workout = {
      _id: "someIDfromTheBackend",
      //current timestamp generated derived from the id
      // startDate: moment().valueOf(),
      //genratied by the backend, if it is latest then is undefinf
      // endDate: undefined,
      // isLatest: true,
      type: "main",
      startDayofTraining: moment(),
      onEveryxDay: undefined,
      onDays: [1, 3, 5],
      exercises: ["deadlift", "military press"]
    };

    const nextState = userDetails(undefined, {
      type: WRITE_WORKOUT_TARGET,
      payload: workout
    });

    stateWithWorkout = nextState;

    expect(nextState.getIn(["workoutTargets", workout._id])).to.equal(
      fromJS(workout)
    );
  });

  describe("with some basic state", () => {
    let basicState;
    beforeEach(() => {
      const nextState = userDetails(undefined, {
        type: WRITE_USER_DETAILS,
        payload: {
          dob: "22-05-1988",
          sex: "male",
          picture: `https://somerandomurl/pictureid`,
          userName: "kfbr392"
        }
      });
      basicState = nextState;
    });

    it("should remove set the picture to undefined on UNSET_PICTURE", () => {
      const nextState = userDetails(basicState, { type: UNSET_PICTURE });
      expect(nextState.get("picture")).to.be.undefined;
      // expect(nextState.get("picture")).to.equal('sdfsdfsd');
    });

    it("should remove workoutTarget", () => {
      let payload = stateWithWorkout
        .get("workoutTargets")
        .findKey(value => true);

      const nextState = userDetails(stateWithWorkout, {
        type: DELETE_WORKOUT_TARGET,
        payload
      });

      expect(nextState.getIn(["workoutTargets", payload])).to.be.undefined;
    });
  });
});
