import { createSelector } from "reselect";
import { Map } from "immutable";


//TODO: this will needs to be replaxced by a server endpoint let the server make the calculations
const measurements = state =>
  state.getIn(["dailyLog"]).sortBy(value => value.date);

const constructValues = measurements => {
  // console.log(measurements.reverse());

  let chest = measurements.find(
    value => value.getIn(["measurements", "chest"]) !== undefined
  );

  let weight = measurements.find(
    value => value.getIn(["measurements", "weight"]) !== undefined
  );
  let rightArm = measurements.find(
    value => value.getIn(["measurements", "rightArm"]) !== undefined
  );
  let leftArm = measurements.find(
    value => value.getIn(["measurements", "leftArm"]) !== undefined
  );
  let aboveBelly = measurements.find(
    value => value.getIn(["measurements", "aboveBelly"]) !== undefined
  );
  let belly = measurements.find(
    value => value.getIn(["measurements", "belly"]) !== undefined
  );
  let belowBelly = measurements.find(
    value => value.getIn(["measurements", "belowBelly"]) !== undefined
  );
  let hips = measurements.find(
    value => value.getIn(["measurements", "hips"]) !== undefined
  );
  let rightThigh = measurements.find(
    value => value.getIn(["measurements", "rightThigh"]) !== undefined
  );
  let leftThigh = measurements.find(
    value => value.getIn(["measurements", "leftThigh"]) !== undefined
  );

  // measurements.forEach()

  let chest1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "chest"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let weight1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "weight"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let rightArm1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "rightArm"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let leftArm1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "leftArm"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let aboveBelly1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "aboveBelly"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let belowBelly1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "belowBelly"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let hips1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "hips"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let rightThigh1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "rightThigh"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let leftThigh1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "leftThigh"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  let belly1 = Map().withMutations(map =>
    map
      .set("measurement", chest.getIn(["measurements", "belly"]))
      .set("date", chest.get( "date"))
      .set("_id", chest.get( "_id"))
  );

  return Map().withMutations(map =>
    map
      .set("chest", chest1)
      .set("weight", weight1)
      .set("rightArm", rightArm1)
      .set("leftArm", leftArm1)
      .set("aboveBelly", aboveBelly1)
      .set("hips", hips1)
      .set("belly", belly1)
      .set("belowBelly", belowBelly1)
      .set("rightThigh", rightThigh1)
      .set("leftThigh", leftThigh1)
  );
};

export default createSelector(measurements, constructValues);
