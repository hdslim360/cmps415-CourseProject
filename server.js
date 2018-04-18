//Jeremy Slimmer && Spencer Shaws

var express = require('express');
var chalk = require('chalk');
var app = express();
var router = express.Router();

router.get('/test', function(req, res) {
    res.status(200).send('Hello world');
});

app.use('/api', router);

app.listen(process.env.PORT ||5000, function(err) {
    if (err) {
        console.log(chalk.red(err));
    } else {
        console.log(chalk.blue('Are you ready to rock!?!'));
    }
});

 var emr = {"EMR":[{"id":0, "name":"John", "age":30, "health":"Good","doctor":"Feel Good" },{"id":1, "name":"Jim", "age":25, "health":"Okay","doctor":"Evil" }]};

//go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr up will appear.  

app.get('/api/emr', (req, res)=> {
    res.status(200).send(emr);
});


//in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/:id and add an int Id for the param
app.get('/api/emr/:id', (req, res)=> {                  
    var userId = req.param('id')
     emr.EMR.find(item => item.id === userId);
    res.send(emr.EMR[userId]);
    res.status(500).send("Not found");
});

//in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/create/:id/:age/:name/:health/:doctor add params of course

app.post('/api/emr/create/:id/:age/:name/:health/:doctor', (req, res)=> {

    var id = req.param('id');
    var age = req.param('age');
    var name = req.param('name');
    var health = req.param('health');
    var doctor = req.param('doctor')
    emr.EMR.push({"id":id, "name":name, "age":age, "health":health,"doctor":doctor });
    
    res.status(200).send(emr);
});

app.delete('/api/emr/:id', (req, res)=> {                  
    var userId = req.param('id')
    emr.EMR.find(item => item.id === userId);
    res.send(emr.EMR[userId]);
    emr.EMR[userId] = null;
    res.status(500).send("Not found");
});

