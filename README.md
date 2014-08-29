# object-stream-map

[![Build Status](https://travis-ci.org/watson/object-stream-map.png)](https://travis-ci.org/watson/object-stream-map)

Perform a map on a stream of objects.

Let's say you are consuming an array of objects in the form of a stream.
This node module lets you return a named property for each object in the
stream, in reality performing a map on the entire array.

In other words it can convert this:

```javascript
[{ foo: 1 }, { foo: 2 }, { foo: 3 }]
```

To this:

```javascript
[1, 2, 3]
```

## Installation

```
npm install object-stream-map
```

## Example usage

```javascript
var map = require('object-stream-map');

objectStream        // `objectStream` is a Readable stream pushing an array of objects
  .pipe(map('foo')) // `map('foo')` will forward the `foo` property for each object
  .pipe(process.stdout);
```

## Real world example

Let's say you have a MongoDB database with a collection of users:
```javascript
{ _id: 1, name: 'Tobias', age: 42 }
{ _id: 2, name: 'Thomas', age: 32 }
{ _id: 3, name: 'Mathias', age: 30 }
{ _id: 4, name: 'Ed', age: 24 }
```

Now let's say you want to pipe all their names to STDOUT. With
*object-stream-map* you could quickly write it like this:

```javascript
var map = require('object-stream-map');
var db = require('mongojs')('my-database', ['users']);

db.users.find({}).pipe(map('name')).pipe(process.stdout);
```

The above code will pipe the following to STDOUT:
```
Tobias
Thomas
Mathias
Ed
```

## License

MIT
