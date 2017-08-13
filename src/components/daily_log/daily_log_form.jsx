import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';

import Macros from './macros';
import Issues from './issues';
import Measurements from './measuerements';
import DateSelector from './date_selector';

const DailyLogForm = ({
  label,
  submitHandler,
  shouldDisableDate,
  renderDate,
  disableButton
}) =>
  <form onSubmit={submitHandler}>
    <div className="log-form-inputs">
      <DateSelector
        renderDate={renderDate}
        shouldDisableDate={shouldDisableDate}
      />
      <Macros />
      <Issues />
      <Measurements />
    </div>
    <RaisedButton
      fullWidth
      label={label}
      type="submit"
      disabled={disableButton}
    />
  </form>;

DailyLogForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  label: PropTypes.string,
  shouldDisableDate: PropTypes.func.isRequired,
  renderDate: PropTypes.bool
};

export default DailyLogForm;
