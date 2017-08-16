import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { DatePicker } from 'redux-form-material-ui';
import moment from 'moment';

const DOBPickerField = ({ minDate, maxDate }) =>
  <Field
    fullWidth
    name="dob"
    component={DatePicker }

      maxDate={maxDate}
      minDate={minDate}
      format={value => moment(value).toDate()}
  />;

DOBPickerField.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date)
};

export default DOBPickerField;
