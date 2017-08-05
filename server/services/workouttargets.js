const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const WorkoutTarget = mongoose.model('WorkoutTarget');

const handleGetWorkoutTarget = (request, response) => {
  return new Promise((resolve, reject) => {
    WorkoutTarget.find({ user: request.user._id })
      .then(targets => resolve(targets))
      .catch(err => reject(error));
  });
};

const handlePutWorkoutTarget = (request, response) => {
  let {
    _id,
    isCycledTraining,
    name,
    type,
    startDayofTraining,
    exercises,
    onEveryxDay,
    onDays
  } = request.body;

  // target.user = request.user._id;
  console.log('called');
  return new Promise((resolve, reject) => {
    let f;
    // if(onDays){
    //   f = WorkoutTarget.findOneAndUpdate({user: request.user._id, _id}, {$set:{name, type, exercises, onDays}, {new: true})
    // } else {
    f = WorkoutTarget.findOneAndUpdate(
      { user: request.user._id, _id },
      {
        $set: {
          isCycledTraining,
          name,
          type,
          exercises,
          startDayofTraining,
          onEveryxDay,
          onDays
        }
      },
      { new: true }
    );
    // }

    f.then(item => resolve(item)).catch(err => {
      console.log(err);
      reject(err);
    });
  });
};

const handlePostWorkoutTarget = (request) => {
  let target = new WorkoutTarget(request.body);

  target.user = request.user._id;

  return new Promise((resolve, reject) => {
    target.save().then(target => resolve(target)).catch(error => reject(error));
  });
};

const handleDeleteWorkoutTarget = ({ user, params: { _id } }) =>
  new Promise((resolve, reject) =>
    WorkoutTarget.findOneAndRemove({ _id, user })
      .then(target => resolve(target))
      .catch(error => reject(error))
  );

module.exports = {
  handlePostWorkoutTarget,
  handleGetWorkoutTarget,
  handlePutWorkoutTarget,
  handleDeleteWorkoutTarget
};
