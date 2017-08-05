const mongoose = require('mongoose');
const _ = require('lodash');
const WorkoutLog = mongoose.model('WorkoutLog');

const { decorateWithUser, endDate, startDate } = require('./../utils/service');

const handleGetWorkoutLog = ({ user, query: { month } }) =>
  new Promise((resolve, reject) =>
    WorkoutLog.find({
      user,
      createdAt: { $gte: startDate(month), $lt: endDate(month) }
    })
      .then(logs => resolve(logs))
      .catch(error => reject(error))
  );

const handleGetWorkoutLogDates = ({ user }) =>
  new Promise((resolve, reject) =>
    WorkoutLog.find({
      user
    })
      .then(logs => resolve(_.map(logs, log => log.createdAt)))
      .catch(error => reject(error))
  );

const handlePostWorkoutLogs = ({ user, body }) =>
  new Promise((resolve, reject) =>
    decorateWithUser('WorkoutLog')(body, user)
      .save()
      .then(log => resolve(log))
      .catch(err => reject(error))
  );

module.exports = {
  handleGetWorkoutLog,
  handleGetWorkoutLogDates,
  handlePostWorkoutLogs
};
