const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const CalorieTarget = mongoose.model('CalorieTarget');

const handleGetCalorieTarget = (request, response) => {
  return new Promise((resolve, reject) => {
    CalorieTarget.find({ user: request.user._id })
      .then(targets => resolve(targets))
      .catch(err => reject(error));
  });
};

const handlePostCalorieTarget = (request, response) => {
  const user = request.user._id;

  const target = new CalorieTarget(
    _.extend({}, request.body, {
      startDate: moment().valueOf(),
      isLatest: true
    })
  );

  target.user = user;

  return new Promise((resolve, reject) => {
    target
      .save()
      .then(targets =>
        CalorieTarget.find({ user }).sort({ startDate: -1 }).skip(1).limit(1)
      )
      .then(
        target =>
          !target[0]
            ? 0
            : CalorieTarget.findOneAndUpdate(
                { _id: target[0]._id },
                { $set: { endDate: moment().valueOf(), isLatest: false } }
              )
      )
      .then(() => CalorieTarget.find({ user }))
      .then(targets => resolve(targets))
      .catch(error => reject(error));
  });
};

module.exports = {
  handleGetCalorieTarget,
  handlePostCalorieTarget
};
