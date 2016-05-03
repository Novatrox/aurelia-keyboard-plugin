'use strict';

System.register(['aurelia-framework', '../akp-event-handler', '../akp-configuration'], function (_export, _context) {
	var customAttribute, inject, bindable, AKPEventHandler, AKPConfiguration, _dec, _dec2, _class, AKPCustomAttribute;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			customAttribute = _aureliaFramework.customAttribute;
			inject = _aureliaFramework.inject;
			bindable = _aureliaFramework.bindable;
		}, function (_akpEventHandler) {
			AKPEventHandler = _akpEventHandler.AKPEventHandler;
		}, function (_akpConfiguration) {
			AKPConfiguration = _akpConfiguration.AKPConfiguration;
		}],
		execute: function () {
			_export('AKPCustomAttribute', AKPCustomAttribute = (_dec = customAttribute('keyblock'), _dec2 = inject(Element, AKPEventHandler, AKPConfiguration), _dec(_class = _dec2(_class = function () {
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
			}()) || _class) || _class));

			_export('AKPCustomAttribute', AKPCustomAttribute);
		}
	};
});