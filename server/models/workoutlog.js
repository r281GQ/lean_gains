module.exports = mongoose => {
  const moment = require('moment');

  const workoutLogSchema = new mongoose.Schema({
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    createdAt: {
      type: Number,
      default: () => moment().valueOf()
    },
    exercises: [
      {
        name: String,
        marker: Boolean,
        sets: [
          {
            reps: Number,
            weight: Number
          }
        ]
      }
    ]
  });

  mongoose.model('WorkoutLog', workoutLogSchema);
};
