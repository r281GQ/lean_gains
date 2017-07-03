import Immutable, { fromJS, Map } from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";
import moment from "moment";

import userDetails, {
  INITIAL_STATE
} from "./../../../src/store/reducers/user_details";
import getExercises from "./../../../src/store/selectors/exercises";

chai.use(chaiImmutable);

describe("Exercise selector", () => {
  let mockState = Map().set("userDetails", INITIAL_STATE);

  beforeEach(() => {
    mockState = mockState.withMutations(map =>
      map
        .setIn(
          ["userDetails", "workoutTargets", "0"],
          fromJS({
            type: "main",
            startDayofTraining: moment().subtract(3, "days"),
            onEveryxDay: undefined,
            onDays: [1],
            exercises: ["dead"]
          })
        )
        .setIn(
          ["userDetails", "workoutTargets", "1"],
          fromJS({
            type: "main",
            startDayofTraining: moment().subtract(3, "days"),
            onEveryxDay: undefined,
            onDays: [1],
            exercises: ["squat"]
          })
        )
    );
  });

  it("both are fixed days", () => {
    const exercises = getExercises(mockState);

    expect(exercises).to.include("squat", "dead");
  });

  it("0 is interval and its not training day", () => {
    let modifiedstate = mockState.setIn(
      ["userDetails", "workoutTargets", "0", "onEveryxDay"],
      9
    );

    const exercises = getExercises(modifiedstate);
    expect(exercises).to.include("squat");
    expect(exercises).to.not.include("dead");
  });

  it("0 is interval and it is training day", () => {
    let modifiedstate = mockState.setIn(
      ["userDetails", "workoutTargets", "0", "onEveryxDay"],
      3
    );

    const exercises = getExercises(modifiedstate);
    expect(exercises).to.include("squat");
    expect(exercises).to.include("dead");
  });
});
