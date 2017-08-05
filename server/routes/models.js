const {
  handleGetDailyLogs,
  handlePostDailyLogs,
  handleGetDailyLogDates,
  handleLatestMeasurements
} = require('./../services/dailylog');

module.exports = app => {
  app.get('/api/dailylogs', (request, response) => {
    handleGetDailyLogs(request, response)
      .then(logs => response.status(200).send(logs))
      .catch(error => console.log(error));
  });

  app.get('/api/dailylogs/dates', (request, response) => {
    handleGetDailyLogDates(request, response)
      .then(dates => response.status(200).send(dates))
      .catch(error => console.log(error));
  });

  app.post('/api/dailylogs', (request, response) => {
    handlePostDailyLogs(request, response)
      .then(log => response.status(201).send(log))
      .catch(err => console.log(error));
  });

  app.put('/api/dailylogs', (request, response) => {});

  app.delete('/api/dailylogs', (request, response) => {});

  app.get('/api/latestmeasurements', (request, response) => {
    handleLatestMeasurements(request, response)
      .then(latest => response.status(200).send(latest))
      .catch(error => console.log(error));
  });
};
