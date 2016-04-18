'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AKPConfiguration = undefined;
exports.configure = configure;

var _akpConfiguration = require('./akp-configuration');

Object.defineProperty(exports, 'AKPConfiguration', {
  enumerable: true,
  get: function get() {
    return _akpConfiguration.AKPConfiguration;
  }
});
function configure(aurelia, callback) {
  aurelia.globalResources('./akp-custom-attribute');
  var config = new _akpConfiguration.AKPConfiguration(aurelia);
  if (callback !== undefined && typeof callback === 'function') {
    callback(config);
    return;
  }
  config.useDefaults();
}