var redis = require('redis');
var client = redis.createClient();

client.on('error', function(e) {
  // Make sure we are bailing out and not giving out false data.
  throw e;
});

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
  }
}
