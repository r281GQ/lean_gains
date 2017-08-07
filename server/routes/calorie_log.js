const {handlePutCalorieLog, handleGetCalorieLog} = require('./../services/calorie_log')


module.exports = app => {
  app.put('/api/calorielogs', (request, response) => {

    handlePutCalorieLog(request)
      .then(log => response.status(200).send(log))
      .catch(error => console.log(error))


  });



  app.get('/api/calorielogs', (request, response) => {

    handleGetCalorieLog(request)
      .then(log => response.status(200).send(log))
      .catch(error => console.log(error))


  });
}
