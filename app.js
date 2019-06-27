const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const path = require('path');
const accounts = require('./api/accounts');
const mongoose = require('mongoose');
app.use(bodyParser.json())

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

// Render index page
app.get('/', (req, res) => {
  console.log("GET /");
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Render chart page
app.get('/chart', (req, res) => {
  console.log("GET /chart");
  res.sendFile(path.join(__dirname+'/chart.html'))
})

// Use api route
app.use('/api', accounts);

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`))
app.use('/static', express.static('static'))

module.exports = app;
