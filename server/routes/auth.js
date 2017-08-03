module.exports = app => passport => {
  app.get('/api/auth/google/callback', passport.authenticate('google'));

  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/api/auth/whoami', (request, response) => {
    return response.status(200).send(request.user);
  });

  app.get('/api/auth/logout', request => request.logout());

  app.get('/api/auth/email/signup', (request, response) => {});

  app.get('/api/auth/email/login', (request, response) => {});
};
