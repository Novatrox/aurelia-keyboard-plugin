'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.KeyEvent = exports.AKPEventHandler = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _aureliaPal = require('aurelia-pal');

var _akpConfiguration = require('./akp-configuration');

var _mousetrap = require('mousetrap');

var mt = _interopRequireWildcard(_mousetrap);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AKPEventHandler = exports.AKPEventHandler = (_dec = (0, _aureliaFramework.inject)(_aureliaPal.DOM, _akpConfiguration.AKPConfiguration), _dec(_class = function () {
	function AKPEventHandler(dom, config) {
		_classCallCheck(this, AKPEventHandler);

		this.defaultPreventInputBubble = false;
		this.registeredKeys = [];

		this.DOM = dom;
		var mouseTrap = new Mousetrap();
		this.preventBubbleClass = config.settings.preventBubbleClass;
		this.defaultPreventInputBubble = config.settings.defaultPreventInputBubble;
		var self = this;
		mouseTrap.stopCallback = function (e, element) {
			if (self.defaultPreventInputBubble) {
				return element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA' || element.contentEditable && element.contentEditable === 'true';
			}

			if ((' ' + element.className + ' ').indexOf(self.preventBubbleClass) > -1) {
				return true;
			}
			return false;
		};
		this.mouseTrap = mouseTrap;
	}

	AKPEventHandler.prototype.unregisterKey = function unregisterKey(key) {
		var _this = this;

		var lastIndex = this.registeredKeys.map(function (key) {
			return key.trigger;
		}).lastIndexOf(key);
		this.registeredKeys.splice(lastIndex, 1);
		this.mouseTrap.unbind(key);
		lastIndex = this.registeredKeys.map(function (key) {
			return key.trigger;
		}).lastIndexOf(key);
		if (lastIndex !== -1) {
			(function () {
				var keyEvent = _this.registeredKeys[lastIndex];

				_this.mouseTrap.bind(keyEvent.trigger, function (e) {
					if (keyEvent.preventDefault) {
						e.preventDefault();
					}
					var res = keyEvent.callback({ args: e });
					if (res !== undefined && typeof res === 'boolean') {
						return res;
					}
				});
			})();
		}
	};

	AKPEventHandler.prototype.registerKey = function registerKey(key, callback, scope, preventDefault) {
		if (scope) {
			var mouseTrap = new Mousetrap(scope);
			mouseTrap.bind(key, function (e) {
				if (preventDefault) {
					e.preventDefault();
				}
				var res = callback({ args: e });
				if (res !== undefined && typeof res === 'boolean') {
					return res;
				}
			});
		} else {
			this.registeredKeys.push(new KeyEvent(key, callback, preventDefault));
			this.mouseTrap.bind(key, function (e) {
				if (preventDefault) {
					e.preventDefault();
				}
				var res = callback({ args: e });
				if (res !== undefined && typeof res === 'boolean') {
					return res;
				}
			});
		}
	};

	return AKPEventHandler;
}()) || _class);

var KeyEvent = exports.KeyEvent = function KeyEvent(trigger, callback, preventDefault) {
	_classCallCheck(this, KeyEvent);

	this.trigger = trigger;
	this.callback = callback;
	this.preventDefault = preventDefault;
};