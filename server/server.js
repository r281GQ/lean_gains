const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/../build')));

app.listen(3050, () => {
  console.log('Server started on port: 3050');
});
