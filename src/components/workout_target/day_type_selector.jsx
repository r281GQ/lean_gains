import React from 'react';
import { Field } from 'redux-form/immutable';
import { SelectField } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui';

const DayTypeSelector = () =>
  <div>
    <Field
      name="type"
      component={SelectField}
      fullWidth={true}
      floatingLabelText="Training day or a rest day?"
    >
      <MenuItem value="main" primaryText="Main" />
      <MenuItem value="rest" primaryText="Rest" />
    </Field>
  </div>;

export default DayTypeSelector;
