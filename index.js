const redis = require('redis');
const asyncParallel = require('async/parallel');
let client = redis.createClient();

client.on('error', function(e) {
  // Make sure we are bailing out and not giving out false data.
  throw e;
});

let subscriber = redis.createClient();
let callbacks = [];
subscriber.psubscribe('eo.*');
subscriber.on('pmessage', (pattern, channel, message) => {
  callbacks.forEach((cb) => {
    cb(channel, message);
  })
})

module.exports = {
  get: function(key, callback) {
    client.get(key, callback);
  },
  set: function(key, value, callback) {
    client.set(key, value, callback);
  },
  shutdown: function() {
    client.quit();
  },
  del: function(key, callback) {
    client.del(key, callback);
  },
  listen: (callback) => {
    callbacks.push(callback);
  },
  append: (value, callback) => {
    asyncParallel([
      client.rpush.bind(null, 'eostorequeue', value),
      client.publish.bind(null, 'eo.appended', value)
    ], (err, res) => {
      if (callback) {
        callback(err, res)
      }
    })
  }
}
