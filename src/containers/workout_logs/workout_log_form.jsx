import React, { Component } from 'react';
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
import { List, Map } from 'immutable';

import {
  createWorkoutLog,
  updateWorkoutLog
} from './../../store/actionCreators/workout_log_action_creators';
import ExerciseFieldArray from './../../components/exercies_field_array';

class WorkoutLogFormContainer extends Component {
  componentDidMount() {
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
    // if (this.props.type !== 'createBefore')
    //   this.props.change('exercises', this.props.defaultValue);
  }

  _disableThese = disabledDates => date =>
    _.find(disabledDates, disabledDate =>
      moment(disabledDate).isSame(date, 'day')
    )
      ? true
      : false;

  render() {
    let { createWorkoutLog, handleSubmit, updateWorkoutLog } = this.props;
    console.log('rendered')
    // console.log(this.props.exercises.toJS())
    return (
      <div>
        <form
          onSubmit={handleSubmit(formprops => {
            // this.props.type === 'edit'
            //   ? updateWorkoutLog({
            //       exercises: formprops.get('exercises').toJS(),
            //       _id: this.props.match.params.id
            //     })
            //   : createWorkoutLog({
            //       exercises: formprops.get('exercises').toJS(),
            //       date: formprops.get('date').valueOf()
            //     });
            //
                console.log(formprops.toJS())
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
                          this.props.datesWithWorkoutLogs.toJS()
                        )}
                      />}
                  />{' '}
                </div>
              : null}

            <FieldArray
              name="exercises"
              component={ExerciseFieldArray}
            />
            <FlatButton
              type="submit"
              label={this.props.match.params.id ? 'modify' : 'create'}
            />
          </div>
        </form>
      </div>
    );
  }
}


{/* <FieldArray
  name="exercises"
  component={ExerciseFieldArray}
  stuff = {this.props.exercises}
/> */}

      // values={this.props.exercises ? this.props.exercises.toJS() :  []}
// const selector = formValueSelector('workoutLog');

//TODO own props needs to be moved to the bottom connect
// WorkoutLogFormContainer = connect(state => ({
//   exercise1s: selector(state, 'exercises') || List()
// }))(WorkoutLogFormContainer);

// export default connect(
//   state => ({
//     datesWithWorkoutLogs: state.getIn(['workoutLogs', 'dates'])
//   }),
//   dispatch => ({
//     createWorkoutLog: workoutLog => dispatch(createWorkoutLog(workoutLog)),
//     updateWorkoutLog: workoutLog => dispatch(updateWorkoutLog(workoutLog))
//   })
// )(
//   reduxForm({
//     form: 'workoutLog'
//   })(WorkoutLogFormContainer)
// );
//
// const f = formValueSelector('workoutLog');

// WorkoutLogFormContainer = connect (state => ({
//
//   // exercises: f(state,'exercises') ? f(state,'exercises').map(value => value.get('marker')) : Map()
// exercises: getFormValues('workoutLog')(state) ? getFormValues('workoutLog')(state).map(value => value.get('marker')) : Map()
// }))(WorkoutLogFormContainer)

export default connect(
  state => ({
    datesWithWorkoutLogs: state.getIn(['workoutLogs', 'dates'])
    // ,
    // exercises: getFormValues('workoutLog')(state) ? getFormValues('workoutLog')(state).get('exercises').map(value => value.get('marker')) : Map()
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

formValues('exercises')(WorkoutLogFormContainer)
