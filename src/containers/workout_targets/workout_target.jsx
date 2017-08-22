import React, { PureComponent } from 'react';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { reduxForm, formValues, SubmissionError } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { required } from './../../services/validators';
import { Map } from 'immutable';
import * as _ from 'lodash'

import {
  createWorkoutTarget,
  updateWorkoutTarget
} from './../../store/actionCreators/user_details_action_creators';
import WorkoutTargetForm from './../../components/workout_target/workout_target_form';

// TODO: div class wrogn on createform
class WorkoutTarget extends PureComponent {
  componentDidMount() {
    const { defaultValue, initialize } = this.props;
    if (defaultValue) {
      initialize(
        defaultValue.withMutations(map =>
          map
            .update('startDayofTraining', value => moment(value).toDate())
            .set(
              'monday',
              defaultValue.get('onDays').find(value => value === 1)
            )
            .set(
              'tuesday',
              defaultValue.get('onDays').find(value => value === 2)
            )
            .set(
              'wednesday',
              defaultValue.get('onDays').find(value => value === 3)
            )
            .set(
              'thursday',
              defaultValue.get('onDays').find(value => value === 4)
            )
            .set(
              'friday',
              defaultValue.get('onDays').find(value => value === 5)
            )
            .set(
              'saturday',
              defaultValue.get('onDays').find(value => value === 6)
            )
            .set(
              'sunday',
              defaultValue.get('onDays').find(value => value === 7)
            )
        )
      );
    } else {
      initialize(Map().set('type', 'main'));
    }
  }

  render() {
    const {
      match,
      handleSubmit,
      isCycledTraining,
      createWorkoutTarget,
      updateWorkoutTarget,
      reset
    } = this.props;
    return (
      <WorkoutTargetForm
        isCycledTraining = {isCycledTraining}
        formatDate={value => (value === '' ? 0 : value)}
        validateWorkoutName={required('Workout must have a name!')}
        submitHandler={handleSubmit(formProps => {
          const onDays = _.filter(
            [
              formProps.get('monday') ? 1 : undefined,
              formProps.get('tuesday') ? 2 : undefined,
              formProps.get('wednesday') ? 3 : undefined,
              formProps.get('thursday') ? 4 : undefined,
              formProps.get('friday') ? 5 : undefined,
              formProps.get('saturday') ? 6 : undefined,
              formProps.get('sunday') ? 7 : undefined
            ],
            item => item !== undefined
          );

          if (
            formProps.get('isCycledTraining') === 'fix' &&
            _.isEmpty(onDays)
          ) {
            throw new SubmissionError({
              isCycledTraining:
                'on fixed days you must select at least one day',
              _error: 'days'
            });
          }

          if (
            formProps.get('isCycledTraining') === 'cycle' &&
            (!formProps.get('startDayofTraining') ||
              !formProps.get('onEveryxDay'))
          )
            throw new SubmissionError({
              isCycledTraining:
                'On cycled training you must set the starting date and on which days the training should occur!',
              _error: 'exercise name'
            });

          if (
            typeof formProps.get('exercises') === 'undefined' ||
            formProps.get('exercises').isEmpty() ||
            formProps.get('exercises').every(exercise => !exercise)
          )
            throw new SubmissionError({
              isCycledTraining: 'You must provide at least one valid exercise!',
              _error: 'exercise name'
            });



          match.params.id
            ? updateWorkoutTarget({
                ...formProps.toJS(),
                startDayofTraining: moment(
                  formProps.get('startDayofTraining')
                ).valueOf(),
                onDays,
                _id: match.params.id
              })
            : createWorkoutTarget({
                ...formProps.toJS(),
                startDayofTraining: moment(
                  formProps.get('startDayofTraining')
                ).valueOf(),
                onDays: formProps.get('isCycledTraining') === 'fix' ?  onDays : []
              });

          reset();
        })}
      />
    );
  }
}


WorkoutTarget.propTypes = {
  defaultValue: ImmutablePropTypes.map,
  updateWorkoutTarget: PropTypes.func.isRequired,
  createWorkoutTarget: PropTypes.func.isRequired,
  isCycledTraining: PropTypes.oneOf(['fix' , 'cycle'])
}

export default connect(null, { createWorkoutTarget, updateWorkoutTarget })(
  reduxForm({
    form: 'workout-target'
  })(formValues('isCycledTraining')(WorkoutTarget))
);
