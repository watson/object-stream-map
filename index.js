'use strict';

var through2 = require('through2');

module.exports = function (attr) {
  return through2.obj(function (chunk, enc, callback) {
    this.push(chunk[attr]);
    callback();
  });
};
