module.exports = mongoose => {
  const workoutTargetSchema = new mongoose.Schema({
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      enum: {
        values: ['main', 'rest'],
        message: `Type must be 'main' or 'rest'!`
      }
    },
    isCycledTraining: {
      type: String,
      enum: {
        values: ['cycle', 'fix'],
        message: `Type must be 'cycle' or 'fix'!`
      }
    },
    startDayofTraining: {
      type: Number
    },
    onEveryxDay: Number,
    name: String,
    onDays: {
      type: [
        {
          type: Number,
          min: 1,
          max: 7
        }
      ]
    },
    exercises: [String]
  });

  mongoose.model('WorkoutTarget', workoutTargetSchema);
};
