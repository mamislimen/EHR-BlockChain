var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const axios = require('axios');
var config = require('./config');
var VerifyToken = require('./VerifyToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../Models/user');
var ids=[];
router.post('/logins', function(req, res) {

  User.findOne({ login: req.body.login }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.post ('/login',function(req,res)
{
 var auth= false;
 var token= null;
 var login=req.body.login;
 var password=req.body.password;
 
  axios.get('http://192.168.75.137:3000/api/model.Patient')
  .then(function (response) {

   
  let crediential=[]
  
  response.data.forEach(function(user) {
  
    if(user.username===login && user.password===password)
    crediential.push(user);
   
});
 token = jwt.sign({ id: crediential[0].patientId }, config.secret, {
  expiresIn: 86400 // expires in 24 hours
});
    res.status(200).send({ auth: true, token: token });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.status(200).send("erreur");
  })
  .then(function () {
    // always executed
  });

  
})
router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
     
    User.create({
      login : req.body.login,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });

  router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });
  router.get('/card', function(req, res) {
  
    res.status(200).send(ids);
    ids=[];
  });

  router.get('/card/:id', function(req, res) {
    ids.push(req.params.id);
    console.log(req.params.id);
    res.status(200).send({ id: req.params.id });
  });

router.get('/me',VerifyToken, function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token)
     return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
  });

  module.exports = router;