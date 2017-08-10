const {
  handlePutCalorieLog,
  handleGetCalorieLog
} = require('./../services/calorie_log');
const withAuth = require('./../services/auth_middleware');

module.exports = app => {
  app.put('/api/calorielogs', withAuth, (request, response) => {
    handlePutCalorieLog(request)
      .then(log => response.status(200).send(log))
      .catch(error => console.log(error));
  });

  app.get('/api/calorielogs', withAuth, (request, response) => {
    handleGetCalorieLog(request)
      .then(logs => response.status(200).send(logs))
      .catch(error => console.log(error));
  });
};
