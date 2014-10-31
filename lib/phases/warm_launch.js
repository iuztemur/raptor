var Phase = require('./phase');
var util = require('util');

var WarmLaunch = function(options) {
  Phase.call(this, options);
};

util.inherits(WarmLaunch, Phase);

WarmLaunch.prototype.end = function() {
  this.parser.end();
  this._end();
};

module.exports = WarmLaunch;