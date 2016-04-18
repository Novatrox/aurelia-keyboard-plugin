'use strict';

System.register(['aurelia-framework', './akp-event-handler', './akp-configuration'], function (_export, _context) {
	var customAttribute, inject, bindingMode, bindable, AKPEventHandler, AKPConfiguration, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, AKPCustomAttribute;

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

	return {
		setters: [function (_aureliaFramework) {
			customAttribute = _aureliaFramework.customAttribute;
			inject = _aureliaFramework.inject;
			bindingMode = _aureliaFramework.bindingMode;
			bindable = _aureliaFramework.bindable;
		}, function (_akpEventHandler) {
			AKPEventHandler = _akpEventHandler.AKPEventHandler;
		}, function (_akpConfiguration) {
			AKPConfiguration = _akpConfiguration.AKPConfiguration;
		}],
		execute: function () {
			_export('AKPCustomAttribute', AKPCustomAttribute = (_dec = customAttribute('keybind', bindingMode.twoWay), _dec2 = inject(Element, AKPEventHandler, AKPConfiguration), _dec(_class = _dec2(_class = (_class2 = function () {
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
			}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'trigger', [bindable], {
				enumerable: true,
				initializer: null
			}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'delegate', [bindable], {
				enumerable: true,
				initializer: null
			}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'prevent', [bindable], {
				enumerable: true,
				initializer: null
			}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'global', [bindable], {
				enumerable: true,
				initializer: null
			})), _class2)) || _class) || _class));

			_export('AKPCustomAttribute', AKPCustomAttribute);
		}
	};
});