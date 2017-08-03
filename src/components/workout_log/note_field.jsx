import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

const NoteField = ({ item }) =>
  <Field
    name={`${item}.note`}
    type="text"
    placeholder="note"
    component={TextField}
  />;

NoteField.propTypes = {
  item: PropTypes.string.isRequired
};

export default NoteField;
