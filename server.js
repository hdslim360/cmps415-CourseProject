var express = require('express');
var chalk = require('chalk');
var app = express();
var router = express.Router();

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

// emr is a hard coded electronic medical record object. Buris still didn't email me about what the objects should contain 
var emr = [{"id":0, "name":"John", "age":30, "health":"Good" },{"id":1, "name":"Jim", "age":25, "health":"Okay" }]

//go to postman and type http://localhost:1069/api/emr and up will appear
//So now we just have to have it grab some json obects and it will spit them out
app.get('/api/emr', (req, res)=> {
    res.status(200).send(emr);
});


//in postman, type http://localhost:1069/api/emr/:Id/  IMPORTANT: this post on stack overflow really helped. The accepted answer really helped me 
app.get('/api/emr/:id', (req, res)=> {                  //with doing parameters with postman https://stackoverflow.com/questions/37189780/how-to-send-http-url-parameters-in-postman
    var userId = req.param('id')
     for(var i = 0; i < emr.length; i++){    //loop through and try to find a match 
         if(emr[i].id == userId){
             res.send(emr[i]);    
         }
    }
    res.status(500).send("Not found")
});

//Now we just have to store the objects in memory and make a POST request :)