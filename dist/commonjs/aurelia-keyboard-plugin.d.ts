declare module 'aurelia-keyboard-plugin' {
  import * as mt from 'mousetrap';
  import {
    customAttribute,
    inject,
    bindingMode,
    bindable
  } from 'aurelia-framework';
  import {
    DOM
  } from 'aurelia-pal';
  export class AKPConfiguration {
    settings: akpOptions;
    aurelia: any;
    constructor(aurelia: any);
    useDefaults(): AKPConfiguration;
  }
  export class AKPCustomAttribute {
    element: HTMLElement;
    eventHandler: AKPEventHandler;
    trigger: string;
    delegate: Function;
    prevent: boolean;
    global: boolean;
    constructor(element: any, eventHandler: any, config: any);
    value: string;
    valueChanged(newValue: any): any;
    attached(): any;
    detached(): any;
  }
  export class AKPEventHandler {
    DOM: DOM;
    mouseTrap: Mousetrap;
    preventBubbleClass: string;
    defaultPreventInputBubble: boolean;
    constructor(dom: any, config: any);
    unregisterKey(key: any): any;
    registeredKeys: KeyEvent[];
    registerKey(key: any, callback: any, scope: any, preventDefault: any): any;
  }
  export class KeyEvent {
    trigger: string;
    callback: Function;
    preventDefault: boolean;
    constructor(trigger: any, callback: any, preventDefault: any);
  }
  export let akpOptions: any;
}