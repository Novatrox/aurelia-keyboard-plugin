import * as mt from 'mousetrap';
import {inject} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';

export class AKPConfiguration {
	settings: any;
	aurelia: any;
	constructor(aurelia) {
		this.aurelia = aurelia;
		this.settings = akpOptions;
  	}
	  
	useDefaults() : AKPConfiguration {
		 this.settings = Object.assign(this.settings, akpOptions);
		 return this;
	}
}

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
		let self = this;
		
		let lastIndex = this.registeredKeys.map(function(key) { return key.trigger; }).lastIndexOf(key);
		this.registeredKeys.splice(lastIndex, 1);
		this.mouseTrap.unbind(key);
		lastIndex = this.registeredKeys.map(function(key) { return key.trigger; }).lastIndexOf(key);
		if (lastIndex !== -1) {
			let keyEvent = this.registeredKeys[lastIndex];
			//reattach old binding
			this.mouseTrap.bind(keyEvent.trigger,  function(e) {
				return self.mouseTrapTriggered(e, keyEvent.context, keyEvent.callback, keyEvent.preventDefault);
			});
		}
	}
	registeredKeys: KeyEvent[] = [];
	registerKey(key, callback, context: Element, triggerContext: Element, preventDefault) {
		let self = this;
		
		if (triggerContext) {
			//only trigger inside context
			let mouseTrap = new Mousetrap(triggerContext);
			mouseTrap.bind(key, function(e) {
				return self.mouseTrapTriggered(e, context, callback, preventDefault);
			});
		}  else {
			this.registeredKeys.push(new KeyEvent(key, context, callback, preventDefault));
			this.mouseTrap.bind(key, function(e) {
				return self.mouseTrapTriggered(e, context, callback, preventDefault);
			});
		}
	}
	
	mouseTrapTriggered(e, context, callback, preventDefault) {
		if(!this.checkBlocks(context)) {
			return false;
		}
		var res = callback({args: e});
		if(res !== undefined && typeof res === 'boolean') {
			if(!res && preventDefault) {						
				e.preventDefault();
			}					
			return res;
		} else if (preventDefault) {
			e.preventDefault();
		}
		return true;
	}
	
	checkBlocks(element: Element) {
		for (var index = 0; index < this.blocks.length; index++) {
			var blockingElement = this.blocks[index];
			if(blockingElement == element) {
				return true; //same level, no block needed
			}
			if(element.contains(blockingElement)) {
				return false;
			}
		}
		return true;
	}
	
	blocks: Element[] = [];
	registerBlock(element) {
		this.blocks.push(element);
	}
	
	unregisterBlock(element) {
		if(this.blocks.indexOf(element) !== -1) {
			this.blocks.splice(this.blocks.indexOf(element), 1);
		}
	}
}

export class KeyEvent {
	trigger: string;
	callback: Function;
	preventDefault: boolean;
	context: Element;
	constructor(trigger, context, callback, preventDefault) {
		this.trigger = trigger;
		this.callback = callback;
		this.preventDefault = preventDefault;
		this.context = context;
	}
}

export let akpOptions = {
		preventBubbleClass: 'akp-nobubble',
		defaultPreventInputBubble: false,
		defaultPrevent: false,
		defaultGlobal: true
};
