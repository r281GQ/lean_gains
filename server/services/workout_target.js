const mongoose = require('mongoose');

const WorkoutTarget = mongoose.model('WorkoutTarget');

const { decorateWithUser } = require('./../utils/service');

const handleGetWorkoutTarget = ({ user }) =>
  new Promise((resolve, reject) =>
    WorkoutTarget.find({ user })
      .then(targets => resolve(targets))
      .catch(error => reject(error)),
  );

const handlePutWorkoutTarget = ({
  body: {
    _id,
    isCycledTraining,
    name,
    type,
    startDayofTraining,
    exercises,
    onEveryxDay,
    onDays,
  },
  user,
}) =>
  new Promise((resolve, reject) =>
    WorkoutTarget.findOneAndUpdate(
      { user, _id },
      {
        $set: {
          isCycledTraining,
          name,
          type,
          exercises,
          startDayofTraining,
          onEveryxDay,
          onDays,
        },
      },
      { new: true },
    )
      .then(item => resolve(item))
      .catch(error => reject(error)),
  );

const handlePostWorkoutTarget = ({ body, user }) =>
  new Promise((resolve, reject) =>
    decorateWithUser('WorkoutTarget')(body, user)
      .save()
      .then(target => resolve(target))
      .catch(error => reject(error)),
  );

const handleDeleteWorkoutTarget = ({ user, params: { _id } }) =>
  new Promise((resolve, reject) =>
    WorkoutTarget.findOneAndRemove({ _id, user })
      .then(target => resolve(target))
      .catch(error => reject(error)),
  );

module.exports = {
  handlePostWorkoutTarget,
  handleGetWorkoutTarget,
  handlePutWorkoutTarget,
  handleDeleteWorkoutTarget,
};
