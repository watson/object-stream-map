'use strict';

var util = require('util');
var test = require('tape');
var Readable = require('stream').Readable;
var osm = require('./');

var ObjectStream = function () {
  Readable.call(this, { objectMode: true });
  this.n = 0;
};
util.inherits(ObjectStream, Readable);

ObjectStream.prototype._read = function () {
  if (this.n++ < 5) this.push({ foo: this.n });
  else this.push();
};

test('should map the object stream', function (t) {
  var result = [];
  (new ObjectStream())
    .pipe(osm('foo'))
    .on('data', result.push.bind(result))
    .on('end', function () {
      t.deepEqual(result, [1,2,3,4,5]);
      t.end();
    });
});
