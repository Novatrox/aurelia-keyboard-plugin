import { akpOptions } from './akp-options';
export let AKPConfiguration = class AKPConfiguration {
	constructor(aurelia) {
		this.aurelia = aurelia;
		this.settings = akpOptions;
	}

	useDefaults() {
		this.settings = Object.assign(this.settings, akpOptions);
		return this;
	}
};