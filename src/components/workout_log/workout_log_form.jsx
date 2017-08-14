import React from 'react';
import ExerciseFieldArray from './exercies_field_array';
import { Field, FieldArray } from 'redux-form/immutable';
import { RaisedButton, Paper } from 'material-ui';
import { DatePicker } from 'redux-form-material-ui';

import DateSelector from './date_selector';

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
  shouldDisableDate,
  weightLabel
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

export default WorkoutLogForm;
