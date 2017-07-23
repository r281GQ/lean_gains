import React from 'react';
import { Field } from 'redux-form/immutable';
import { SelectField, Slider } from 'redux-form-material-ui';
import { MenuItem, FlatButton } from 'material-ui';

const FatSelector = ({
  fatMethod,
  maxRestFatGrams,
  maxRestFatPercentage,
  maxTrainingFatGrams,
  maxTrainingFatPercentage,
  restFatGrams,
  trainingFatGrams,
  restFatPercentage,
  trainingFatPercentage
}) => {
  return fatMethod === 'grams'
    ? <div>
        <Field
          name="restFatGrams"
          component={Slider}
          type="number"
          format={(value, name) => (value === '' ? 0 : value)}
          min={0}
          max={maxRestFatGrams}
          step={1}
        />
        <div style={{ textAlign: 'center' }}>
          <FlatButton
            disabled={true}
            label={`Rest day fat: ${restFatGrams} grams`}
          />
        </div>
        <Field
          format={(value, name) => (value === '' ? 0 : value)}
          name="trainingFatGrams"
          component={Slider}
          type="number"
          min={0}
          max={maxTrainingFatGrams}
          step={1}
        />

        <div style={{ textAlign: 'center' }}>
          <FlatButton
            disabled={true}
            label={`Training day fat: ${trainingFatGrams} grams`}
          />
        </div>
      </div>
    : <div>
        <Field
          name="restFatPercentage"
          format={(value, name) => (value === '' ? 0 : value)}
          component={Slider}
          type="number"
          min={0}
          max={maxRestFatPercentage}
          step={0.1}
        />

        <div style={{ textAlign: 'center' }}>
          <FlatButton
            disabled={true}
            label={`Rest day fat: ${restFatPercentage} %`}
          />
        </div>

        <Field
          format={(value, name) => (value === '' ? 0 : value)}
          name="trainingFatPercentage"
          component={Slider}
          type="number"
          min={0}
          max={maxTrainingFatPercentage}
          step={0.1}
        />

        <div style={{ textAlign: 'center' }}>
          <FlatButton
            disabled={true}
            label={`Training day fat: ${trainingFatPercentage} %`}
          />
        </div>
      </div>;
};

export default FatSelector;
