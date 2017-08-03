import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

const NameField = ({ item }) =>
  <Field
    name={`${item}.name`}
    type="text"
    placeholder="name"
    component={TextField}
  />;

NameField.propTypes = {
  item: PropTypes.string.isRequired
};

export default NameField;
