import React from 'react';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';

const UserNamePicker = ({ validators }) =>
  <Field
    name="userName"
    component={TextField}
    hintText="user name"
    validate={validators('username cannot be empty')}
  />;

export default UserNamePicker;
