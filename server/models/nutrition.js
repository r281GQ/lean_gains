module.exports = mongoose => {
  const nutritionSchema = new mongoose.Schema({
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    quantity: Number,
    calorie: Number,
    name: String,
    gram: Number,
    protein: Number,
    carbohydrate: Number,
    unit: Number,
    fat: Number,
    photo: String,
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
  });

  // mongoose.model('Nutrition', nutritionSchema);
};
