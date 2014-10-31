var Promise = require('promise');
var shell = require('shelljs');

var Device = {

  reboot: function() {
    return new Promise(function(resolve, reject) {
      shell.exec('adb reboot && adb wait-for-device', {
        async: true,
        silent: true
      }, function(code) {
        if (code) {
          return reject(code);
        }

        resolve();
      });
    });
  }

};

module.exports = Device;