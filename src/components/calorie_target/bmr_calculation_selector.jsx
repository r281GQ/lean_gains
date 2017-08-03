import React from 'react';
import { Field } from 'redux-form/immutable';
import { SelectField } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui';

const BMRCalculationSelector = () =>
  <Field
    name="bmrCalculationMethod"
    component={SelectField}
    fullWidth={true}
    floatingLabelText="Select your bmr calculation method"
  >
    <MenuItem
      value="harris-benedict"
      primaryText="Based on weight (Harris-Benedict)"
    />
    <MenuItem
      value="katch-mcardle"
      primaryText="Based on lean body mass (Katch-Mcardle)"
    />
  </Field>;

export default BMRCalculationSelector;
