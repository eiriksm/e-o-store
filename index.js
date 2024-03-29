let callbacks = [];
var data = {}
function start(config) {
}

module.exports = {
  all: function() {
    return data
  },
  start: start,
  get: function(key, callback) {
    callback(null, data[key])
  },
  set: function(key, value, callback) {
    data[key] = value;
    callback(null)
  },
  shutdown: function() {

  },
  del: function(key, callback) {
    delete data[key]
    callback(null)
  },
  listen: (callback) => {
    callbacks.push(callback);
  },
  append: (value, callback) => {
    callbacks.forEach((cb) => {
      cb('whocares', value);
    })
  }
}
