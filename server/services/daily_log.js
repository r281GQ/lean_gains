const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const DailyLog = mongoose.model('DailyLog');

const { decorateWithUser, endDate, startDate } = require('./../utils/service');

const initialValues = {
  neck: undefined,
  weight: undefined,
  chest: undefined,
  rightArm: undefined,
  height: undefined,
  leftArm: undefined,
  aboveBelly: undefined,
  belly: undefined,
  belowBelly: undefined,
  hip: undefined,
  waist: undefined,
  rightThigh: undefined,
  leftThigh: undefined
};

const structureValues = log => ({
  macros: _.pick(log, ['protein', 'fat', 'carbohydrate']),
  measurements: _.pick(log, [
    'neck',
    'weight',
    'height',
    'chest',
    'rightArm',
    'leftArm',
    'aboveBelly',
    'belly',
    'belowBelly',
    'hip',
    'waist',
    'rightThigh',
    'leftThigh'
  ]),
  issues: _.pick(log, [
    'sleepIssues',
    'stressIssues',
    'hungerIssues',
    'fatigueLethargy'
  ]),
  _id: log._id,
  createdAt: log.createdAt
});

const updateValueIfAbsent = (latest, current) =>
  _.mapValues(
    latest,
    (value, key) => (typeof value === 'undefined' ? current[key] : value)
  );

const reduceLogsToLatestValues = logs =>
  _.reduce(
    logs,
    (latest, current) => updateValueIfAbsent(latest, current),
    initialValues
  );

const handleGetDailyLogs = ({ user, query: { month } }) =>
  new Promise((resolve, reject) =>
    DailyLog.find({
      user,
      createdAt: { $gte: startDate(month), $lt: endDate(month) }
    })
      .then(logs => resolve(_.map(logs, log => structureValues(log))))
      .catch(error => reject(error))
  );

const handleGetDailyLogDates = ({ user }) =>
  new Promise((resolve, reject) =>
    DailyLog.find({ user })
      .then(logs => resolve(_.map(logs, log => log.createdAt)))
      .catch(error => reject(error))
  );

const handlePostDailyLogs = ({ user, body }) =>
  new Promise((resolve, reject) =>
    decorateWithUser('DailyLog')(body, user)
      .save()
      .then(log => resolve(structureValues(log)))
      .catch(error => reject(error))
  );

const handlePutDailyLogs = ({ user, body }) =>
  new Promise((resolve, reject) =>
    DailyLog.findOneAndUpdate(
      { user, _id: body._id },
      { $set: body },
      { new: true }
    )
      .then(log => resolve(structureValues(log)))
      .catch(error => reject(error))
  );

const handleDeleteDailyLogs = ({ user, params: { _id } }) =>
  new Promise((resolve, reject) =>
    DailyLog.findOneAndRemove({ _id, user })
      .then(item => resolve(item))
      .catch(error => reject(error))
  );

//TODO: implement a way to break iteration if final object has every value
const handleLatestMeasurements = ({ user }) =>
  new Promise((resolve, reject) =>
    DailyLog.find({ user })
      .sort({ createdAt: -1 })
      .then(logs => resolve(reduceLogsToLatestValues(logs)))
      .catch(error => reject(error))
  );

module.exports = {
  handleGetDailyLogs,
  handleGetDailyLogDates,
  handlePostDailyLogs,
  handleLatestMeasurements,
  handlePutDailyLogs,
  handleDeleteDailyLogs
};
