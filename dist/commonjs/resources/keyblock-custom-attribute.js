'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AKPCustomAttribute = undefined;

var _dec, _dec2, _class;

var _aureliaFramework = require('aurelia-framework');

var _akpEventHandler = require('../akp-event-handler');

var _akpConfiguration = require('../akp-configuration');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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