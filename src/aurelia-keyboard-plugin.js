import {AKPConfiguration} from './akp-configuration';

export function configure(aurelia, callback) {
  aurelia.globalResources('./resources/keybind-custom-attribute');
  aurelia.globalResources('./resources/keyblock-custom-attribute');
  
  let config = new AKPConfiguration(aurelia);
  if (callback !== undefined && typeof(callback) === 'function') {
    callback(config);
    return;
  }
  config.useDefaults();
}


export {AKPConfiguration} from './akp-configuration';
