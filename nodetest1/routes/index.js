var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET helloWorld page */

router.get('/helloworld',function(req,res){
  res.render('helloworld',{title:'Hello,World!'});
});

/*Get New User page */
router.get('/newuser', function(req,res){
  res.render('newuser',{title:'Add New User'});
});

/* Post to Add User service */
router.post('/adduser',function(req,res){

  //set internal DB variable
  var db = req.db;

  //Get form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //set collection
  var collection = db.get('usercollection');

  //submit to the DB
  collection.insert({
    "username": userName,
    "email": useremail
  }, function(err,doc){
    if(err){
      //if it fails, return error
      res.send("There was a problem adding the information to the database.");
    }
    else{
      //and forward to sucess page
      res.redirect("userlist");
    }
});

});

module.exports = router;


/* Get the Userlist page */
router.get('/userlist', function(req,res){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist',{
      "userlist": docs
    });
  });
});
