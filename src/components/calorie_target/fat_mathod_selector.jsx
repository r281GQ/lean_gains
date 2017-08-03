import React from 'react';

import { Field } from 'redux-form/immutable';
import { SelectField } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui';

const FatMethodSelector = () =>
  <Field
    name="fatMethod"
    component={SelectField}
    fullWidth={true}
    floatingLabelText="Select how would you like to give your fat target"
  >
    <MenuItem value="grams" primaryText="In grams" />
    <MenuItem value="percentage" primaryText="In % of kcals" />
  </Field>;

export default FatMethodSelector;
