const {
  handleGetUserDetails,
  handlePutUserDetails
} = require('./../services/user_detail');
const withAuth = require('./../services/auth_middleware');

module.exports = app => {
  app.get('/api/userdetails', withAuth, (request, response) => {
    handleGetUserDetails(request)
      .then(userDetails => response.status(200).send(userDetails))
      .catch(error => console.log(error));
  });

  app.put('/api/userdetails', withAuth, (request, response) => {
  console.log(request);
    handlePutUserDetails(request)
      .then(userDetails => response.status(200).send(userDetails))
      .catch(error => console.log(error));
  });
};
