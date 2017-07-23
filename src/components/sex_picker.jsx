import React from 'react';
import { Field } from 'redux-form/immutable';
import { RadioButtonGroup } from 'redux-form-material-ui';
import { RadioButton } from 'material-ui';

const SexPicker = () =>
  <Field name="sex" component={RadioButtonGroup}>
    <RadioButton value="male" label="Male" />
    <RadioButton value="female" label="Female" />
  </Field>;

export default SexPicker;
