var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); //using bodyParser to get data for post request
app.use(bodyParser.json());

var parseFile = require('./parseFile.js');

app.set('port', (process.env.PORT || 3000));


app.post('/records', async function(req, res) {
  try{
    //Creating newPerson seperated by commas and window command to get to the next line of textfile
    var newPerson = `${req.body.lastName}, ${req.body.firstName}, ${req.body.gender}, ${req.body.color}, ${req.body.dob} \r\n`;
    fs.appendFileSync('textfile.txt', newPerson);
    res.sendStatus(200)
  } catch(e) {
    console.log(e)
    res.sendStatus(400)
  }
});

/*
Get routes for sorting of each type
Routes assume the textfile is called textfile.txt
*/
app.get('/records/gender', async function(req, res) {
  parseFile("textfile.txt", "gender", res)
});

app.get('/records/birthdate', function(req, res) {
  parseFile("textfile.txt", "birthdate", res)
});

app.get('/records/name', function(req, res) {
  parseFile("textfile.txt", "name", res)
});

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});
