import Immutable, { fromJS } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';

import workoutlog from './../../../src/store/reducers/workout_log';
import {
  WRITE_WORKOUT_LOG,
  WRITE_WORKOUT_LOGS
} from './../../../src/store/actions/workout_log_actions';
let workoutlogs = [
  {
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
            kg: 5465
          }
        ]
      }
    ]
  },

  {
    _id: '4dghrt',
    date: moment(),
    exercises: [
      {
        name: 'sqau',
        _id: 'sdefsd',
        sets: [
          {
            _id: 'sdfsd',
            reps: 5,
            kg: 5465
          }
        ]
      }
    ]
  }
];

chai.use(chaiImmutable);

describe('description', () => {
  it('should get back the workoutlog', () => {
    const nextState = workoutlog(undefined, {
      type: WRITE_WORKOUT_LOGS,
      payload: workoutlogs
    });
    console.log(nextState.get('rereter'));
    expect(nextState.get('data')).to.include.keys('rereter', '4dghrt');
  });
});
