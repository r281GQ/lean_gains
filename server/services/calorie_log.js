const mongoose = require('mongoose');
const moment = require('moment');
const CalorieLog = mongoose.model('CalorieLog');
const _ = require('lodash');



const handlePutCalorieLog = ({ body, user }) =>
  new Promise((resolve, reject) =>
    CalorieLog.findOneAndUpdate(
      {
        user,
        createdAt: {
          $gte: moment().startOf('day').valueOf(),
          $lt: moment().endOf('day').valueOf()
        }
      },
      {
        $push: { nutritions: { $each: body } },
        $setOnInsert: { createdAt: moment().valueOf() }
      },
      { upsert: true, new: true }
    )
      .then(item =>
        resolve(
          _.extend({}, { sum: item.toObject().calorieSum }, item.toObject())
        )
      )
      .catch(error => reject(error))
  );

const handleGetCalorieLog = ({  user }) =>
  new Promise((resolve, reject) =>
    CalorieLog.findOne({
      user,
      createdAt: {
        $gte: moment().startOf('day').valueOf(),
        $lt: moment().endOf('day').valueOf()
      }
    })
      .then(item =>
        resolve(
          item ? _.extend({}, { sum: item.toObject().calorieSum }, item.toObject()) : {}
        )
      )
      .catch(error => reject(error))
  );

module.exports = { handlePutCalorieLog, handleGetCalorieLog };
