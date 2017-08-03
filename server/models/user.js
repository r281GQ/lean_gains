module.exports = mongoose => {
  const { Schema } = mongoose;

  const userSchema = new Schema({
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    lastLoginTime: {
      type: Date
    },
    sex: {
      type: String
    },
    dob: {
      type: Date
    },
    googleAuthId: {
      type: String
    }
  });

  mongoose.model('User', userSchema);
};
