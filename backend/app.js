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

export default app;
