define(['exports', './akp-options'], function (exports, _akpOptions) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AKPConfiguration = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var AKPConfiguration = exports.AKPConfiguration = function () {
		function AKPConfiguration(aurelia) {
			_classCallCheck(this, AKPConfiguration);

			this.aurelia = aurelia;
			this.settings = _akpOptions.akpOptions;
		}

		AKPConfiguration.prototype.useDefaults = function useDefaults() {
			this.settings = Object.assign(this.settings, _akpOptions.akpOptions);
			return this;
		};

		return AKPConfiguration;
	}();
});