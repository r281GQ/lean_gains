const {
  handleGetCalorieTarget,
  handlePostCalorieTarget
} = require('./../services/calorie_target');
const withAuth = require('./../services/auth_middleware');

module.exports = app => {
  app.get('/api/calorietargets', withAuth, (request, response) => {
    handleGetCalorieTarget(request)
      .then(calorieTargets => response.status(200).send(calorieTargets))
      .catch(error => response.status(409));
  });

  app.post('/api/calorietargets', withAuth, (request, response) => {
    handlePostCalorieTarget(request)
      .then(calorieTargets => response.status(201).send(calorieTargets))
      .catch(error => response.status(409));
  });
};
