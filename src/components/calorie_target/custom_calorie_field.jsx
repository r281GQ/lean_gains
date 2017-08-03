import React from 'react';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

const CustomCalorieField = ({
  calorieSplit,
  minRest,
  minTraining,
  normalize
}) =>
  calorieSplit === 'custom'
    ? <div>
        <Field
          fullWidth={true}
          name="restDay"
          floatingLabelText="Rest day %"
          type="number"
          min={minRest}
          max={200}
          normalize={normalize}
          step={0.5}
          component={TextField}
        />

        <Field
          fullWidth={true}
          name="trainingDay"
          floatingLabelText="Trainging day %"
          component={TextField}
          type="number"
          step={0.5}
          normalize={normalize}
          min={minTraining}
          max={200}
        />
      </div>
    : null;

export default CustomCalorieField;
