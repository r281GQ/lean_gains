const moment = require('moment');
const _ = require('lodash');

module.exports = mongoose => {
  const calorieLogSchema = new mongoose.Schema({
    createdAt: {
      type: Number,
      default: () => moment().valueOf()
    },
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    nutritions: [
      {
        quantity: Number,
        calorie: Number,
        name: String,
        gram: Number,
        protein: Number,
        carbohydrate: Number,
        unit: String,
        fat: Number,
        photo: { highres: String, thumb: String },
        tags: {
          name: String,
          tag_id: Number
        },
        measures: [
          {
            name: String,
            weight: Number
          }
        ]
      }
    ]
  });

  calorieLogSchema.virtual('calorieSum').get(function() {
    return _.reduce(
      this.nutritions,
      (sum, item) => {
        const multiplier =
          _.find(item.measures, measure => measure.name === item.unit).weight /
          item.gram;

        sum.protein += item.protein * multiplier;
        sum.carbohydrate += item.carbohydrate * multiplier;
        sum.fat += item.fat * multiplier;
        sum.calorie += item.calorie * multiplier;
        return sum;
      },
      { protein: 0, carbohydrate: 0, fat: 0, calorie: 0 }
    );
  });

  mongoose.model('CalorieLog', calorieLogSchema);
};
