const mongoose = require('mongoose');
const User = mongoose.model('User');

const handleIsEmailUnique = ({ params: {email} }) =>
  new Promise((resolve, reject) =>
    User.findOne({ email })
      .then(user => (user ? resolve(false) : resolve(true)))
      .catch(error => reject(error))
  );

module.exports = { handleIsEmailUnique };
