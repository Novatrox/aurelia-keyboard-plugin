var _dec, _class;

import { inject } from 'aurelia-framework';
import { DOM } from 'aurelia-pal';
import { AKPConfiguration } from './akp-configuration';
import * as mt from 'mousetrap';

export let AKPEventHandler = (_dec = inject(DOM, AKPConfiguration), _dec(_class = class AKPEventHandler {

	constructor(dom, config) {
		this.registeredKeys = [];

		this.DOM = dom;
		let mouseTrap = new Mousetrap();
		this.preventBubbleClass = config.settings.preventBubbleClass;
		this.defaultPreventInputBubble = config.settings.defaultPreventInputBubble;
		let self = this;
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

	unregisterKey(key) {
		let lastIndex = this.registeredKeys.map(function (key) {
			return key.trigger;
		}).lastIndexOf(key);
		this.registeredKeys.splice(lastIndex, 1);
		this.mouseTrap.unbind(key);
		lastIndex = this.registeredKeys.map(function (key) {
			return key.trigger;
		}).lastIndexOf(key);
		if (lastIndex !== -1) {
			let keyEvent = this.registeredKeys[lastIndex];

			this.mouseTrap.bind(keyEvent.trigger, function (e) {
				if (keyEvent.preventDefault) {
					e.preventDefault();
				}
				keyEvent.callback({ args: e });
			});
		}
	}

	registerKey(key, callback, scope, preventDefault) {
		if (scope) {
			let mouseTrap = new Mousetrap(scope);
			mouseTrap.bind(key, function (e) {
				if (preventDefault) {
					e.preventDefault();
				}
				callback({ args: e });
			});
		} else {
			this.registeredKeys.push(new KeyEvent(key, callback, preventDefault));
			this.mouseTrap.bind(key, function (e) {
				if (preventDefault) {
					e.preventDefault();
				}
				callback({ args: e });
			});
		}
	}
}) || _class);

export let KeyEvent = class KeyEvent {
	constructor(trigger, callback, preventDefault) {
		this.trigger = trigger;
		this.callback = callback;
		this.preventDefault = preventDefault;
	}
};