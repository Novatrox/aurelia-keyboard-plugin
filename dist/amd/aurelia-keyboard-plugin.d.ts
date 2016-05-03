declare module 'aurelia-keyboard-plugin' {
  import * as mt from 'mousetrap';
  import {
    inject
  } from 'aurelia-framework';
  import {
    DOM
  } from 'aurelia-pal';
  export class AKPConfiguration {
    settings: any;
    aurelia: any;
    constructor(aurelia: any);
    useDefaults(): AKPConfiguration;
  }
  export class AKPEventHandler {
    DOM: DOM;
    mouseTrap: Mousetrap;
    preventBubbleClass: string;
    defaultPreventInputBubble: boolean;
    constructor(dom: any, config: any);
    unregisterKey(key: any): any;
    registeredKeys: KeyEvent[];
    registerKey(key: any, callback: any, context: Element, triggerContext: Element, preventDefault: any): any;
    checkBlocks(element: Element): any;
    blocks: Element[];
    registerBlock(element: any): any;
    unregisterBlock(element: any): any;
  }
  export class KeyEvent {
    trigger: string;
    callback: Function;
    preventDefault: boolean;
    constructor(trigger: any, callback: any, preventDefault: any);
  }
  export let akpOptions: any;
}