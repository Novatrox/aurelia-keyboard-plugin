'use strict';

System.register(['aurelia-framework', 'aurelia-pal', './akp-configuration', 'mousetrap'], function (_export, _context) {
	var inject, DOM, AKPConfiguration, mt, _dec, _class, AKPEventHandler, KeyEvent;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaPal) {
			DOM = _aureliaPal.DOM;
		}, function (_akpConfiguration) {
			AKPConfiguration = _akpConfiguration.AKPConfiguration;
		}, function (_mousetrap) {
			mt = _mousetrap;
		}],
		execute: function () {
			_export('AKPEventHandler', AKPEventHandler = (_dec = inject(DOM, AKPConfiguration), _dec(_class = function () {
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
			}()) || _class));

			_export('AKPEventHandler', AKPEventHandler);

			_export('KeyEvent', KeyEvent = function KeyEvent(trigger, callback, preventDefault) {
				_classCallCheck(this, KeyEvent);

				this.trigger = trigger;
				this.callback = callback;
				this.preventDefault = preventDefault;
			});

			_export('KeyEvent', KeyEvent);
		}
	};
});