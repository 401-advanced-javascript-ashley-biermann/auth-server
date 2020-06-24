'use strict';

const superagent = require('superagent');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const cors = require('cors');

// FIXME: comes from whatever oauth service that I use
const tokenUrl = ''; //FIXME: URL from the docs of oauth server .. probalby like access token at the end
const remoteUserUrl = ''; //URL to request user data (make requests on behalf of the user)
const CLIENT_ID = ''; // process.env.CLIENT_ID //TODO: put these in .env
const CLIENT_SECRET = ''; // process.env.CLIENT_SECRET //TODO: DO THIS
const apiServer = ''; // redirect URL ... 'http://localhost:3000/oauth';

let SECRET = process.env.SECRET;

module.exports = async function authorize (req, res, next) {
  let code = req.query.code;

  // format request back to service
  try {
    let access_token = await exchangeCodeForToken(code);
    console.log('ACCESS TOKEN : ' + access_token);

    let user = await getRemoteUserInfo(access_token);
    console.log('OAuth User: ', user.body);

//FIXME: check against class demo code
    let appUser = await getUser(user.body);
    console.log('OUR APP USER: ', appUser);
    
    req.user = appUser.user;
    req.token = appUser.token;
    next();
  } catch (e) {
    // console.log(e);
    next(e);
  }
}

// service provides a CODE => (we need to make it a) TOKEN
async function exchangeCodeForToken() {
  let tokenResponse = await superagent.post(tokenUrl).send({
    code: code,
    client_id: CLIENT_ID, //FIXME: this will break until CLIENT_ID are in .env file
    client_secret: CLIENT_SECRET,
    redirect_uri: apiServer,
    grant_type: 'authorization_code'
  });


  let access_token = tokenResponse.body.access_token;
  return access_token;
}

// exchaning TOKEN for user information
async function getRemoteUserInfo() {
  let userResponse = await superagent.get(remoteUserUrl)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);

  let user = userResponse;

  return user;
}

// Do proprietary (user our own server resources) user stuff
async function getUser(user) {

    let userObject = {
      username: user.login,
      password: await bcrypt.hash('oauthuserpassword', 5) // FIXME: this might need a work around to not having an actual password
    }

    let token = await jwt.sign(userObject, SECRET);
    // let User = await user.save(userObject); //TODO: Use some mongo method here to get user to save
    // let token = users.generateToek(User);

    return { user: userObject, token };
}
