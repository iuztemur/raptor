var Phase = require('./phase');
var device = require('../device');
var util = require('util');
var Parser = require('../parsers/performance');

var Reboot = function(options) {
  var runner = this;

  Phase.call(this, options);

  device
    .reboot()
    .then(function() {
      runner.parser = new Parser();
      runner.handle('performanceentry');
      runner.emit('ready');
    });
};

util.inherits(Reboot, Phase);

Reboot.prototype.end = function() {
  this.parser.end();
  this._end();
};

module.exports = Reboot;