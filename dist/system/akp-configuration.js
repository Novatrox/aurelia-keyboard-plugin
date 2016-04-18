'use strict';

System.register(['./akp-options'], function (_export, _context) {
	var akpOptions, AKPConfiguration;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_akpOptions) {
			akpOptions = _akpOptions.akpOptions;
		}],
		execute: function () {
			_export('AKPConfiguration', AKPConfiguration = function () {
				function AKPConfiguration(aurelia) {
					_classCallCheck(this, AKPConfiguration);

					this.aurelia = aurelia;
					this.settings = akpOptions;
				}

				AKPConfiguration.prototype.useDefaults = function useDefaults() {
					this.settings = Object.assign(this.settings, akpOptions);
					return this;
				};

				return AKPConfiguration;
			}());

			_export('AKPConfiguration', AKPConfiguration);
		}
	};
});