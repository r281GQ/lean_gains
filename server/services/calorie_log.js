const mongoose = require('mongoose');
const moment = require('moment');
const CalorieLog = mongoose.model('CalorieLog');
const _ = require('lodash');

const handlePutCalorieLog = ({ body, user, query: { day } }) => {
  return new Promise((resolve, reject) =>
    CalorieLog.findOneAndUpdate(
      {
        user,
        createdAt: {
          $gte: moment(day).startOf('day').valueOf(),
          $lt: moment(day).endOf('day').valueOf()
        }
      },
      {
        $set: { nutritions: body },
        $setOnInsert: { createdAt: moment().valueOf() }
      },
      { upsert: true, new: true }
    )
      .then(item =>
        resolve(
          _.extend(
            {},
            { sum: item.toObject().calorieSum, _id: item._id },
            item.toObject()
          )
        )
      )
      .catch(error => reject(error))
  );
};

const handleGetCalorieLog = ({ user, query: { day } }) =>
  new Promise((resolve, reject) =>
    CalorieLog.findOne({
      user,
      createdAt: {
        $gte: moment(day).startOf('day').valueOf(),
        $lt: moment(day).endOf('day').valueOf()
      }
    })
      .then(item =>
         resolve(item ?
          _.extend(
            {},
            { sum: item.toObject().calorieSum, _id: item._id },
            item.toObject()
          ): {}
        )
      )
      .catch(error => reject(error))
  );

module.exports = { handlePutCalorieLog, handleGetCalorieLog };
