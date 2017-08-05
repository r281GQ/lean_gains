module.exports = mongoose => {
  const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    userName: {
      type:String
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
    },
    picture: {
      type: String
    }
  });

  mongoose.model('User', userSchema);
};
