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

var rawBodySaver = function(req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

export default app;
