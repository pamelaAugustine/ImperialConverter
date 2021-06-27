'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const pug = require('pug')

const apiRoutes = require('./routes/api');
const convertHandler = require('./controllers/convertHandler')

const runner = require('./test-runner');

const app = express();


//setting view engine to Pug 
app.set('view engine', 'pug');
app.set('views', './views/pug') // replaces process.cwd()

//So that the files contained in the public folder are served
//like the CSS

app.use('/public', express.static(process.cwd() + '/public'));

//middleware needed to parse the info from the form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


apiRoutes(app);



//Routing for API 
// apiRoutes(app);  

//404 Not Found Middleware
app.use(function (req, res, next) {

  res.status(404)
    .type('text')
    .send('Not Found');
   
});

//Start our server and tests!
app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + process.env.PORT);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        let error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for unit/functional testing
