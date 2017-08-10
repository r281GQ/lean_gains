import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FlatButton , Paper} from 'material-ui';
import { TextField, DatePicker } from 'redux-form-material-ui';
import Macros from './macros1'
import Issues from './issues';
import Measurements from './measuerements';
const DailyLogForm = ({
  handleSubmit,
  createDailyLogHandler,
  label,
  renderDatepicker,
  shouldDisableDate
}) =>
  <form onSubmit={handleSubmit(createDailyLogHandler)}>
    <div>
      {renderDatepicker
        ? <Field
            name="date"
            component={DatePicker}
            shouldDisableDate={shouldDisableDate}
          />
        : null}
      Macros

      <Macros/>
    </div>
    <Issues/>
    <div>
      <Measurements/>

    </div>
    <FlatButton label={label} type="submit" />
  </form>;

  DailyLogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    createDailyLogHandler: PropTypes.func.isRequired,
    label: PropTypes.string,
    renderDatepicker: PropTypes.bool,
    shouldDisableDate: PropTypes.func.isRequired
  }

export default DailyLogForm;
