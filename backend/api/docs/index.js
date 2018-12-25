import { Router } from 'express';
import express from 'express';

const docs = new Router();

docs.get('/*', function(req, res) {
  const path = req.params[0] ? req.params[0] : 'index.html';
  res.sendfile(path, { root: './out' });
});

export default docs;
