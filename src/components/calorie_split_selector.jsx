import React from 'react';
import { Field } from 'redux-form/immutable';
import { SelectField } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui';

const CalorieSplitSelector = () =>
  <Field
    name="calorieSplit"
    component={SelectField}
    fullWidth={true}
    floatingLabelText="Select your macro target"
  >
    <MenuItem value="recomp" primaryText="Recomposition (-20%/+20%)" />
    <MenuItem value="cut" primaryText="Cut (-30%/10%)" />
    <MenuItem value="slowbulk" primaryText="Slow bulk (-10%/+30%)" />
    <MenuItem value="custom" primaryText="Custom values" />
  </Field>;

export default CalorieSplitSelector;
