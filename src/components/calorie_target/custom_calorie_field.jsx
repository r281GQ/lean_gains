import React from 'react';
import PropTypes from 'prop-types';
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

CustomCalorieField.propTypes = {
  calorieSplit: PropTypes.string,
  normalize: PropTypes.func.isRequired
}

export default CustomCalorieField;
