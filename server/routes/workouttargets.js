const {
  handleGetWorkoutTarget,
  handlePostWorkoutTarget,
  handlePutWorkoutTarget,
  handleDeleteWorkoutTarget
} = require('./../services/workouttargets');

module.exports = app => {
  app.get('/api/workouttargets', (request, response) => {
    handleGetWorkoutTarget(request)
      .then(workoutTargets => response.status(200).send(workoutTargets))
      .catch(error => response.sendStatus(501));
  });

  app.post('/api/workouttargets', (request, response) => {
    handlePostWorkoutTarget(request)
      .then(workoutTarget => response.status(200).send(workoutTarget))
      .catch(error => response.sendStatus(501));
  });

  app.put('/api/workouttargets', (request, response) => {
    handlePutWorkoutTarget(request)
      .then(workoutTarget => response.status(200).send(workoutTarget))
      .catch(error => response.sendStatus(501));
  });

  app.delete('/api/workouttargets/:_id', (request, response) => {
    handleDeleteWorkoutTarget(request)
      .then(workoutTarget => response.status(200).send(workoutTarget))
      .catch(error => response.sendStatus(501));
  });
};
