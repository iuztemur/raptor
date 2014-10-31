var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher');
var util = require('util');

var tokenMatch = 'Performance Entry: ';

var Parser = function() {
  var parser = this;

  EventEmitter.call(this);

  this.dispatcher = new Dispatcher();
  this.dispatcher.on('entry', function(entry) {
    if (entry.message.indexOf(tokenMatch) !== -1) {
      parser.emit('performanceentry', parser.parse(entry));
    }
  });
  this.dispatcher.start();
};

Parser.events = ['performanceentry'];

util.inherits(Parser, EventEmitter);

Parser.prototype.parse = function(entry) {
  var message = entry.message;
  var parts = message
    .replace(tokenMatch, '')
    .replace('Content JS LOG: ', '')
    .split('|');

  var performanceEntry = {
    entryType: parts[0].substr(parts[0].indexOf),
    name: parts[1],
    startTime: parseFloat(parts[2]),
    duration: parseFloat(parts[3]),
    epoch: parseFloat(parts[4])
  };

  var contextIndex = performanceEntry.name.indexOf('@');

  if (contextIndex === -1) {
    performanceEntry.context =
      entry.tag === 'GeckoConsole' ? 'System' : entry.tag;
  } else {
    var name = performanceEntry.name.split('@');

    performanceEntry.name = name[0];
    performanceEntry.context = name[1];
  }

  return performanceEntry;
};

Parser.prototype.end = function() {
  this.dispatcher.end();
  this.removeAllListeners();
};

module.exports = Parser;