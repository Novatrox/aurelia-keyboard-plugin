define(['exports', 'aurelia-framework', '../akp-event-handler', '../akp-configuration'], function (exports, _aureliaFramework, _akpEventHandler, _akpConfiguration) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AKPCustomAttribute = undefined;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
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

	var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

	var AKPCustomAttribute = exports.AKPCustomAttribute = (_dec = (0, _aureliaFramework.customAttribute)('keybind'), _dec2 = (0, _aureliaFramework.inject)(Element, _akpEventHandler.AKPEventHandler, _akpConfiguration.AKPConfiguration), _dec(_class = _dec2(_class = (_class2 = function () {
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
			if (this.global === "true") {
				this.global = true;
			}

			if (this.trigger.indexOf(",") !== -1) {
				var triggers = this.trigger.split(",").map(function (tr) {
					return tr.trim();
				});
				triggers.forEach(function (trigger) {
					this.eventHandler.registerKey(trigger, this.delegate, this.element, this.global ? null : this.element, this.prevent);
				}, this);
			} else {
				this.eventHandler.registerKey(this.trigger, this.delegate, this.element, this.global ? null : this.element, this.prevent);
			}
		};

		AKPCustomAttribute.prototype.detached = function detached() {
			if (this.global) {

				if (this.trigger.indexOf(",") !== -1) {
					var triggers = this.trigger.split(",").map(function (tr) {
						return tr.trim();
					});
					triggers.forEach(function (trigger) {
						this.eventHandler.unregisterKey(trigger);
					}, this);
				} else {
					this.eventHandler.unregisterKey(this.trigger);
				}
			}
		};

		return AKPCustomAttribute;
	}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'trigger', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'delegate', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'prevent', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'global', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	})), _class2)) || _class) || _class);
});