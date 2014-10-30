var runners = {
  'cold': './phases/cold_launch',
  'reboot': './phases/reboot'
};

var Suite = function(options) {
  var Runner = require(runners[options.phase]);

  return new Runner(options);
};

module.exports = Suite;