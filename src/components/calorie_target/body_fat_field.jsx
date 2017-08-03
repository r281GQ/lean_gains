import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

const BodyFatField = ({ bmrCalculationMethod }) =>
  bmrCalculationMethod === 'katch-mcardle'
    ? <Field
        name="bodyFat"
        floatingLabelText="You can manually enter your bodyfat %"
        component={TextField}
        type="number"
        min={0}
        fullWidth={true}
        max={50}
        step={0.1}
      />
    : null;

BodyFatField.propTypes = {
  bmrCalculationMethod: PropTypes.string
}

export default BodyFatField;
