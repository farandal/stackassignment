import { Router } from 'express';
import express from 'express';

const apidocs = new Router();

apidocs.get('/*', function(req, res) {
  const path = req.params[0] ? req.params[0] : 'index.html';
  res.sendfile(path, { root: './apidocs' });
});

export default apidocs;
