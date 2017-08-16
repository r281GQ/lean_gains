import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';
import { Paper, FlatButton } from 'material-ui';

const DateSelector = ({
  renderDate,
  shouldDisableDate,
  maxDate,
  minDate,
  formatDate
}) =>
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
              maxDate={maxDate}
              minDate={minDate}
              format={formatDate}
            />
          </div>
          <div className="clear" />
        </div>
      </Paper>
    : null;

DateSelector.propTypes = {
  shouldDisableDate: PropTypes.func.isRequired,
  renderDate: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  formatDate: PropTypes.func.isRequired
};

export default DateSelector;
