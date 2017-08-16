import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';

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

Name.propTypes = {
  validateWorkoutName: PropTypes.func.isRequired,
};

export default Name;
