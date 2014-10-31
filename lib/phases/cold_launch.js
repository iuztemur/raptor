var Phase = require('./phase');
var util = require('util');

var ColdLaunch = function(options) {
  Phase.call(this, options);
};

util.inherits(ColdLaunch, Phase);

ColdLaunch.prototype.end = function() {
  this.parser.end();
  this._end();
};

module.exports = ColdLaunch;