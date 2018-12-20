/* eslint-disable no-unused-vars */
/**
 * Stack Assignment Backend - M800
 * Backend config.js
 * Author: Francisco Aranda <farandal@gmail.com>
 */

import path from 'path'
import merge from 'lodash/merge'

/* https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md */
/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '.env')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port:  requireProcessEnv('PORT'),
    ip:  requireProcessEnv('IP'),
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    google: {
        clientID: requireProcessEnv('GOOGLE_OAUTH_CLIENT_ID'),
        clientSecret: requireProcessEnv('GOOGLE_OAUTH_CLIENT_SECRET'),
        callback: '/auth/google-success'
    },
    mongo: {
      uri: requireProcessEnv('MONGODB_URL'),
      options: {   
        db: {
          safe: true
        },
        options: {
          debug: true
        }
      }
    }
  },
  test: { 
  },
  development: {
  },
  production: {
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
