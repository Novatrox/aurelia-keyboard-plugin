import {inject} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';
import {AKPConfiguration} from './akp-configuration';
import * as mt from 'mousetrap';


@inject(DOM, AKPConfiguration)
export class AKPEventHandler {
	DOM: DOM;
	mouseTrap: Mousetrap;
	preventBubbleClass: string;
	defaultPreventInputBubble: boolean = false;

	constructor(dom, config) {
		this.DOM = dom;
		let mouseTrap = new Mousetrap();
		this.preventBubbleClass = config.settings.preventBubbleClass;
		this.defaultPreventInputBubble = config.settings.defaultPreventInputBubble;		
		let self = this;
		mouseTrap.stopCallback = function(e, element) {
			//true means stop
			//Check if default prevent is enabled
			if (self.defaultPreventInputBubble) {
				// stop for input, select, and textarea	
				return element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA' || (element.contentEditable && element.contentEditable === 'true');
			}
			// if the element has the class "noBubbleClass" then no need to stop
			if ((' ' + element.className + ' ').indexOf(self.preventBubbleClass) > -1) {
				return true;
			}
			return false;
		};
		this.mouseTrap = mouseTrap;
	}

	unregisterKey(key) {
		let lastIndex = this.registeredKeys.map(function(key) { return key.trigger; }).lastIndexOf(key);
		this.registeredKeys.splice(lastIndex, 1);
		this.mouseTrap.unbind(key);
		lastIndex = this.registeredKeys.map(function(key) { return key.trigger; }).lastIndexOf(key);
		if (lastIndex !== -1) {
			let keyEvent = this.registeredKeys[lastIndex];
			//reattach old binding
			this.mouseTrap.bind(keyEvent.trigger, function(e) {
				if (keyEvent.preventDefault) {
					e.preventDefault();
				}
				keyEvent.callback({args: e});
			});
		}
	}
	registeredKeys: KeyEvent[] = [];
	registerKey(key, callback, scope, preventDefault) {
		if (scope) {
			let mouseTrap = new Mousetrap(scope);
			mouseTrap.bind(key, function(e) {
				if (preventDefault) {
					e.preventDefault();
				}
				callback({args: e});
			});
		}  else {
			this.registeredKeys.push(new KeyEvent(key, callback, preventDefault));
			this.mouseTrap.bind(key, function(e) {
				if (preventDefault) {
					e.preventDefault();
				}
				callback({args: e});
			});
		}
	}
}

export class KeyEvent {
	trigger: string;
	callback: Function;
	preventDefault: boolean;
	constructor(trigger, callback, preventDefault) {
		this.trigger = trigger;
		this.callback = callback;
		this.preventDefault = preventDefault;
	}
}
