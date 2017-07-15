import React from "react";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  formValues,
  SubmissionError
} from "redux-form/immutable";
import {
  TextField,
  SelectField,
  Checkbox,
  DatePicker
} from "redux-form-material-ui";
import { MenuItem, FlatButton } from "material-ui";
import { connect } from "react-redux";

import { required } from "./../services/validators";
import { createWorkoutTarget } from "./../store/actionCreators/user_details_action_creators";

//TODO should be able to delete and edit  workouttargers
const WorkoutTarget = ({
  handleSubmit,
  isCycledTraining,
  createWorkoutTarget,
  reset
}) =>
  <div>
    <form
      onSubmit={handleSubmit(
        ({
          isCycledTraining,
          onEveryxDay,
          name,
          type,
          startDayofTraining,
          exercises,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday
        }) => {
          let onDays = _.filter(
            [
              monday ? 1 : undefined,
              tuesday ? 2 : undefined,
              wednesday ? 3 : undefined,
              thursday ? 4 : undefined,
              friday ? 5 : undefined,
              saturday ? 6 : undefined,
              sunday ? 7 : undefined
            ],
            item => item !== undefined
          );

          if (!isCycledTraining && _.isEmpty(onDays)) {
            throw new SubmissionError({
              isCycledTraining:
                "on fixed days you must select at least one day",
              _error: "days"
            });
          }

          if (isCycledTraining && (!startDayofTraining || !onEveryxDay))
            throw new SubmissionError({
              isCycledTraining:
                "on cycled training you must set the starting date and on which days the training should occur",
              _error: "exercise name"
            });
          if (_.isEmpty(exercises) || _.every(exercises, exercise => !exercise))
            throw new SubmissionError({
              isCycledTraining: "you must provide at least one valid exercise",
              _error: "exercise name"
            });

          let workoutTarget = isCycledTraining
            ? { name, type, startDayofTraining, exercises, onEveryxDay }
            : {
                name,
                type,
                exercises,
                onDays
              };
          createWorkoutTarget(workoutTarget);
          reset();
        }
      )}
    >
      <div>
        <Field
          name="isCycledTraining"
          component={SelectField}
          fullWidth={true}
          floatingLabelText="Training type: should it happen on fixed days like every monday or rather on every for example 5 days?"
        >
          <MenuItem value={true} primaryText="Cycled training" />
          <MenuItem value={false} primaryText="On fixed days" />
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
          validate={required("workout must have a name")}
        />
      </div>
      <div>
        <Field
          name="type"
          component={SelectField}
          value="main"
          fullWidth={true}
          floatingLabelText="Will it be on a training day or a rest day?"
        >
          <MenuItem value="main" primaryText="Main" />
          <MenuItem value="rest" primaryText="Rest" />
        </Field>
      </div>
      {isCycledTraining
        ? <div>
            <Field
              name="startDayofTraining"
              component={DatePicker}
              floatingLabelText="starting date of the training"
              fullWidth={true}
              format={(value, name) => (value === "" ? 0 : value)}
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

      {!isCycledTraining
        ? <div style={{ position: "relative" }}>
            <Field
              name="monday"
              label="Monday"
              component={Checkbox}
              style={{ float: "left", width: "15%" }}
            />
            <Field
              name="tuesday"
              label="Tuesday"
              component={Checkbox}
              style={{ float: "left", width: "15%" }}
            />
            <Field
              name="wednesday"
              label="Wednesday"
              component={Checkbox}
              style={{ float: "left", width: "15%" }}
            />
            <Field
              name="thursday"
              label="Thursday"
              component={Checkbox}
              style={{ float: "left", width: "15%" }}
            />
            <Field
              name="friday"
              label="Friday"
              component={Checkbox}
              style={{ float: "left", width: "15%" }}
            />
            <Field
              name="saturday"
              label="Saturday"
              component={Checkbox}
              style={{ float: "left", width: "15%" }}
            />
            <Field
              name="sunday"
              label="Sunday"
              component={Checkbox}
              style={{ float: "right", width: "10%" }}
            />
            <div style={{ clear: "both" }} />
          </div>
        : null}
      <div style={{ textAlign: "center" }}>
        <FieldArray
          name="exercises"
          component={({ fields: { map, push, remove } }) => {
            return (
              <div>
                {" "}<FlatButton
                  onTouchTap={() => push(null)}
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
                    />
                    <FlatButton
                      style={{ textAlign: "center" }}
                      onTouchTap={() => remove(index)}
                      label={`Remove exercise`}
                    />
                  </div>
                )}{" "}
              </div>
            );
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <FlatButton type="submit" label={`Create workout`} />
      </div>
    </form>
  </div>;

const mapDispatchToProps = dispatch => ({
  createWorkoutTarget: workoutLog => dispatch(createWorkoutTarget(workoutLog))
});

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: "create-workout-target",
    shouldValidate: () => true,
    initialValues: { type: "main", isCycledTraining: false }
  })(formValues("isCycledTraining")(WorkoutTarget))
);
