import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import CurrentSlider from './../current_slider';

const WeightField = ({ item }) =>
  <Field
    name={`${item}.weight`}
    type="number"
    placeholder="weight"
    component={CurrentSlider}
    defaultValue={1}
    format={value => (value === ''  ? 0 : Number.parseFloat(value))}
    min={0}
    step={0.5}
    max={300}
  />;

WeightField.propTypes = {
  item: PropTypes.string.isRequired
};

export default WeightField;
