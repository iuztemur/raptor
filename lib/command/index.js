var exec = require('./exec');
var debug = require('debug')('raptor:command');

/**
 * API for building up and executing shell commands
 * @param {string} [initialCommand] An optional first command
 * @constructor
 */
var Command = function(initialCommand) {
  this.builder = initialCommand ? [initialCommand] : [];
};

/**
 * Append content to the command builder
 * @param {string} command
 * @returns {Command}
 */
Command.prototype.raw = function(command) {
  this.builder.push(command);
  return this;
};

/**
 * Append a command to be run against `adb shell <command>`
 * @param {string} command
 * @returns {Command}
 */
Command.prototype.adbShell = function(command) {
  this.builder.push('adb shell ' + command);
  return this;
};

/**
 * Append an AND (&&) to the builder with an optional AND-ed command
 * @param {string} [command]
 * @returns {Command}
 */
Command.prototype.and = function (command) {
  this.builder.push('&&');
  if (command) {
    this.builder.push(command);
  }
  return this;
};

/**
 * Append a PIPE (|) to the builder with an optional PIPE-ed command
 * @param {string} [command]
 * @returns {Command}
 */
Command.prototype.pipe = function(command) {
  this.builder.push('|');
  if (command) {
    this.builder.push(command);
  }
  return this;
};

/**
 * Append a command to be run against `adb <command>`
 * @param {string} command
 * @returns {Command}
 */
Command.prototype.adb = function(command) {
  this.builder.push('adb ' + command);
  return this;
};

/**
 * Get the stringified value of the current command build
 * @returns {string}
 */
Command.prototype.value = function() {
  return this.builder.join(' ');
};

/**
 * Append a command to be run against `echo <command>`
 * @param command
 * @returns {Command}
 */
Command.prototype.echo = function(command) {
  this.builder.push('echo ' + command);
  return this;
};

/**
 * Append an environment variable to be run as `<name>=<command>`
 * @param {string} name Environment variable name
 * @param {string} command Environment variable value
 * @returns {Command}
 */
Command.prototype.env = function(name, command) {
  this.builder.push(name + '=' + command);
  return this;
};

/**
 * Execute the built command in a child process
 * @returns {Promise}
 */
Command.prototype.exec = function() {
  var command = this.value();
  debug('[Executing Command] %s', command);
  return exec(command);
};

module.exports = Command;