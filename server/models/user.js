const bcrypt = require('bcrypt');

module.exports = mongoose => {
  const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    userName: {
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
    },
    picture: {
      type: String
    },
    password: {
      type: String
    }
  });

  userSchema.pre('save', function(next) {
    this.isNew || isModified('password')
      ? bcrypt.hash(this.password, 10, (err, hash) => {
          if (err) next(err);
          this.password = hash;
          next();
        })
      : next();
  });

  mongoose.model('User', userSchema);
};
