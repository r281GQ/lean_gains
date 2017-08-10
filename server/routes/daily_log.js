const {
  handleGetDailyLogs,
  handlePostDailyLogs,
  handleGetDailyLogDates,
  handleLatestMeasurements,
  handlePutDailyLogs,
  handleDeleteDailyLogs
} = require('./../services/daily_log');
const withAuth = require('./../services/auth_middleware');

module.exports = app => {
  app.get('/api/dailylogs', withAuth, (request, response) => {
    handleGetDailyLogs(request)
      .then(logs => response.status(200).send(logs))
      .catch(error => console.log(error));
  });

  app.get('/api/dailylogs/dates', withAuth, (request, response) => {
    handleGetDailyLogDates(request)
      .then(dates => response.status(200).send(dates))
      .catch(error => console.log(error));
  });

  app.post('/api/dailylogs', withAuth, (request, response) => {
    handlePostDailyLogs(request)
      .then(log => response.status(201).send(log))
      .catch(err => console.log(error));
  });

  app.put('/api/dailylogs', withAuth, (request, response) => {
    handlePutDailyLogs(request)
      .then(log => response.status(200).send(log))
      .catch(error => console.log(error));
  });

  app.delete('/api/dailylogs/:_id', withAuth, (request, response) => {
    handleDeleteDailyLogs(request)
      .then(log => response.status(200).send(log))
      .catch(error => console.log(error));
  });

  app.get('/api/latestmeasurements', withAuth, (request, response) => {
    handleLatestMeasurements(request)
      .then(latest => response.status(200).send(latest))
      .catch(error => console.log(error));
  });
};
