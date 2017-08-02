import React from 'react';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

const ProteinField = () =>
  <Field
    name="protein"
    fullWidth={true}
    floatingLabelText="Enter your protein intake g/lbm (kg)"
    component={TextField}
    type="number"
    min={0}
    max={5}
    step={0.1}
  />;

export default ProteinField;
