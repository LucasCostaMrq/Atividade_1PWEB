var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config'); // Importa o config.js

var indexRouter = require('./routes/index');
var produtosRouter = require('./routes/produtos');
var adicionarProdutosRouter = require('./routes/adicionarProdutos')

var app = express();

// Conectar ao MongoDB
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
  process.exit(1);
});

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Define a pasta de views
app.set('view engine', 'ejs'); // Define o EJS como motor de renderização

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/produtos', produtosRouter);
app.use('/adicionarProdutos', adicionarProdutosRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
