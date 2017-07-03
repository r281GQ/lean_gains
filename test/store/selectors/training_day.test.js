import Immutable, { fromJS, toJS, Set, List, Map } from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";
import moment from "moment";

import todayExercises from "./../../../src/store/selectors/training_day";
import userDetails, {
  INITIAL_STATE
} from "./../../../src/store/reducers/user_details";
chai.use(chaiImmutable);

// const currentWorkoutPlan = state =>
//   state.getIn(["workoutTargets"]).filter(value => value.get("type") === "main");

describe("description", () => {


  let mockState= Map().set('userDetails', INITIAL_STATE);

  it('description1111', () => {
    const exercises = todayExercises(mockState);
    expect(exercises).to.include('squat', 'dead');
    console.log(exercises);
  });

  // xit("description1", () => {
  //   // console.log(currentWorkoutPlan(INITIAL_STATE));
  //   let h = currentWorkoutPlan(INITIAL_STATE);
  //
  //   let fixeddaytraning = h.filter(
  //     value => value.get("onEveryxDay") === undefined
  //   );
  //
  //   // console.log(fixeddaytraning);
  //   let days = fixeddaytraning.reduce((list, value) => {
  //     // return list.push('value.get(onDays)');
  //     let nu = moment().isoWeekday();
  //
  //     // console.log(value.get('onDays'));
  //     // return list.concat(value.get("onDays"));
  //     return value.get('onDays').includes(nu) ? list.concat(value.get('exercises')) : list;
  //   }, List());
  //
  //
  //
  //   console.log(days);
  // });
  //
  // xit("2", () => {
  //   // console.log(currentWorkoutPlan(INITIAL_STATE));
  //   let h = currentWorkoutPlan(INITIAL_STATE).map(value =>
  //     value.withMutations(value =>
  //       value
  //         .set("onEveryxDay", 3)
  //         .set("startDayofTraining", moment("25-06-2017", "DD-MM-YYYY"))
  //     )
  //   );
  //
  //   let sd = h.setIn(['2', 'onEveryxDay'], 2);
  //
  //   let reduced = sd.reduce((reducedValue, value, id ) => {
  //
  //     const currentDay = moment();
  //
  //     const interval =value.get('onEveryxDay');
  //
  //     const start = value.get('startDayofTraining');
  //
  //     const diff = currentDay.diff(start, 'day');
  //     console.log(diff);
  //
  //     const t = diff % interval === 0 ? true: false;
  //
  //     const exrecesis = value.get('exercises');
  //
  //     // return reducedValue.set(id, Map().withMutations(map => map.set('value', t).set('exercises', exrecesis)));
  //     return t?  reducedValue.concat(exrecesis) : reducedValue;
  //
  //   }, List());
  //
  //   let concluded = reduced.isEmpty();
  //
  //   console.log(reduced);
  //
  //   // console.log(reduced);
  //   // console.log(h);
  // });
});
