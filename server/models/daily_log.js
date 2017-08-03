module.exports = mongoose => {
  const { Schema } = mongoose;
  
  //date
  const dailyLogSchema = new Schema({
    protein: Number,
    carbohydrate: Number,
    fat: Number,
    neck: Number,
    weight: Number,
    chest: Number,
    rightArm: Number,
    leftArm: Number,
    aboveBelly: Number,
    belly: Number,
    belowBelly: Number,
    hips: Number,
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
