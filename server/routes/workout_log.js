const {
  handleGetWorkoutLog,
  handleGetWorkoutLogDates,
  handlePostWorkoutLogs,
  handlePutWorkoutLog,
  handleDeleteWorkoutLog
} = require('./../services/workout_log');
const withAuth = require('./../services/auth_middleware');

module.exports = app => {
  app.get('/api/workoutlogs', withAuth, (request, response) => {
    handleGetWorkoutLog(request)
      .then(logs => response.status(200).send(logs))
      .catch(error => console.log(error));
  });

  app.post('/api/workoutlogs', withAuth, (request, response) => {
    handlePostWorkoutLogs(request)
      .then(log => response.status(201).send(log))
      .catch(err => console.log(error));
  });

  app.get('/api/workoutlogs/dates', withAuth, (request, response) => {
    handleGetWorkoutLogDates(request)
      .then(dates => response.status(200).send(dates))
      .catch(error => console.log(error));
  });

  app.put('/api/workoutlogs', withAuth, (request, response) => {
    handlePutWorkoutLog(request)
      .then(log => response.status(200).send(log))
      .catch(error => console.log(error));
  });

  app.delete('/api/workoutlogs/:_id', withAuth, (request, response) => {
    handleDeleteWorkoutLog(request)
      .then(log => response.status(200).send(log))
      .catch(error => console.log(error));
  });
};
