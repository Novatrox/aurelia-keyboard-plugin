'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.akpOptions = exports.KeyEvent = exports.AKPEventHandler = exports.AKPCustomAttribute = exports.AKPConfiguration = undefined;

var _dec, _dec2, _class2, _desc, _value, _class3, _descriptor, _descriptor2, _descriptor3, _descriptor4, _dec3, _class5;

var _mousetrap = require('mousetrap');

var mt = _interopRequireWildcard(_mousetrap);

var _aureliaFramework = require('aurelia-framework');

var _aureliaPal = require('aurelia-pal');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

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

var AKPCustomAttribute = exports.AKPCustomAttribute = (_dec = (0, _aureliaFramework.customAttribute)('keybind', _aureliaFramework.bindingMode.twoWay), _dec2 = (0, _aureliaFramework.inject)(Element, AKPEventHandler, AKPConfiguration), _dec(_class2 = _dec2(_class2 = (_class3 = function () {
	function AKPCustomAttribute(element, eventHandler, config) {
		_classCallCheck(this, AKPCustomAttribute);

		_initDefineProp(this, 'trigger', _descriptor, this);

		_initDefineProp(this, 'delegate', _descriptor2, this);

		_initDefineProp(this, 'prevent', _descriptor3, this);

		_initDefineProp(this, 'global', _descriptor4, this);

		this.element = element;
		this.eventHandler = eventHandler;
		this.prevent = config.settings.defaultPrevent;
		this.global = config.settings.defaultGlobal;
	}

	AKPCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
		this.eventHandler.unregisterKey(this.trigger);
		var self = this;
		if (!this.delegate) {
			this.delegate = function () {
				self.element.click();
			};
		}
		if (this.global === "false") {
			this.global = false;
		}

		this.eventHandler.registerKey(this.trigger, this.delegate, this.global ? null : this.element, this.prevent);
	};

	AKPCustomAttribute.prototype.attached = function attached() {
		var self = this;
		if (!this.delegate) {
			this.delegate = function () {
				self.element.click();
			};
		}
		if (this.global === "false") {
			this.global = false;
		}

		if (this.trigger.indexOf(",") !== -1) {
			var triggers = this.trigger.split(",").map(function (tr) {
				return tr.trim();
			});
			this.trigger = triggers;
		}

		this.eventHandler.registerKey(this.trigger, this.delegate, this.global ? null : this.element, this.prevent);
	};

	AKPCustomAttribute.prototype.detached = function detached() {
		this.eventHandler.unregisterKey(this.trigger);
	};

	return AKPCustomAttribute;
}(), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, 'trigger', [_aureliaFramework.bindable], {
	enumerable: true,
	initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, 'delegate', [_aureliaFramework.bindable], {
	enumerable: true,
	initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class3.prototype, 'prevent', [_aureliaFramework.bindable], {
	enumerable: true,
	initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class3.prototype, 'global', [_aureliaFramework.bindable], {
	enumerable: true,
	initializer: null
})), _class3)) || _class2) || _class2);
var AKPEventHandler = exports.AKPEventHandler = (_dec3 = (0, _aureliaFramework.inject)(_aureliaPal.DOM, AKPConfiguration), _dec3(_class5 = function () {
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
}()) || _class5);

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