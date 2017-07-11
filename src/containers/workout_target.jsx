import React from "react";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  formValues
} from "redux-form/immutable";
import {
  TextField,
  SelectField,
Checkbox,
  Toggle,
  DatePicker
} from "redux-form-material-ui";
import { MenuItem, FlatButton

 } from "material-ui";
import { connect } from "react-redux";

import { createWorkoutTarget } from "./../store/actionCreators/user_details_action_creators";

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
          let workoutTarget = isCycledTraining
            ? { name, type, startDayofTraining, exercises, onEveryxDay }
            : {
                name,
                type,
                exercises,
                onDays: _.filter(
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
                )
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
              floatingLabelText="starting date of the trainging"
              fullWidth={true}
              format={(value, name) => (value === "" ? 0 : value)}
            />
            <Field
              name="onEveryxDay"
              type="number"
              component={TextField}
              fullWidth={true}
              hintText="happens on every x days"
            />
          </div>
        : null}

      {!isCycledTraining
        ? <div  style={{position: 'relative'}}>
            <Field name="monday" label="Monday" component={Checkbox} style={{marginLeft: '47.5%'}} />
            <Field name="tuesday" label="Tuesday" component={Checkbox} style={{marginLeft: '47.5%'}}/>
            <Field name="wednesday" label="Wednesday" component={Checkbox} style={{marginLeft: '47.5%'}}/>
            <Field name="thursday" label="Thursday" component={Checkbox} style={{marginLeft: '47.5%'}}/>
            <Field name="friday" label="Friday" component={Checkbox} style={{marginLeft: '47.5%'}}/>
            <Field name="saturday" label="Saturday" component={Checkbox} style={{marginLeft: '47.5%'}}/>
            <Field name="sunday" label="Sunday" component={Checkbox} style={{marginLeft: '47.5%'}}/>
          </div>
        : null}
        <div style={{ textAlign: 'center'}}>
      <FieldArray
        name="exercises"

        component={({ fields: { map, push, remove } }) => {
          return (
            <div>
              {" "}<FlatButton
                onTouchTap={() => push("")}
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
                      style={{ textAlign: 'center'}}
                    onTouchTap={() => remove(index)}
                    label={`Remove exercise`}
                  />
                </div>
              )}{" "}
            </div>
          );
        }}
      /></div>
    <div style={{ textAlign: 'center'}}>
      <FlatButton  type="submit" label={`Create workout`} />
</div>
  </form>
  </div>;

const mapDispatchToProps = dispatch => ({
  createWorkoutTarget: workoutLog => dispatch(createWorkoutTarget(workoutLog))
});

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: "create-workout-target",
    initialValues: { type: "main", isCycledTraining: false }
  })(formValues("isCycledTraining")(WorkoutTarget))
);
