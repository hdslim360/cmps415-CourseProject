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
    const mongodb = require('mongodb');

    // Create seed data
    
    let seedData = [
      {   
        decade: '1970s',   
        artist: 'Debby Boone',   
        song: 'You Light Up My Life',   
        weeksAtOne: 10    
      },   
      {
        decade: '1980s',
        artist: 'Olivia Newton-John',
        song: 'Physical',
        weeksAtOne: 10
      },
      {
        decade: '1990s',
        artist: 'Mariah Carey',
        song: 'One Sweet Day',    
        weeksAtOne: 16
      }    
    ];
    
    // Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname
    
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
       * First we'll add a few songs. Nothing is required to create the
       * songs collection; it is created automatically when we insert.
       */
    
      let songs = db.collection('songs');
    
       // Note that the insert method can take either an array or a dict.
    
      songs.insert(seedData, function(err, result) {
    
        if(err) throw err;
    
        /*
         * Then we need to give Boyz II Men credit for their contribution
         * to the hit "One Sweet Day".
         */
    
        songs.update(
          { song: 'One Sweet Day' },
          { $set: { artist: 'Mariah Carey ft. Boyz II Men' } },
          function (err, result) {
    
            if(err) throw err;
    
            /*
             * Finally we run a query which returns all the hits that spend 10 or
             * more weeks at number 1.
             */
    
            songs.find({ weeksAtOne : { $gte: 10 } }).sort({ decade: 1 }).toArray(function (err, docs) {
    
              if(err) throw err;
    
              docs.forEach(function (doc) {
                console.log(
                  'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
                  ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
                );
              });
    
              // Since this is an example, we'll clean up after ourselves.
              songs.drop(function (err) {
                if(err) throw err;
    
                // Only close the connection when your app is terminating.
                client.close(function (err) {
                  if(err) throw err;
                });
              });
            });
          }
        );
      });
    });
    
    
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

