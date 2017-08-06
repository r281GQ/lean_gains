const {
  handleGetUserDetails,
  handlePutUserDetails
} = require('./../services/user_details');

module.exports = app => {
  app.get('/api/userdetails', (request, response) => {
    handleGetUserDetails(request)
      .then(userDetails => response.status(200).send(userDetails))
      .catch(error => console.log(error));
  });

  app.put('/api/userdetails', (request, response) => {
    handlePutUserDetails(request)
      .then(userDetails => response.status(200).send(userDetails))
      .catch(error => console.log(error));
  });
};
