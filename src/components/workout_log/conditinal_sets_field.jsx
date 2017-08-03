import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form/immutable';

import SetsFieldArray from './sets_field_array';

const ConditionalSetsField = ({ passedMarker, item }) =>
  passedMarker
    ? null
    : <FieldArray name={`${item}.sets`} component={SetsFieldArray} />;

ConditionalSetsField.propTypes = {
  passedMarker: PropTypes.bool.isRequired,
  item: PropTypes.string.isRequired
};

export default ConditionalSetsField;
