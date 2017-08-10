const {
  handleGetWorkoutTarget,
  handlePostWorkoutTarget,
  handlePutWorkoutTarget,
  handleDeleteWorkoutTarget
} = require('./../services/workout_target');
const withAuth = require('./../services/auth_middleware');

module.exports = app => {
  app.get('/api/workouttargets', withAuth, (request, response) => {
    handleGetWorkoutTarget(request)
      .then(workoutTargets => response.status(200).send(workoutTargets))
      .catch(error => response.sendStatus(501));
  });

  app.post('/api/workouttargets', withAuth, (request, response) => {
    handlePostWorkoutTarget(request)
      .then(workoutTarget => response.status(201).send(workoutTarget))
      .catch(error => response.sendStatus(501));
  });

  app.put('/api/workouttargets', withAuth, (request, response) => {
    handlePutWorkoutTarget(request)
      .then(workoutTarget => response.status(200).send(workoutTarget))
      .catch(error => response.sendStatus(501));
  });

  app.delete('/api/workouttargets/:_id', withAuth, (request, response) => {
    handleDeleteWorkoutTarget(request)
      .then(workoutTarget => response.status(200).send(workoutTarget))
      .catch(error => response.sendStatus(501));
  });
};
