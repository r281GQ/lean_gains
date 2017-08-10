const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

const decorateWithUser = model => {
  const Model = mongoose.model(model);
  return (body, user) => {
    const model = new Model(body);
    model.user = user;
    return model;
  };
};

const endDate = month =>
  _.cloneDeep(moment(month, 'MM-YYYY')).endOf('month').valueOf();

const startDate = month =>
  _.cloneDeep(moment(month, 'MM-YYYY')).startOf('month').valueOf();

module.exports = {
  decorateWithUser,
  endDate,
  startDate
};
