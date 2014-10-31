var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Phase = function(options) {
  EventEmitter.call(this);

  this.entries = [];
  this.options = options;
};

util.inherits(Phase, EventEmitter);

Phase.prototype.handle = function(event) {
  var runner = this;

  this.parser.on(event, function(entry) {
    runner.entries.push(entry);
    runner.emit(event, entry);
  });
};

Phase.prototype._end = function() {
  this.emit('end', this.entries);
  this.removeAllListeners();
};

module.exports = Phase;