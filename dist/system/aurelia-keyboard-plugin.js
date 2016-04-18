'use strict';

System.register(['./akp-configuration'], function (_export, _context) {
  var AKPConfiguration;
  return {
    setters: [function (_akpConfiguration) {
      AKPConfiguration = _akpConfiguration.AKPConfiguration;
      var _exportObj = {};
      _exportObj.AKPConfiguration = _akpConfiguration.AKPConfiguration;

      _export(_exportObj);
    }],
    execute: function () {
      function configure(aurelia, callback) {
        aurelia.globalResources('./akp-custom-attribute');
        var config = new AKPConfiguration(aurelia);
        if (callback !== undefined && typeof callback === 'function') {
          callback(config);
          return;
        }
        config.useDefaults();
      }

      _export('configure', configure);
    }
  };
});