import React from 'react';
import { shallow } from 'enzyme';
import {List, Map} from 'immutable'
import {PureWorkoutLogsRouter} from './../../../src/containers/workout_logs/workout_logs_router';

describe('WorkoutLogsRouter test', () => {
  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsRouter/>
    );

    const instance = component.instance();

    const mapped = instance._mapExercisesToCreateForm(List().push('exercise'));

    console.log(mapped);
    expect(mapped).toEqual(List().push(Map().withMutations(map =>
      map
        .set('name',
          'exercise'
        )
        .set('note', '')
        .set('marker', false)
        .set('sets', Map())
    )))
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsRouter
match = {{params: {id: 1}}}
      />
    );

    const instance = component.instance();

    const mapped = instance._mapExercisesToCreateForm(List().push('You do not have any exercise for today'));

    console.log(mapped);
    expect(mapped).toEqual(List().push(Map().withMutations(map =>
      map
        .set('name',
          ''
        )
        .set('note', '')
        .set('marker', false)
        .set('sets', Map())
    )))
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsRouter/>
    );

    const instance = component.instance();

    const mapped = instance._mapExercisesToEditForm(Map().set('1', Map().set('value', 'v')), {match: {params: {id: '1'}}});

    console.log(mapped);
    expect(mapped).toEqual(Map().set('value', 'v'))
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
