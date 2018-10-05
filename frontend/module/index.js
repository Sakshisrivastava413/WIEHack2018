const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var routes = require('./routes/api');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '100mb'
}));
app.use(bodyParser.json({
  limit: '1000mb'
}));
app.use(cors());

app.use('/api', routes);

app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000, function() {
  console.log("listening to the port 4000");
});