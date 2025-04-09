const express = require('express');
const router = express.Router(); 
const passport = require('passport');


router.use('/', require('./swagger'));

/* 
router.get('/', (req, res) => {
  #swagger.tags=['Hello World']
  res.send('Hello World');
}); 
*/



router.use('/staff', require('./staff'));
router.use('/department', require('./department'));
router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err) {return next(err);}
    res.redirect('/');
  });
});

// router.use('/auth', require('./auth'));

module.exports = router;






/*
// app.js or index.js
const express = require('express');
const routes = require('express').Router();
const app = express();
app.use(express.json());

app.use('/users', require('./usersRoute'));
app.use('/cards', require('./creditcardRoute'));
app.use('/transactions', require('./transactionRoute'));
app.use('/disputes', require('./disputeRoute'));
//app.use('/auth', require('./auth'));
*/