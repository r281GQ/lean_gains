import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

const RepsField = ({ item }) =>
  <Field
    name={`${item}.reps`}
    type="number"
    placeholder="reps"
    component={TextField}
  />;

RepsField.propTypes = {
  item: PropTypes.string.isRequired
};

export default RepsField;
