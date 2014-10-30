var Phase = require('./phase');
var util = require('util');

var FirstTimeLaunch = function(options) {
  Phase.call(this, options);
};

util.inherits(FirstTimeLaunch, Phase);

FirstTimeLaunch.prototype.end = function() {
  this.parser.end();
  this._end();
};

module.exports = FirstTimeLaunch;