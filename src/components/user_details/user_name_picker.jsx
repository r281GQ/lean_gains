import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';

const UserNamePicker = ({ validator }) =>
  <Field
    name="userName"
    component={TextField}
    hintText="user name"
    validate={validator('username cannot be empty')}
  />;

UserNamePicker.PropTypes = {
  validator: PropTypes.func.isRequired
}

export default UserNamePicker;
