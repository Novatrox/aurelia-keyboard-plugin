var _dec, _dec2, _class;

import { customAttribute, inject, bindable } from 'aurelia-framework';
import { AKPEventHandler } from '../akp-event-handler';
import { AKPConfiguration } from '../akp-configuration';

export let AKPCustomAttribute = (_dec = customAttribute('keyblock'), _dec2 = inject(Element, AKPEventHandler, AKPConfiguration), _dec(_class = _dec2(_class = class AKPCustomAttribute {

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
}) || _class) || _class);