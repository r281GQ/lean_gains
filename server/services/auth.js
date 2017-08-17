const mongoose = require('mongoose');
const User = mongoose.model('User');

const handleIsEmailUnique = ({ params: { email } }) =>
  new Promise((resolve, reject) =>
    User.findOne({ email })
      .then(user => (user ? resolve(false) : resolve(true)))
      .catch(error => reject(error))
  );

const handleSignUp = ({ body }) =>
  new Promise((resolve, reject) =>
    new User(body)
      .save()
      .then(user => resolve(user))
      .catch(error => reject(error))
  );

const handleLogin = request =>
  new Promise((resolve, reject) =>
    User.findOne({ email: request.body.email })
      .then(user => resolve(user))
      .catch(error => reject(error))
  );

module.exports = { handleIsEmailUnique, handleSignUp, handleLogin };
