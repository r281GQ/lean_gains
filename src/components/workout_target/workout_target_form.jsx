import React from 'react';
import { FlatButton, Paper } from 'material-ui';

import FixedTraining from './fixed_training';
import CycledTraining from './cycled_training';
import WorkoutTypeSelector from './workout_type_selector';
import Name from './name';
import DayTypeSelector from './day_type_selector';
import Exercises from './exercises';

const WorkoutTargetForm = ({
  submitHandler,
  formatDate,
  validateWorkoutName,
  isCycledTraining
}) =>
  <div className="workout-target-container">
    <Paper className="workout-target-paper">
      <form onSubmit={submitHandler}>
        <WorkoutTypeSelector />
        <Name validateWorkoutName={validateWorkoutName} />
        <DayTypeSelector />
        <CycledTraining
          isCycledTraining={isCycledTraining}
          formatDate={formatDate}
        />
        <FixedTraining isCycledTraining={isCycledTraining} />
        <Exercises />
        <div>
          <FlatButton fullWidth type="submit" label="Create workout" />
        </div>
      </form>
    </Paper>
  </div>;

export default WorkoutTargetForm;
