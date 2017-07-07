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
import { MenuItem, FlatButton } from "material-ui";
import { connect } from "react-redux";

const WorkoutTarget = ({ handleSubmit, onEveryXDayFlag }) =>
  <div>
    <form onSubmit={handleSubmit(formprops => console.log(formprops))}>
      <div>
      <Field
        name="onEveryXDayFlag"
        label={`Happens of every x day`}
        component={Toggle}
        labelPosition={"right"}
      />
    </div>
    <div>
      <Field
        name="name"
        hintText="workout name"
        type="text"
        component={TextField}
      />
    </div>
    <div>
      <Field
        name="type"
        component={SelectField}
        value="main"
        floatingLabelText="Frequency"
      >
        <MenuItem value="main" primaryText="Main" />
        <MenuItem value="rest" primaryText="Rest" />
      </Field>
      </div>
      <Field
        name="startDayofTraining"
        disabled={!onEveryXDayFlag}
        component={DatePicker}
        format={(value, name) => (value === "" ? 0 : value)}
      />
      <Field
        name="onEveryxDay"
        disabled={!onEveryXDayFlag}
        type="number"
        component={TextField}
        hintText="happens on every x days"
      />

      <Field
        name="monday"
        label="Monday"
        disabled={onEveryXDayFlag}
        component={Checkbox}
      />
      <Field
        name="tuesday"
        label="Tuesday"
        disabled={onEveryXDayFlag}
        component={Checkbox}
      />
      <Field
        name="wednesday"
        label="Wednesday"
        disabled={onEveryXDayFlag}
        component={Checkbox}
      />
      <Field
        name="thursday"
        label="Thursday"
        disabled={onEveryXDayFlag}
        component={Checkbox}
      />
      <Field
        name="friday"
        label="Friday"
        disabled={onEveryXDayFlag}
        component={Checkbox}
      />
      <Field
        name="saturday"
        label="Saturday"
        disabled={onEveryXDayFlag}
        component={Checkbox}
      />
      <Field
        name="sunday"
        label="Sunday"
        disabled={onEveryXDayFlag}
        component={Checkbox}
      />

      <FieldArray
        name="exec"
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
                  />
                  <FlatButton
                    onTouchTap={() => remove(index)}
                    label={`Remove exercise`}
                  />
                </div>
              )}{" "}
            </div>
          );
        }}
      />
      <FlatButton type="submit" label={`Create workout`} />
    </form>
  </div>;

export default connect()(
  reduxForm({ form: "workouttarget" })(
    formValues("onEveryXDayFlag")(WorkoutTarget)
  )
);
