import { createSelector } from "reselect";
import {Map} from 'immutable';

const measurements = state => state.getIn(['userDetails', 'measurements']).sortBy(value => value.date);

const constructValues = measurements => {

  // console.log(measurements.reverse());

  let chest = measurements.find(value => value.get('chest') !== undefined)
  let weight = measurements.find(value => value.get('weight') !== undefined)
  let rightArm = measurements.find(value => value.get('rightArm') !== undefined)
  let leftArm = measurements.find(value => value.get('leftArm') !== undefined)
  let aboveBelly = measurements.find(value => value.get('aboveBelly') !== undefined)
  let belly = measurements.find(value => value.get('belly') !== undefined)
  let belowBelly = measurements.find(value => value.get('belowBelly') !== undefined)
  let hips = measurements.find(value => value.get('hips') !== undefined)
  let rightThigh = measurements.find(value => value.get('rightThigh') !== undefined)
  let leftThigh = measurements.find(value => value.get('leftThigh') !== undefined)

  let cheste =  Map().set('chest', Map().withMutations(map => map.
    set('measurement', chest.get('chest')).
    set('date' , chest.get('date')).
    set('_id', chest.get('_id'))
  ));

  let weight1 =  cheste.set('weight', Map().withMutations(map => map.
    set('measurement', chest.get('weight')).
    set('date' , chest.get('date')).
    set('_id', chest.get('_id'))
  ));


  return weight1;
}

export default createSelector(measurements, constructValues);
