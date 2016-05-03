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
							if (preventDefault) {
								e.preventDefault();
							}
							var res = callback({ args: e });
							if (res !== undefined && typeof res === 'boolean') {
								return res;
							}
						});
					} else {
						(function () {
							_this2.registeredKeys.push(new KeyEvent(key, callback, preventDefault));
							var self = _this2;
							_this2.mouseTrap.bind(key, function (e) {

								if (!self.checkBlocks(context)) {
									return false;
								}

								if (preventDefault) {
									e.preventDefault();
								}
								var res = callback({ args: e });
								if (res !== undefined && typeof res === 'boolean') {
									return res;
								}
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