import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';
import { Paper, FlatButton } from 'material-ui';


// TODO: maxDate and minDate
const DateSelector = ({ renderDate, shouldDisableDate }) =>
  renderDate
    ? <Paper>
        <div className="row">
          <div className="col col-3">
            <FlatButton disabled label="Date" />
          </div>
          <div className="col col-3" />
          <div className="col col-6">
            <Field
              name="createdAt"
              component={DatePicker}
              shouldDisableDate={shouldDisableDate}

            />
          </div>
          <div className="clear" />
        </div>
      </Paper>
    : null;

DateSelector.propTypes = {
  shouldDisableDate: PropTypes.func.isRequired,
  renderDate: PropTypes.bool
};

export default DateSelector;