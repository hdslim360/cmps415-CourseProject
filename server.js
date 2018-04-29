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
    // So alot of this code was copied from here
    //https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/nodeSimpleExample.js
    //and modified :)

    const mongodb = require('mongodb');

    // Create seed data
    
    let seedData = [
      {   
        _id: 1,
        name: 'John',   
        age: 30,   
        health: 'good',   
        doctor: 'Love',

      },   
      {
        _id:2,
        name: 'Patrick',
        age: 25,
        health: 'good',
        doctor: 'Feel Good',

      },
      {
        _id:3,
        name: 'Ghassan',
        age: 30,
        health: 'good',    
        doctor: 'Evil',

      }    
    ];
    

    var locked = false; //Global variable to check to see if a user can access the database
    //Basically this first iteration I came up with locks the entire DB if someone is using it.
    //Very bad practice right now but it's a start
    
    let uri = 'mongodb://heroku_llk6v74p:bd13o2m17duot0tjfpd2ad4r13@ds111565.mlab.com:11565/heroku_llk6v74p';
    console.log('good1')
    mongodb.MongoClient.connect(uri, function(err, client) {
    
      if(err) throw err;
      console.log('good2')
    
      let db = client.db('heroku_llk6v74p')
      
   
      
      let emrs = db.collection('emr')
      db.emrs.createIndex( { "lastModifiedDate": Date.now }, { expireAfterSeconds: 60 } )
       //emrs.insert(seedData, function(err, result) {

        //if(err) throw err;                              //
        //});                                               //In case we need to drop or resead the db
                                                          //
      
      // emrs.drop(function (err) {
        // if(err) throw err;
       //});
              emrs.find().toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                
              });


              //--------------------------------------------------------------------
              //So a lot of these crud functions were inspired from
              //https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp
              //https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp
              //https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp
              //https://www.w3schools.com/nodejs/nodejs_mongodb_delete.asp
              //It's not like copied verbatim. Just Where we got the ideas for the functions from
              //-----------------------------------------------------------------

              var timeStamp;

              //in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/:id and add an int Id for the param
app.get('/api/emr/:id', (req, res)=> {    
  var userId = req.param('id');
  userId = parseInt(userId);

  emrs.find( { _id: userId }).toArray(function(err, result){// find Doc U want to edit
    if(err) throw err;
    console.log(result);
    
   });

   //if ts == null we good!
timeStamp = Date.now;
  var query = { _id: userId }; // insert time stamp save to global variable 
  
  var newvalues = { $set: {ts:timeStamp}};
  emrs.updateOne(query, newvalues, function(err, result) {
    if (err) throw err;
    emrs.find( { _id: userId }).toArray(function(err, result){
      if(err) throw err;
      console.log(result);
     });
  });



   emrs.find( { _id: userId }).toArray(function(err, result){
    if(err) throw err;
    locked = false; // turns lock off
    res.status(200).send(result);
   });
  
});
          
  //go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr up will appear.  
app.get('/api/emr', (req, res)=> { 
  emrs.find().toArray(function(err, result) { // no lock here. just trying read data is okay
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
    
});

//in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/create/:id/:age/:name/:health/:doctor add params of course
app.post('/api/emr/create/:id/:age/:name/:health/:doctor', (req, res)=> {
  if(locked){ // if locked return locked
    res.status(200).send("locked")
    return;
  }
  locked = true; // lock the db
  var id = req.param('id');
  var age = req.param('age');
  var name = req.param('name');
  var health = req.param('health');
  var doctor = req.param('doctor')
  id = parseInt(id);
  age = parseInt(age);
  var data = [
    {   
      _id: id,
      name: name,   
      age: age,   
      health: health,   
      doctor: doctor   
    },]
    emrs.insert(data, function(err, result) {
      if (err) throw err;
      locked = false; // turn the lock off
      res.status(200).send(data);
    }); 
});

//go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr/:Id and enter params
app.delete('/api/emr/:id', (req, res)=> {
  if(locked){ // if locked return locked
    res.status(200).send("locked")
    return;
  } 
  locked = true;
  var userId = req.param('id')
  userId = parseInt(userId);
  var myquery = { _id: userId };
  emrs.deleteOne(myquery, function(err, result) {
    if (err) throw err;  
    locked = false; // turn the lock off
    res.status(200).send(result);
  });
  
});

   //go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr/:Id and enter params
app.put('/api/emr/update/:id',(req, res) =>{
  if(locked){// if locked return locked
    res.status(200).send("locked")
    return;
  } 
  locked = true;
  var id = req.param('id');
  var age = req.param('age');
  var name = req.param('name');
  var health = req.param('health');
  var doctor = req.param('doctor')
  patientId = parseInt(id);
  age = parseInt(age);
  var query = { _id: patientId };
  var newvalues = { $set: {name: name, age: age, health: health, doctor: doctor} };
  emrs.updateOne(query, newvalues, function(err, result) {
    if (err) throw err;
    emrs.find( { _id: patientId }).toArray(function(err, result){
      if(err) throw err;
      locked = false; // turn the lock off
      res.status(200).send(result);
     });
  });
});


            });
          }
        );
 