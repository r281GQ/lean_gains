const {
  handleIsEmailUnique,
  handleSignUp,
  handleLogin
} = require('./../services/auth');

module.exports = app => passport => {
  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      process.env.NODE_ENV === 'production'
        ? res.redirect('https://lean-gains-dev.herokuapp.com/app')
        : res.redirect('/app');
    }
  );

  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.post(
    '/api/auth/local/login',
    passport.authenticate('local'),
    (request, response) => {
      response.status(200).send({ message: 'Authanticated!' });
    }
  );

  const signUpMiddleWare = (request, response, next) => {
    handleSignUp(request)
      .then(user => {
        next();
      })
      .catch(error => console.log(error));
  };

  app.post(
    '/api/auth/local/signup',
    signUpMiddleWare,
    passport.authenticate('local'),
    (request, response) => {
      response.status(200).send({ message: 'Authanticated!' });
    }
  );

  app.get('/api/auth/whoami', (request, response) => {
    if (!request.user)
      return response.status(401).send({ message: 'Unauthanticated!' });
    return response.status(200).send(request.user);
  });

  app.get('/api/auth/logout', (request, response) => {
    request.logout();
    request.session = null;
    return response.status(200).send({ messgae: 'Successfully logged out!' });
  });

  app.get('/api/auth/unique/:email', (request, response) => {
    handleIsEmailUnique(request)
      .then(result => response.status(200).send({ result }))
      .catch(error => console.log(error));
  });
};
