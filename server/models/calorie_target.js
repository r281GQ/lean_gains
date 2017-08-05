module.exports = mongoose => {
  const calorieTargetSchema = new mongoose.Schema({
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    startDate: {
      type: Number
    },
    endDate: {
      type: Number
    },
    isLatest: Boolean,
    rest: {
      calorie: Number,
      protein: Number,
      carbohydrate: Number,
      fat: Number
    },
    training: {
      calorie: Number,
      protein: Number,
      carbohydrate: Number,
      fat: Number
    }
  });

  mongoose.model('CalorieTarget', calorieTargetSchema);
};
