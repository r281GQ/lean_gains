module.exports = mongoose => {
  const moment = require('moment');

  const dailyLogSchema = new mongoose.Schema({
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    createdAt: {
      type: Number,
      default: () => moment().valueOf()
    },
    protein: Number,
    carbohydrate: Number,
    fat: Number,
    neck: Number,
    weight: Number,
    height: Number,
    chest: Number,
    rightArm: Number,
    leftArm: Number,
    aboveBelly: Number,
    belly: Number,
    belowBelly: Number,
    hip: Number,
    waist: Number,
    rightThigh: Number,
    leftThigh: Number,
    sleepIssues: Number,
    stressIssues: Number,
    hungerIssues: Number,
    fatigueLethargy: Number
  });

  mongoose.model('DailyLog', dailyLogSchema);
};
