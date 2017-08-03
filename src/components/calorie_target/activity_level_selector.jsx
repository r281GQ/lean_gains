import React from 'react';
import { Field } from 'redux-form/immutable';
import { SelectField } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui';

const ActivityLevelSelecor = () =>
  <Field
    name="activity"
    component={SelectField}
    fullWidth={true}
    floatingLabelText="Select you activity level"
  >
    <MenuItem value={1.2} primaryText="Sedentary" />
    <MenuItem value={1.375} primaryText="Lightly active" />
    <MenuItem value={1.55} primaryText="Moderately active" />
    <MenuItem value={1.725} primaryText="Very active" />
    <MenuItem value={1.9} primaryText="Extremely active" />
  </Field>;

export default ActivityLevelSelecor;
