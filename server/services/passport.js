const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const {
  dev: { google: { clientID, clientSecret } }
} = require('./../../config/config.json');

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(error => console.log(error));
});

const mapToDbProps = profile => {
  const user = {
    name: profile.displayName,
    email: profile.emails[0].value,
    sex: profile.gender,
    googleAuthId: profile.id,
    picture: profile.photos[0].value
  };
  return user;
};

passport.use(
  new Strategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      const userToCreate = new User(mapToDbProps(profile));
      User.findOne({ googleAuthId: userToCreate.googleAuthId })
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return userToCreate.save();
        })
        .then(user => done(null, user))
        .catch(error => console.log(error));
    }
  )
);
