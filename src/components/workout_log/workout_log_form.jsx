import React from 'react';
import { FieldArray } from 'redux-form/immutable';
import { RaisedButton, Paper } from 'material-ui';

import ExerciseFieldArray from './exercies_field_array';
import DateSelector from './date_selector';


import PropTypes from 'prop-types';


import ImmutablePropTypes from 'react-immutable-proptypes';






const WorkoutLogForm = ({
  disabled,
  passedMarkerList,
  normalizeMarker,
  label,
  submitHandler,
  renderDate,
  maxDate,
  minDate,
  formatDate,
  shouldDisableDate

}) =>
  <div className="workout-log-container">
    <Paper className="workout-log-paper">
      <form onSubmit={submitHandler}>
        <div>
          <DateSelector
            renderDate={renderDate}
            shouldDisableDate={shouldDisableDate}
            maxDate={maxDate}
            minDate={minDate}
            formatDate={formatDate}
          />
          <FieldArray
            name="exercises"
            component={ExerciseFieldArray}
            passedMarkerList={passedMarkerList}
            normalizeMarker={normalizeMarker}
          />
          <RaisedButton
            fullWidth
            type="submit"
            disabled={disabled}
            label={label}
          />
        </div>
      </form>
    </Paper>
  </div>;

  WorkoutLogForm.propTypes = {
    disabled: PropTypes.bool,
    passedMarkerList:ImmutablePropTypes.list,
    normalizeMarker:PropTypes.func,
    label:PropTypes.string,
    submitHandler:PropTypes.func,
    renderDate:PropTypes.bool,
    maxDate:PropTypes.instanceOf(Date),
    minDate:PropTypes.instanceOf(Date),
    formatDate:PropTypes.func,
    shouldDisableDate:PropTypes.func
  }

export default WorkoutLogForm;
