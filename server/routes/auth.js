//TODO: implement jwt auth, and github oauth
module.exports = app => passport => {
  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('http://localhost:8080/app');
    }
  );

  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/api/auth/whoami', (request, response) => {
    if (!request.user)
      return response.status(401).send({ message: 'Unauthanticated!' });
    return response.status(200).send(request.user);
  });

  app.get('/api/auth/logout', (request, response) => {
    request.logout();
    return response.status(200).send({ messgae: 'Successfully logged out!' });
  });

  app.get('/api/auth/email/signup', (request, response) => {});

  app.get('/api/auth/email/login', (request, response) => {});
};
