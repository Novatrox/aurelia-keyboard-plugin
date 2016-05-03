import {customAttribute, inject, bindable} from 'aurelia-framework';
import {AKPEventHandler} from '../akp-event-handler';
import {AKPConfiguration} from '../akp-configuration';
@customAttribute('keyblock')
@inject(Element, AKPEventHandler, AKPConfiguration)
export class AKPCustomAttribute {
	element: HTMLElement;
	eventHandler: AKPEventHandler;	
	
	constructor(element, eventHandler) {
		this.element = element;
		this.eventHandler = eventHandler;
	}
	
		   
	attached() {
		this.eventHandler.registerBlock(this.element);
	}
	detached() {
		this.eventHandler.unregisterBlock(this.element);
	}
}
