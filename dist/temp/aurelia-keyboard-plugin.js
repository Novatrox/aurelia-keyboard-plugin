'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.akpOptions = exports.KeyEvent = exports.AKPEventHandler = exports.AKPConfiguration = undefined;

var _dec, _class2;

var _mousetrap = require('mousetrap');

var mt = _interopRequireWildcard(_mousetrap);

var _aureliaFramework = require('aurelia-framework');

var _aureliaPal = require('aurelia-pal');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AKPConfiguration = exports.AKPConfiguration = function () {
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
}();

var AKPEventHandler = exports.AKPEventHandler = (_dec = (0, _aureliaFramework.inject)(_aureliaPal.DOM, AKPConfiguration), _dec(_class2 = function () {
	function AKPEventHandler(dom, config) {
		_classCallCheck(this, AKPEventHandler);

		this.defaultPreventInputBubble = false;
		this.registeredKeys = [];
		this.blocks = [];

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

					if (!self.checkBlocks(context)) {
						return false;
					}
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

	AKPEventHandler.prototype.registerKey = function registerKey(key, callback, context, triggerContext, preventDefault) {
		var _this2 = this;

		if (triggerContext) {
			var mouseTrap = new Mousetrap(triggerContext);
			mouseTrap.bind(key, function (e) {

				var res = callback({ args: e });
				if (res !== undefined && typeof res === 'boolean') {
					if (!res && preventDefault) {
						e.preventDefault();
					}
					return res;
				} else if (preventDefault) {
					e.preventDefault();
				}
				return true;
			});
		} else {
			(function () {
				_this2.registeredKeys.push(new KeyEvent(key, callback, preventDefault));
				var self = _this2;
				_this2.mouseTrap.bind(key, function (e) {

					if (!self.checkBlocks(context)) {
						return false;
					}
					var res = callback({ args: e });
					if (res !== undefined && typeof res === 'boolean') {
						if (!res && preventDefault) {
							e.preventDefault();
						}
						return res;
					} else if (preventDefault) {
						e.preventDefault();
					}
					return true;
				});
			})();
		}
	};

	AKPEventHandler.prototype.checkBlocks = function checkBlocks(element) {
		for (var index = 0; index < this.blocks.length; index++) {
			var blockingElement = this.blocks[index];
			if (blockingElement == element) {
				return true;
			}
			if (element.contains(blockingElement)) {
				return false;
			}
		}
		return true;
	};

	AKPEventHandler.prototype.registerBlock = function registerBlock(element) {
		this.blocks.push(element);
	};

	AKPEventHandler.prototype.unregisterBlock = function unregisterBlock(element) {
		if (this.blocks.indexOf(element) !== -1) {
			this.blocks.splice(this.blocks.indexOf(element), 1);
		}
	};

	return AKPEventHandler;
}()) || _class2);

var KeyEvent = exports.KeyEvent = function KeyEvent(trigger, callback, preventDefault) {
	_classCallCheck(this, KeyEvent);

	this.trigger = trigger;
	this.callback = callback;
	this.preventDefault = preventDefault;
};

var akpOptions = exports.akpOptions = {
	preventBubbleClass: 'akp-nobubble',
	defaultPreventInputBubble: false,
	defaultPrevent: false,
	defaultGlobal: true
};