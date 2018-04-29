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
        inUse: false,
        aId: null
      },   
      {
        _id:2,
        name: 'Patrick',
        age: 25,
        health: 'good',
        doctor: 'Feel Good',
        inUse: false,
        aId: null
      },
      {
        _id:3,
        name: 'Ghassan',
        age: 3,
        health: 'good',    
        doctor: 'Evil',
        inUse: false,
        aId: null
      }    
    ];
    


    
    let uri = 'mongodb://heroku_llk6v74p:bd13o2m17duot0tjfpd2ad4r13@ds111565.mlab.com:11565/heroku_llk6v74p';
    console.log('good1')
    mongodb.MongoClient.connect(uri, function(err, client) {
    
      if(err) throw err;
      console.log('good2')
    
      let db = client.db('heroku_llk6v74p')
    
   
    
      let emrs = db.collection('emr');


       
        //emrs.insert(seedData, function(err, result) {

        //  if(err) throw err;                              //
      //  });                                               //In case we need to drop or resead the db
      //                                                    //
      
       //emrs.drop(function (err) {
       //  if(err) throw err;
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


              //in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/:id and add an int Id for the param
app.get('/api/emr/:id/:aId', (req, res)=> {
  var use="";
  var aId = req.param('aId')
  var patientId = req.param('id');
  patientId = parseInt(patientId);
  aId = parseInt(aId);
  emrs.find( { _id: patientId },{ _id:0 ,inUse:1}).toArray(function(err, result){
    if(err) throw err;
    use = JSON.stringify(result); 
    if(use.includes("true")){
      res.status(200).send("Locked");
     }else{
      var query = { _id: patientId };
      var newvalues = { $set: {inUse:true, aId: aId} };
      emrs.updateOne(query, newvalues, function(err, result) { // insert inUse and user ID into record
          if (err) throw err;
      });
      emrs.find( { _id: patientId }).toArray(function(err, result){
        if(err) throw err;
        res.status(200).send(result);  // record is got! and is currently in use. the only person that can use it is the one with the uId
   });
  
     }  
   
    });  
});                                                                                                                                             
          
  //go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr up will appear.  
app.get('/api/emr', (req, res)=> {
  emrs.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
    
});

//in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/create/:id/:age/:name/:health/:doctor add params of course
app.post('/api/emr/create/:id/:age/:name/:health/:doctor', (req, res)=> {

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
      doctor: doctor, 
      inUse: false,
      aid: null   
    },]
    emrs.insert(data, function(err, result) {
      if (err) throw err;
      res.status(200).send(data);
    }); 
});

//go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr/:Id and enter params
app.delete('/api/emr/:id/:aId', (req, res)=> {
  var use="";
  var aId = req.param('aId');
  var patientId = req.param('id');
  patientId = parseInt(patientId);
  aId = parseInt(aId);
  emrs.find( { _id: patientId },{ _id:0 ,inUse:1}).toArray(function(err, result){
    if(err) throw err;
    use = JSON.stringify(result); 
    var myquery = { _id: patientId };
    emrs.deleteOne(myquery, function(err, result){});
    if(use.includes(aId)){
      emrs.deleteOne(myquery, function(err, result) {
        if (err) throw err;  
        res.status(200).send("The record has been Deleted");
      });
    }else{
      res.status(200).send("The Record is in use and connot be deleted");
    }
  });
});


   //go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr/:Id and enter params
app.put('/api/emr/update/:id/:aId',(req, res) =>{
  var aId = req.param('aId')
  var id = req.param('id');
  var age = req.param('age');
  var name = req.param('name');
  var health = req.param('health');
  var doctor = req.param('doctor')
  patientId = parseInt(id);
  age = parseInt(age);
  aId = parseInt(aId);
  var use="";
  
  emrs.find( { _id: patientId },{ _id:0 ,inUse:1}).toArray(function(err, result){
    if(err) throw err;
    use = JSON.stringify(result); 
    if((use.includes("true"))&&(use.includes(aId))){
      var query = { _id: patientId };
      var newvalues = { $set: {name: name, age: age, health: health, doctor: doctor, inUse: false, aId: null} };
      emrs.updateOne(query, newvalues, function(err, result) { // insert inUse and user ID into record
          if (err) throw err;
      });
      emrs.find( { _id: patientId }).toArray(function(err, result){
        if(err) throw err;
        res.status(200).send(result); 
   });
  
     }else{
       res.status(200).send("The record is in use");
     }

  });
});


            
          
    });
  })      