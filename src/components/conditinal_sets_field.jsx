import React from 'react';
import { FieldArray } from 'redux-form/immutable';

import SetsFieldArray from './../components/sets_field_array';

const ConditionalSetsField = ({ passedMarker, item }) =>
  passedMarker
    ? null
    : <FieldArray name={`${item}.sets`} component={SetsFieldArray} />;

export default ConditionalSetsField;
