const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const User = mongoose.model('User');

const pickUserValues = user =>
  _.pick(user, ['dob', 'sex', 'picture', 'userName']);

const handleGetUserDetails = ({ user: { _id } }) =>
  new Promise((resolve, reject) =>
    User.findOne({ _id })
      .then(user => resolve(pickUserValues(user)))
      .catch(error => reject(error))
  );

const handlePutUserDetails = ({user:{_id}, body: { dob, sex, userName } }) =>
  new Promise((resolve, reject) =>
    User.findOneAndUpdate(
      { _id },
      { $set: { dob, sex, userName } },
      { new: true }
    )
      .then(user => resolve(pickUserValues(user)))
      .catch(error => reject(error))
  );

module.exports = {
  handleGetUserDetails,
  handlePutUserDetails
};
