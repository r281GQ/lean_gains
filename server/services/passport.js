const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const {
  dev: { google: { clientID, clientSecret } }
} = require('./../../config/config.json');

const env = process.env;

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser((id, done) =>
  User.findById(id)
    .then(user => done(null, user))
    .catch(error => console.log(error))
);

const mapToDbProps = profile => ({
  name: profile.displayName,
  email: profile.emails[0].value,
  sex: profile.gender,
  googleAuthId: profile.id,
  picture: profile.photos[0].value
});

passport.use(
  new Strategy(
    {
      clientID || env.GOOGLE_CLIENT_ID,
      clientSecret || env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) =>
      User.findOne({ googleAuthId: profile.id })
        .then(
          user =>
            user ? done(null, user) : new User(mapToDbProps(profile)).save()
        )
        .then(user => done(null, user))
        .catch(error => console.log(error))
  )
);
