var express = require('express');
var chalk = require('chalk');
var app = express();
var router = express.Router();

//var jsonall = require('./api.json')
router.get('/test', function(req, res) {
    res.status(200).send('Hello world');
});

app.use('/api', router);

app.listen(1069, function(err) {
    if (err) {
        console.log(chalk.red(err));
    } else {
        console.log(chalk.blue('Magic Happens on Port 8080'));
    }
});

// emr is a hard coded electronic medical record object
emr = [{ "name":"John", "age":30, "health":"Good" },{ "name":"Jim", "age":25, "health":"Okay" }]
//go to postman and type http://localhost:1069/api/emr and up will appear
//So now we just have to have it grab some json obects and it will spit them out
app.get('/api/emr', (req, res)=> {
    res.send(emr);
});

