import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import CurrentSlider from './../current_slider';
 
const FatSelector = ({
  fatMethod,
  maxRestFatGrams,
  maxRestFatPercentage,
  maxTrainingFatGrams,
  maxTrainingFatPercentage
}) =>
  fatMethod === 'grams'
    ? <div>
        <Field
          name="restFatGrams"
          component={CurrentSlider}
          type="number"
          format={value => (value === '' ? 0 : value)}
          min={0}
          max={maxRestFatGrams}
          step={1}
        />

        <Field
          format={value => (value === '' ? 0 : value)}
          name="trainingFatGrams"
          component={CurrentSlider}
          type="number"
          min={0}
          max={maxTrainingFatGrams}
          step={1}
        />
      </div>
    : <div>
        <Field
          name="restFatPercentage"
          format={value => (value === '' ? 0 : value)}
          component={CurrentSlider}
          type="number"
          min={0}
          max={maxRestFatPercentage}
          step={0.1}
        />

        <Field
          format={value => (value === '' ? 0 : value)}
          name="trainingFatPercentage"
          component={CurrentSlider}
          type="number"
          min={0}
          max={maxTrainingFatPercentage}
          step={0.1}
        />
      </div>;

FatSelector.propTypes = {
  fatMethod: PropTypes.string,
  maxRestFatGrams: PropTypes.number,
  maxRestFatPercentage: PropTypes.number,
  maxTrainingFatGrams: PropTypes.number,
  maxTrainingFatPercentage: PropTypes.number
};

export default FatSelector;
