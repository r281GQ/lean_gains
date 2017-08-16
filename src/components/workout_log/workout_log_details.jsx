import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

const setExerciseKey = (log, exercise) =>
  `${log._id}.${log.exercises.indexOf(exercise)}`;

const setSetKey = set => (log, exercise) =>
  `${setExerciseKey}${exercise.sets.indexOf(set)}`;

const WorkoutLogDetails = ({ log }) =>
  <div>
    {_.map(log.exercises, exercise =>
      <div key={setExerciseKey(log, exercise)}>
        Exercise: {exercise.name}
        <br />
        Sets:
        {_.map(exercise.sets, set =>
          <div key={setSetKey(set)(log, exercise)}>
            Repetitions: {set.reps} Weight: {set.weight}
          </div>
        )}
      </div>
    )}
  </div>;

WorkoutLogDetails.propTypes = {
  log: PropTypes.object
};

export default WorkoutLogDetails;
