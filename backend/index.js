/**
 * Stack Assignment Backend - M800
 * Backend index.js
 * Author: Francisco Aranda <farandal@gmail.com>
 * Observations: Babel interpreter is used to interpret Es6 imports
 */

require('babel-core/register')
exports = module.exports = require('./app')
