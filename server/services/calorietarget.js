const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const CalorieTarget = mongoose.model('CalorieTarget');

const { decorateWithUser } = require('./../utils/service');

const setStartDateAndIsLatest = (body, user) =>
  decorateWithUser('CalorieTarget')(
    _.extend({}, body, {
      startDate: moment().valueOf(),
      isLatest: true
    }),
    user
  );

const findFormerLatest = user =>
  CalorieTarget.find({ user }).sort({ startDate: -1 }).skip(1).limit(1);

const updateFormerLatest = target =>
  !target[0]
    ? 0
    : CalorieTarget.findOneAndUpdate(
        { _id: target[0]._id },
        { $set: { endDate: moment().valueOf(), isLatest: false } }
      );

const handleGetCalorieTarget = ({ user }) =>
  new Promise((resolve, reject) =>
    CalorieTarget.find({ user })
      .then(targets => resolve(targets))
      .catch(err => reject(error))
  );
const handlePostCalorieTarget = ({ user, body }) =>
  new Promise((resolve, reject) =>
    setStartDateAndIsLatest(body, user)
      .save()
      .then(() => findFormerLatest(user))
      .then(target => updateFormerLatest(target))
      .then(() => CalorieTarget.find({ user }))
      .then(targets => resolve(targets))
      .catch(error => reject(error))
  );

module.exports = {
  handleGetCalorieTarget,
  handlePostCalorieTarget
};
