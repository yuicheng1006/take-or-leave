'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"https://take-or-leave.herokuapp.com"',
  apiKey: '"AIzaSyCpE41f-O3QBpiqJ_CfuPdcY83vWlFXhg0"',
  authDomain: '"takeorleave-45e27.firebaseapp.com"',
  databaseURL: '"https://takeorleave-45e27.firebaseio.com"',
  projectId: '"takeorleave-45e27"',
  storageBucket: '"takeorleave-45e27.appspot.com"',
  messagingSenderId: '"365089696019"',
  appId: '"1:365089696019:web:65a9a57498cfd52fe292e6"',

})
