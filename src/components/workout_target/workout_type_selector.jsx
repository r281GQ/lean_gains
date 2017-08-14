import React from 'react';
import { Field } from 'redux-form/immutable';
import { SelectField } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui';

const WorkoutTypeSelector = () =>
  <div>
    <Field
      name="isCycledTraining"
      component={SelectField}
      fullWidth={true}
      floatingLabelText="Training type"
    >
      <MenuItem value="cycle" primaryText="Cycled training" />
      <MenuItem value="fix" primaryText="On fixed days" />
    </Field>
  </div>;

export default WorkoutTypeSelector;
