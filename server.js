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
        doctor: 'Love'    
      },   
      {
        _id:2,
        name: 'Jim',
        age: 25,
        health: 'good',
        doctor: 'Feel Good'
      },
      {
        _id:3,
        name: 'Joe',
        age: 3,
        health: 'good',    
        doctor: 'Evil'
      }    
    ];
    
    
    let uri = 'mongodb://heroku_llk6v74p:bd13o2m17duot0tjfpd2ad4r13@ds111565.mlab.com:11565/heroku_llk6v74p';
    console.log('good1')
    mongodb.MongoClient.connect(uri, function(err, client) {
    
      if(err) throw err;
      console.log('good2')
      /*
       * Get the database from the client. Nothing is required to create a
       * new database, it is created automatically when we insert.
       */
    
      let db = client.db('heroku_llk6v74p')
    
      /*
       * First we'll add a few emrs. Nothing is required to create the
       * emrs collection; it is created automatically when we insert.
       */
    
      let emrs = db.collection('emr');
    
       // Note that the insert method can take either an array or a dict.

       
    
      
    
        /*
         * Then we need to give Boyz II Men credit for their contribution
         * to the hit "One Sweet Day".
         */
    
        // emrs.update(
        //   { health: 'One Sweet Day' },
        //   { $set: { age: 'Mariah Carey ft. Boyz II Men' } },
        //   function (err, result) {
    
        //     if(err) throw err;
    
            /*
             * Finally we run a query which returns all the hits that spend 10 or
             * more weeks at number 1.
             */
    
            // emrs.find({ doctor : { $gte: 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
    
            //   if(err) throw err;
    
            //   docs.forEach(function (doc) {
            //     console.log(
            //       'In the ' + doc['name'] + ', ' + doc['health'] + ' by ' + doc['age'] +
            //       ' topped the charts for ' + doc['doctor'] + ' straight weeks.'
            //     );
            //   });
              
              emrs.find().toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                
              });

              //in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/:id and add an int Id for the param
app.get('/api/emr/:id', (req, res)=> {                  
  var userId = req.param('id')
  userId = parseInt(userId);
   emrs.find( { _id: userId }).toArray(function(err, result){
    if(err) throw err;
    res.status(200).send(result);
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
      doctor: doctor   
    },]
    emrs.insert(data, function(err, result) {
      if (err) throw err;
      res.status(200).send(data);
    }); 
});

app.delete('/api/emr/:id', (req, res)=> {
  var userId = req.param('id')
  userId = parseInt(userId);
  var myquery = { _id: userId };
  emrs.deleteOne(myquery, function(err, result) {
    if (err) throw err;  
    res.status(200).send(result);
  });
  
});

    
app.put('/api/emr/update/:id',(req, res) =>{

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
      res.status(200).send(result);
     });
  });
});
               //Since this is an example, we'll clean up after ourselves.
              //  emrs.drop(function (err) {
              //    if(err) throw err;
    
               
              //  });
              //go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr up will appear.  

            });
          }
        );
    //   });
    // });

//  var emr = {"EMR":[{"id":0, "name":"John", "age":30, "health":"Good","doctor":"Feel Good" },{"id":1, "name":"Jim", "age":25, "health":"Okay","doctor":"Evil" }]};

//go to postman and type https://murmuring-reaches-97788.herokuapp.com/api/emr up will appear.  
// var emr = null;
// app.get('/api/emr', (req, res)=> {
//   emrs.find().toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     emr = reslut;
    
//   });
//     res.status(200).send(emr);
// });


//in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/:id and add an int Id for the param
// app.get('/api/emr/:id', (req, res)=> {                  
//     var userId = req.param('id')
//      emr.EMR.find(item => item.id === userId);
//     res.send(emr.EMR[userId]);
//     res.status(500).send("Not found");
// });

//in postman, type https://murmuring-reaches-97788.herokuapp.com/api/emr/create/:id/:age/:name/:health/:doctor add params of course


// app.delete('/api/emr/:id', (req, res)=> {                  
//     var userId = req.param('id')
//     emr.EMR.find(item => item.id === userId);
//     res.send(emr.EMR[userId]);
//     emr.EMR[userId] = null;
//     res.status(500).send("Not found");
// });

  // Only close the connection when your app is terminating.
                //  client.close(function (err) {
                //    if(err) throw err;
                //  });