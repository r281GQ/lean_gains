const {
  handleGetWorkoutLog,
  handleGetWorkoutLogDates,
  handlePostWorkoutLogs
} = require('./../services/workoutlogs');

module.exports = app => {
  app.get('/api/workoutlogs', (request, response) => {
    handleGetWorkoutLog(request)
      .then(logs => response.status(200).send(logs))
      .catch(error => console.log(error));
  });
  app.post('/api/workoutlogs', (request, response) => {
    handlePostWorkoutLogs(request)
      .then(log => response.status(201).send(log))
      .catch(err => console.log(error));
  });

  app.get('/api/workoutlogs/dates', (request, response) => {
    handleGetWorkoutLogDates(request)
      .then(dates => response.status(200).send(dates))
      .catch(error => console.log(error));
  });
};
