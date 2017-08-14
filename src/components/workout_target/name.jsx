import React from 'react';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

const Name = ({ validateWorkoutName }) =>
  <div>
    <Field
      name="name"
      floatingLabelText="Workout name"
      hintText="name"
      type="text"
      component={TextField}
      fullWidth={true}
      validate={validateWorkoutName}
    />
  </div>;

export default Name;
