define(['exports', 'aurelia-framework', '../akp-event-handler', '../akp-configuration'], function (exports, _aureliaFramework, _akpEventHandler, _akpConfiguration) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AKPCustomAttribute = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _dec2, _class;

	var AKPCustomAttribute = exports.AKPCustomAttribute = (_dec = (0, _aureliaFramework.customAttribute)('keyblock'), _dec2 = (0, _aureliaFramework.inject)(Element, _akpEventHandler.AKPEventHandler, _akpConfiguration.AKPConfiguration), _dec(_class = _dec2(_class = function () {
		function AKPCustomAttribute(element, eventHandler) {
			_classCallCheck(this, AKPCustomAttribute);

			this.element = element;
			this.eventHandler = eventHandler;
		}

		AKPCustomAttribute.prototype.attached = function attached() {
			this.eventHandler.registerBlock(this.element);
		};

		AKPCustomAttribute.prototype.detached = function detached() {
			this.eventHandler.unregisterBlock(this.element);
		};

		return AKPCustomAttribute;
	}()) || _class) || _class);
});