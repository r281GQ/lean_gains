import React from 'react';
import { Field } from 'redux-form/immutable';
import { DatePicker } from 'redux-form-material-ui';
import moment from 'moment';

const DOBPickerField = ({ minDate, maxDate }) => {
  return (
    <Field
      name="dob"
      component={input =>
        <DatePicker
          {...input}
          maxDate={maxDate}
          minDate={minDate}
          formatDate={value => moment(value).format('DD-MM-YYYY')}
        />}
    />
  );
};

export default DOBPickerField;
