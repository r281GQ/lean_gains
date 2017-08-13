const { handleIsEmailUnique } = require('./../services/auth');

//TODO: implement jwt auth, and github oauth
module.exports = app => passport => {
  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/api/auth/whoami', (request, response) => {
    console.log(process.env);
    if (!request.user)
      return response.status(401).send({ message: 'Unauthanticated!' });
    return response.status(200).send(request.user);
  });

  app.get('/api/auth/logout', (request, response) => {
    request.logout();
    return response.status(200).send({ messgae: 'Successfully logged out!' });
  });

  app.get('/api/auth/unique/:email', (request, response) => {
    handleIsEmailUnique(request)
      .then(result => response.status(200).send({ result }))
      .catch(error => console.log(error));
  });

  app.get('/api/auth/email/signup', (request, response) => {});

  app.get('/api/auth/email/login', (request, response) => {});
};
