import {akpOptions} from './akp-options';
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
