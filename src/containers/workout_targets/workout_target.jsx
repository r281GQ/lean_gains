import React, { Component } from 'react';
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  formValues,
  SubmissionError
} from 'redux-form/immutable';
import {
  TextField,
  SelectField,
  Checkbox,
  DatePicker
} from 'redux-form-material-ui';
import { MenuItem, FlatButton } from 'material-ui';
import { connect } from 'react-redux';
import moment from 'moment';
import { required } from './../../services/validators';
import { fromJS } from 'immutable';
import {
  createWorkoutTarget,
  updateWorkoutTarget
} from './../../store/actionCreators/user_details_action_creators';

class WorkoutTarget extends Component {
  componentDidMount() {
    if (this.props.defaultValue) {
      const { defaultValue } = this.props;
      this.props.change('name', defaultValue.get('name'));
      this.props.change('type', defaultValue.get('type'));
      this.props.change('exercises', defaultValue.get('exercises'));
      this.props.change(
        'isCycledTraining',
        defaultValue.get('isCycledTraining')
      );
      // this.props.change(
      //   'isCycledTraining',
      //   defaultValue.get('onDays') ? 'fix' : 'cycle'
      // );
      if (defaultValue.get('isCycledTraining') === 'fix') {
        this.props.change(
          'monday',
          defaultValue.get('onDays').find(value => value === 1)
        );
        this.props.change(
          'tuesday',
          defaultValue.get('onDays').find(value => value === 2)
        );
        this.props.change(
          'wednesday',
          defaultValue.get('onDays').find(value => value === 3)
        );
        this.props.change(
          'thursday',
          defaultValue.get('onDays').find(value => value === 4)
        );
        this.props.change(
          'friday',
          defaultValue.get('onDays').find(value => value === 5)
        );
        this.props.change(
          'saturday',
          defaultValue.get('onDays').find(value => value === 6)
        );
        this.props.change(
          'sunday',
          defaultValue.get('onDays').find(value => value === 7)
        );
      } else {
        this.props.change('onEveryxDay', defaultValue.get('onEveryxDay'));
        this.props.change(
          'startDayofTraining',
          moment(defaultValue.get('startDayofTraining')).toDate()
        );
      }
    }
  }
  // onSubmit={handleSubmit(
  //   ({
  //     isCycledTraining,
  //     onEveryxDay,
  //     name,
  //     type,
  //     startDayofTraining,
  //     exercises,
  //     monday,
  //     tuesday,
  //     wednesday,
  //     thursday,
  //     friday,
  //     saturday,
  //     sunday
  //   }) => {
  //     let onDays = _.filter(
  //       [
  //         monday ? 1 : undefined,
  //         tuesday ? 2 : undefined,
  //         wednesday ? 3 : undefined,
  //         thursday ? 4 : undefined,
  //         friday ? 5 : undefined,
  //         saturday ? 6 : undefined,
  //         sunday ? 7 : undefined
  //       ],
  //       item => item !== undefined
  //     );
  //
  //
  //     if (isCycledTraining === 'fix' && _.isEmpty(onDays)) {
  //       throw new SubmissionError({
  //         isCycledTraining:
  //           'on fixed days you must select at least one day',
  //         _error: 'days'
  //       });
  //     }
  //
  //     if (isCycledTraining === 'cycle' && (!startDayofTraining || !onEveryxDay))
  //       throw new SubmissionError({
  //         isCycledTraining:
  //           'on cycled training you must set the starting date and on which days the training should occur',
  //         _error: 'exercise name'
  //       });
  //     if (
  //       _.isEmpty(exercises) ||
  //       _.every(exercises, exercise => !exercise)
  //     )
  //       throw new SubmissionError({
  //         isCycledTraining:
  //           'you must provide at least one valid exercise',
  //         _error: 'exercise name'
  //       });
  //
  //     let workoutTarget = isCycledTraining === 'cycle'
  //       ? { name, type, startDayofTraining, exercises, onEveryxDay }
  //       : {
  //           name,
  //           type,
  //           exercises,
  //           onDays
  //         };
  //     createWorkoutTarget(workoutTarget);
  //     reset();
  //   }
  // )}

  render() {
    const {
      handleSubmit,
      isCycledTraining,
      createWorkoutTarget,
      updateWorkoutTarget,
      reset
    } = this.props;
    console.log('rendered');
    return (
      <div>
        <form
          onSubmit={handleSubmit(formProps => {
            let onDays = _.filter(
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
            let isCycledTraining = formProps.get('isCycledTraining');

            let onEveryxDay = formProps.get('onEveryxDay');
            let name = formProps.get('name');
            let type = formProps.get('type');
            let startDayofTraining = formProps.get('startDayofTraining');

            if (isCycledTraining === 'fix' && _.isEmpty(onDays)) {
              throw new SubmissionError({
                isCycledTraining:
                  'on fixed days you must select at least one day',
                _error: 'days'
              });
            }

            if (
              isCycledTraining === 'cycle' &&
              (!startDayofTraining || !onEveryxDay)
            )
              throw new SubmissionError({
                isCycledTraining:
                  'on cycled training you must set the starting date and on which days the training should occur',
                _error: 'exercise name'
              });
            if (
              typeof formProps.get('exercises') === 'undefined' ||
              _.isEmpty(formProps.get('exercises').toJS()) ||
              _.every(formProps.get('exercises').toJS(), exercise => !exercise)
            )
              throw new SubmissionError({
                isCycledTraining:
                  'you must provide at least one valid exercise',
                _error: 'exercise name'
              });
            let exercises = formProps.get('exercises').toJS();
            // let workoutTarget = isCycledTraining === 'cycle'
            //   ? {isCycledTraining, name, type, startDayofTraining, exercises, onEveryxDay, onDays }
            //   : {
            //     isCycledTraining,
            //       name,
            //       type,
            //       exercises,
            //       onDays
            //     };

            let workoutTarget = {
              isCycledTraining,
              name,
              type,
              startDayofTraining: moment(startDayofTraining).valueOf(),
              exercises,
              onEveryxDay,
              onDays
            };
            this.props.match.params.id
              ? updateWorkoutTarget(
                  Object.assign(workoutTarget, {
                    _id: this.props.match.params.id
                  })
                )
              : createWorkoutTarget(workoutTarget);
            reset();
          })}
        >
          <div>
            <Field
              name="isCycledTraining"
              component={SelectField}
              fullWidth={true}
              floatingLabelText="Training type: should it happen on fixed days like every monday or rather on every for example 5 days?"
            >
              <MenuItem value="cycle" primaryText="Cycled training" />
              <MenuItem value="fix" primaryText="On fixed days" />
            </Field>
          </div>
          <div>
            <Field
              name="name"
              floatingLabelText="Workout name"
              hintText="name"
              type="text"
              component={TextField}
              fullWidth={true}
              validate={required('workout must have a name')}
            />
          </div>
          <div>
            <Field
              name="type"
              component={SelectField}
              fullWidth={true}
              floatingLabelText="Will it be on a training day or a rest day?"
            >
              <MenuItem value="main" primaryText="Main" />
              <MenuItem value="rest" primaryText="Rest" />
            </Field>
          </div>
          {isCycledTraining === 'cycle'
            ? <div>
                <Field
                  name="startDayofTraining"
                  component={DatePicker}
                  floatingLabelText="starting date of the training"
                  fullWidth={true}
                  format={(value, name) => (value === '' ? 0 : value)}
                />
                <Field
                  name="onEveryxDay"
                  type="number"
                  component={TextField}
                  fullWidth={true}
                  min={1}
                  hintText="happens on every x days"
                />
              </div>
            : null}

          {isCycledTraining === 'fix'
            ? <div style={{ position: 'relative' }}>
                <Field
                  name="monday"
                  label="Monday"
                  component={Checkbox}
                  style={{ float: 'left', width: '15%' }}
                />
                <Field
                  name="tuesday"
                  label="Tuesday"
                  component={Checkbox}
                  style={{ float: 'left', width: '15%' }}
                />
                <Field
                  name="wednesday"
                  label="Wednesday"
                  component={Checkbox}
                  style={{ float: 'left', width: '15%' }}
                />
                <Field
                  name="thursday"
                  label="Thursday"
                  component={Checkbox}
                  style={{ float: 'left', width: '15%' }}
                />
                <Field
                  name="friday"
                  label="Friday"
                  component={Checkbox}
                  style={{ float: 'left', width: '15%' }}
                />
                <Field
                  name="saturday"
                  label="Saturday"
                  component={Checkbox}
                  style={{ float: 'left', width: '15%' }}
                />
                <Field
                  name="sunday"
                  label="Sunday"
                  component={Checkbox}
                  style={{ float: 'right', width: '10%' }}
                />
                <div style={{ clear: 'both' }} />
              </div>
            : null}
          <div style={{ textAlign: 'center' }}>
            <FieldArray
              name="exercises"
              component={({
                fields: { map, push, remove, insert, length }
              }) => {
                return (
                  <div>
                    {' '}<FlatButton
                      onTouchTap={() => insert(length, '')}
                      label={`Add exercise`}
                    />
                    {map((exec, index) =>
                      <div key={index}>
                        <Field
                          name={exec}
                          floatingLabelText="provide an exercise"
                          hintText="exercise name"
                          component={TextField}
                          type="text"
                          fullWidth={true}
                          value=""
                        />
                        <FlatButton
                          style={{ textAlign: 'center' }}
                          onTouchTap={() => remove(index)}
                          label={`Remove exercise`}
                        />
                      </div>
                    )}{' '}
                  </div>
                );
              }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <FlatButton type="submit" label={`Create workout`} />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createWorkoutTarget: workoutLog => dispatch(createWorkoutTarget(workoutLog)),
  updateWorkoutTarget: workoutLog => dispatch(updateWorkoutTarget(workoutLog))
});

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'create-workout-target',
    shouldValidate: () => true
  })(formValues('isCycledTraining')(WorkoutTarget))
);
