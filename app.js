const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const currentStatic = require('./gulp/config').root;
const config = require('./config.json');
const uploadDir = config.upload;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/*
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
  user: config.db.user,
  pass: config.db.password
}).catch(e => {
  console.error(e);
  throw e;
});
*/
mongoose.connect('mongodb://estydaven:flsyldfnhs11@ds131510.mlab.com:31510/portfolio');

//подключаем модели(сущности, описывающие коллекции базы данных)
require('./models/blog');
require('./models/pic');
require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, currentStatic)));

app.use('/', require('./routes/index'));
app.use('/upload', require('./routes/upload'));
app.use('/contact', require('./routes/mail'));
app.use('/addpost', require('./routes/addpost'));

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res
    .status(404)
    .render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res
    .status(500)
    .render('500');
});

server.listen(3000, 'localhost');
server.on('listening', function () {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});