var express    = require('express');
var morgan     = require('morgan')
var mongojs    = require('mongojs');
var bodyParser = require('body-parser');
var weight     = require('./routes/weight');
var user       = require('./routes/user');
var game       = require('./routes/game');

var app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));


app.get('/v1/weight', weight.findAll);
app.post('/v1/weight', weight.addOne);
app.get('/v1/weight/:uid', weight.findByUid);
app.put('/v1/weight/:id', weight.updateById);
app.delete('/v1/weight/:id', weight.deleteById);

app.get('/v1/user/:uid/game', user.getGidsByUid);

app.get('/v1/game/:gid/weight/', game.getTeamWeight);


var port = 5566;
app.listen(port);
console.log('Server is running on port ' + port);
