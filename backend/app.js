/**
 * Stack Assignment Backend - M800
 * Backend app.js
 * Author: Francisco Aranda <farandal@gmail.com>
 */

import http from 'http';
import { env, port, ip, apiRoot, mongo } from './config';
import express from './services/express';
import mongoose from './services/mongoose';
import api from './api';
import bodyParser from 'body-parser';
const app = express(apiRoot, api);
const server = http.createServer(app);

mongoose.connect(mongo.uri);
mongoose.Promise = Promise;

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      'Express server listening on http://%s:%d, in %s mode',
      ip,
      port,
      env
    );
  });
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json({ type: 'application/*+json' }));

export default app;
