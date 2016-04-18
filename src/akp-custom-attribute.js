import {customAttribute, inject, bindingMode, bindable} from 'aurelia-framework';
import {AKPEventHandler} from './akp-event-handler';
import {AKPConfiguration} from './akp-configuration';
@customAttribute('keybind', bindingMode.twoWay)
@inject(Element, AKPEventHandler, AKPConfiguration)
export class AKPCustomAttribute {
	element: HTMLElement;
	eventHandler: AKPEventHandler;	
	@bindable trigger: string;
	@bindable delegate: Function;
	@bindable prevent: boolean;
	@bindable global: boolean;	
	
	constructor(element, eventHandler, config) {
		this.element = element;
		this.eventHandler = eventHandler;
		this.prevent = config.settings.defaultPrevent;
		this.global = config.settings.defaultGlobal;		
	}
	
	value: string;
	valueChanged(newValue) {
		this.eventHandler.unregisterKey(this.trigger);		
		var self = this;
		if(!this.delegate) {
			this.delegate = function() {
				self.element.click();
			};
		} 
		if(this.global === "false") {
			this.global = false;
		}
		
		this.eventHandler.registerKey(this.trigger, this.delegate, this.global ? null : this.element, this.prevent);		
  	}
	   
	attached() {
		var self = this;
		if (!this.delegate) {
			this.delegate = function() {
				self.element.click();
			};
		} 
		if (this.global === "false") {
			this.global = false;
		}
		
		if (this.trigger.indexOf(",") !== -1) {
			//ARRAY
			let triggers = this.trigger.split(",").map(function(tr) { return tr.trim();});
			this.trigger = triggers;			
		}
		
		this.eventHandler.registerKey(this.trigger, this.delegate, this.global ? null : this.element, this.prevent);		
	}
	detached() {
		this.eventHandler.unregisterKey(this.trigger);		
	}
}
