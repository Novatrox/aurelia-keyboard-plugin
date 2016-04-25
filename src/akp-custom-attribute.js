import {customAttribute, inject, bindable} from 'aurelia-framework';
import {AKPEventHandler} from './akp-event-handler';
import {AKPConfiguration} from './akp-configuration';
@customAttribute('keybind')
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
	
		   
	attached() {
		var self = this;
		if (!this.delegate) {
			this.delegate = function() {
				self.element.click();
			};
		} 
		
		//Problem with aurelia binding sending me strings.
		if (this.global === "false") {
			this.global = false;
		}
		if(this.global === "true") {
			this.global = true;
		}
		
		if (this.trigger.indexOf(",") !== -1) {
			//ARRAY
			let triggers = this.trigger.split(",").map(function(tr) { return tr.trim();});
			triggers.forEach(function(trigger) {
				this.eventHandler.registerKey(trigger, this.delegate, this.global ? null : this.element, this.prevent);		
			}, this);
						
		} else {				
			this.eventHandler.registerKey(this.trigger, this.delegate, this.global ? null : this.element, this.prevent);		
		}
	}
	detached() {
		if(this.global) {
			
			if (this.trigger.indexOf(",") !== -1) {
				//ARRAY
				let triggers = this.trigger.split(",").map(function(tr) { return tr.trim();});
				triggers.forEach(function(trigger) {
					this.eventHandler.unregisterKey(trigger);		
				}, this);								
			} else {				
				this.eventHandler.unregisterKey(this.trigger);		
			}
		}
	}
}
