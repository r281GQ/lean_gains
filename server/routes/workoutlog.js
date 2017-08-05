const {
  handleGetWorkoutLog,
  handleGetWorkoutLogDates,
  handlePostWorkoutLogs
} = require('./../services/workoutlogs');

module.exports = app => {
  app.get('/api/workoutlogs', (request, response) => {
    handleGetWorkoutLog(request, response)
      .then(logs => response.status(200).send(logs))
      .catch(error => console.log(error));
  });
  app.post('/api/workoutlogs', (request, response) => {
    handlePostWorkoutLogs(request, response)
      .then(log => response.status(201).send(log))
      .catch(err => console.log(error));
  });

  app.get('/api/workoutlogs/dates', (request, response) => {
    handleGetWorkoutLogDates(request, response)
      .then(dates => response.status(200).send(dates))
      .catch(error => console.log(error));
  });
};
