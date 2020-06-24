'use strict';

const express = require('express');
const router = express.Router();

// FILES
const auth = require('./middleware/basic')
const UserModel = require('./models/users-model');
const User = new UserModel();

const oauth = require('./middleware/oauth');

// ROUTES
router.post('/signup', handleCreateUser);
router.post('/signin', auth, handleSignIn);
router.get('/user', handleGetUsers);
router.get('/oauth', handleOauth); //TODO: tuesday lab. - a WHOLE new thing

async function handleOauth(req, res) { //FIXME: add oauth middleware into here
  //TODO: res.cookie and other things - see demo code
  console.log(req.query.code);
  res.send('working on it');
}

//FUNCTIONS
async function handleCreateUser (req, res, next) {
  //requires a token and user to sign them up
  //req.token, req.user, res.set, res.cookie, res.send
  let userExists = await User.exists({ username: req.body.username });
  if (userExists) {
    res.send('User Already Exists');
    return; // is this necessary?
  }

  let password = await UserModel.hashPassword(req.body.password);
  console.log(password);
  let newUser = await User.create({ username: req.body.username, password: password });
  if (newUser) {
    let token = UserModel.generateToken({ username: req.body.username });
    console.log(token);
    res.cookie('token', token);
    res.header('token', token);
    res.send({token, user: req.user});
  } else {
    res.status(403).send('User Invalid');
  }
}

function handleSignIn (req, res, next) {

  if (req.user) {
    let token = UserModel.generateToken({ username: req.user.username })

    console.log('User was signed in');
    // res.cookie, res.send
    res.cookie('token', token);
    res.header('token', token);
    res.send(token);
  } else {
    res.status(403).send('Invalid');
  }
}

async function handleGetUsers (req, res, next) {
  let allUsers = await User.get();
  res.send(allUsers);
}

// async function handleOauth (req, res, next) {
// TODO: tuesday lab
// }

module.exports = router;
