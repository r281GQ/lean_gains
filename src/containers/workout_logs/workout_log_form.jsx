import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FlatButton } from 'material-ui';
import { DatePicker } from 'redux-form-material-ui';
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  initialize,
  formValues,
  getFormValues
} from 'redux-form/immutable';
import moment from 'moment';
import { Map } from 'immutable';

import {
  createWorkoutLog,
  updateWorkoutLog
} from './../../store/actionCreators/workout_log_action_creators';
import ExerciseFieldArray from './../../components/exercies_field_array';

class WorkoutLogFormContainer extends PureComponent {
  componentDidMount = () =>
    this.props.dispatch(
      initialize(
        'workoutLog',
        Map().withMutations(map =>
          map
            .set('date', moment().toDate())
            .set('exercises', this.props.defaultValue)
        )
      )
    );

  _disableThese = disableDates => date =>
    disableDates.find(value => moment(value).isSame(date, 'day'))
      ? true
      : false;

  render = () => {
    let { createWorkoutLog, handleSubmit, updateWorkoutLog } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(formprops => {
            console.log(formprops.toJS());
          })}
        >
          <div>
            {this.props.type === 'createBefore'
              ? <div>
                  <Field
                    name="date"
                    component={input =>
                      <DatePicker
                        {...input}
                        maxDate={moment().toDate()}
                        minDate={moment().subtract(110, 'years').toDate()}
                        formatDate={value => moment(value).format('DD-MM-YYYY')}
                        shouldDisableDate={this._disableThese(
                          this.props.datesWithWorkoutLogs
                        )}
                      />}
                  />{' '}
                </div>
              : null}
            <FieldArray
              name="exercises"
              component={ExerciseFieldArray}
              passedMarkerList={this.props.markerList}
            />
            <FlatButton
              type="submit"
              label={this.props.match.params.id ? 'modify' : 'create'}
            />
          </div>
        </form>
      </div>
    );
  };
}

export default connect(
  state => ({
    datesWithWorkoutLogs: state.getIn(['workoutLogs', 'dates']),
    markerList:
      getFormValues('workoutLog')(state) &&
      getFormValues('workoutLog')(state).get('exercises')
        ? getFormValues('workoutLog')(state)
            .get('exercises')
            .map(value => value.get('marker'))
        : Map()
  }),
  dispatch => ({
    createWorkoutLog: workoutLog => dispatch(createWorkoutLog(workoutLog)),
    updateWorkoutLog: workoutLog => dispatch(updateWorkoutLog(workoutLog))
  })
)(
  reduxForm({
    form: 'workoutLog'
  })(WorkoutLogFormContainer)
);
