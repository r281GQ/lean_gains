const {
  handleGetCalorieTarget,
  handlePostCalorieTarget
} = require('./../services/calorietarget');

module.exports = app => {
  app.get('/api/calorietargets', (request, response) => {
    handleGetCalorieTarget(request)
      .then(calorietargets => response.status(200).send(calorietargets))
      .catch(error => response.status(409));
  });

  app.post('/api/calorietargets', (request, response) => {
    handlePostCalorieTarget(request)
      .then(calorietargets => response.status(200).send(calorietargets))
      .catch(error => response.status(409));
  });
};
