const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const user = require('./components/user/network');

const app = express();
app.use(bodyParser.json());

app.use('/api/user', user);

app.listen(config.API.PORT, () => {
  console.log('Listening on port', config.API.PORT);
});