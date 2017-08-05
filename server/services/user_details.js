const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const User = mongoose.model('User');

const handleGetUserDetails = (request, response) => {
  return new Promise((resolve, reject) => {
    User.findOne({_id: request.user._id})
    .then(user => {
      const details = _.pick(user, ['dob', 'sex', 'picture', 'userName']);
      resolve(details)
    })
    .catch(error => reject(error))
  })
}



const handlePutUserDetails = (request, response) => {
  const {dob, sex, userName} =  request.body;
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({_id: request.user._id},
      {$set: {dob, sex, userName}}, {new: true})
    .then(user => {
      const details = _.pick(user, ['dob', 'sex', 'picture', 'userName']);

      resolve(details)
    })
    .catch(error => reject(error))
  })
}

module.exports = {
  handleGetUserDetails,handlePutUserDetails
}
