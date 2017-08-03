import React from 'react';
import { Field } from 'redux-form/immutable';
import { SelectField, Slider } from 'redux-form-material-ui';
import { MenuItem, FlatButton } from 'material-ui';
import CurrentSlider from './../current_slider';

const FatSelector = ({
  fatMethod,
  maxRestFatGrams,
  maxRestFatPercentage,
  maxTrainingFatGrams,
  maxTrainingFatPercentage
}) => {
  return fatMethod === 'grams'
    ? <div>
        <Field
          name="restFatGrams"
          component={CurrentSlider}
          type="number"
          format={(value, name) => (value === '' ? 0 : value)}
          min={0}
          max={maxRestFatGrams}
          step={1}
        />

        <Field
          format={(value, name) => (value === '' ? 0 : value)}
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
          format={(value, name) => (value === '' ? 0 : value)}
          component={CurrentSlider}
          type="number"
          min={0}
          max={maxRestFatPercentage}
          step={0.1}
        />

        <Field
          format={(value, name) => (value === '' ? 0 : value)}
          name="trainingFatPercentage"
          component={CurrentSlider}
          type="number"
          min={0}
          max={maxTrainingFatPercentage}
          step={0.1}
        />
      </div>;
};

export default FatSelector;
