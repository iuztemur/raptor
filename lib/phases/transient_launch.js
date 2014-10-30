var Phase = require('./phase');
var util = require('util');

var Transient = function(options) {
  Phase.call(this, options);
};

util.inherits(Transient, Phase);

Transient.prototype.end = function() {
  this.parser.end();
  this._end();
};

module.exports = Transient;