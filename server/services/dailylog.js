const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const DailyLog = mongoose.model('DailyLog');

const handleGetDailyLogs = (request, response) => {
  const user = request.user;
  console.log(user);
  const month = request.query.month;
  console.log(month);
  const startDate = _.cloneDeep(moment(month, 'MM-YYYY'))
    .startOf('month')
    .valueOf();
  const endDate = _.cloneDeep(moment(month, 'MM-YYYY'))
    .endOf('month')
    .valueOf();
  return new Promise((resolve, reject) => {
    DailyLog.find({
      user,
      createdAt: { $gte: startDate, $lt: endDate }
    })
      .then(logs => {
        const toSend = _.map(logs, log => {
          let sendBack = {
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
          };
          return sendBack;
        });

        resolve(toSend);
      })
      .catch(error => reject(error));
  });
};

const handleGetDailyLogDates = (request, response) => {
  const { user } = request;
  return new Promise((resolve, reject) => {
    DailyLog.find({
      user
    }).then(logs => resolve(_.map(logs, log => log.createdAt)));
  });
};

const handlePostDailyLogs = (request, response) => {
  const user = request.user;
  return new Promise((resolve, reject) => {
    let dailyLog = new DailyLog(request.body);
    dailyLog.user = user;
    dailyLog.save().then(user => resolve(user)).catch(err => reject(error));
  });
};

let initialValues = {
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

const handleLatestMeasurements = (request, response) => {
  const user = request.user;
  return new Promise((resolve, reject) => {
    DailyLog.find({ user })
      .sort({ createdAt: -1 })
      .then(logs => {
        //implementint breaking iteration if the object is full
        let final = _.reduce(
          logs,
          (latest, current) =>
            _.mapValues(
              latest,
              (value, key) =>
                typeof value === 'undefined' ? current[key] : value
            ),
          initialValues
        );

        // let final = _.transform(
        //   logs,
        //   (latest, current) => {
        //     console.log(current);
        //     // console.log(latest)
        //     // const f = _.mapValues(
        //     //   latest,
        //     //   (value, key) =>
        //     //     typeof value === 'undefined' ? current[key] : value
        //     // );
        //     //
        //     // return false;
        //     _.forOwn(
        //       latest,
        //       (value, key) =>
        //         typeof value === 'undefined'
        //           ? (latest[key] = current[key])
        //           : null
        //     );
        //     return _.every(latest, item => typeof item !== 'undefined')
        //       ? false
        //       : true;
        //   },
        //   initialValues
        // );

        resolve(final);
      })
      .catch(err => reject(error));
  });
};

module.exports = {
  handleGetDailyLogs,
  handleGetDailyLogDates,
  handlePostDailyLogs,
  handleLatestMeasurements
};
