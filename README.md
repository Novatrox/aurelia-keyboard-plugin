# Aurelia Keyboard Plugin
This is an easy to use keyboard navigation plugin for aurelia. It is based on the popular mousetrap javascript library.

## Installing the plugin
1. Ensure that [NodeJS](http://nodejs.org/) and jspm is installed. This provides the platform on which the build tooling runs.
2. Install jspm.
3. Install aurelia
4. Install aurelia-keyboard-navigation

```shell
  jspm install github:novatrox/aurelia-keyboard-plugin
```

5. Configure aurelia-keyboard-navigation

```shell
  import { AKPConfiguration } from 'aurelia-keyboard-plugin';

   aurelia.use.plugin('novatrox/aurelia-keyboard-plugin', (config: AKPConfiguration) => {
      config.useDefaults();
  });
```
Possible configuration options are: value(default setting)
* preventBubbleClass('akp-nobubble') : Class name to give inputs that should bypass keys bound by plugin
*	defaultPreventInputBubble(false): Should inputs not respond to binding by default
*	defaultPrevent(false): Should callbacks fire e.preventDefault(); by default
*	defaultGlobal(true): Should keybinds be global by default

6. You are done. Read the tutorial to learn how to use the plugin


## Using the plugin
The plugin exposes a global custom attribute called keybind="", it has several properties to bind to. 
* trigger: Which keys should trigger
* delegate: Callback, when no delegate is defined element.click() is default.
* prevent: Should call e.preventDefault(); (default false)
* global: Is global, otherwise will only fire when scope is in focus (inputs) (default true)


### Tutorial

*Simple keybind to make enter click your button, because no delegate is given the plugin will fire element.click()*
```shell
 <form>
 <input type="text" value="Something to post"/>
 <button type="submit" keybind="trigger: enter;">Submit form</submit>
 </form>
```


*Simple keybind to perform search when in search input scope, because global is set to false it will only trigger when focus is inside the input*

```shell
<input type="text" placeholder="Search for something" keybind="trigger: enter; delegate.call: doSearch(); global: false;" />
```

*Simple keybind to navigate, when args is defined the plugin passes a KeyboardEvent parameter to the delegate, the parameter must be called args.*

```shell
**view.html**

<table keybind="trigger: up, down; delegate.call: doNavigation(args);>
<tbody repeat.for="item of items">
<tr>
<td>${item.id}</td>
<td>Selected: ${item.selected}</td>
</tr>
</table>

**view.ts*
doNavigation(args) {
    let currentIndex = this.items.map(function (i) {
            return i.selected;
    }).indexOf(true);
    
    let isDown = args.keyCode === 40;
    items[currentIndex].selected = false;
    if (isDown) {
      items[++currentIndex].selected = true;
    } else {
      items[--currentIndex].selected = true;
    }
}

```

*Simple keybind to perform save. Prevent is set to true to prevent webbrowser from opening default save dialog.*
```shell
 <textarea keybind="trigger: ctrl+s; delegate.call: silentSave(); prevent: true; global:false;"></textarea>
```






# Based on aurelia-skeleton-plugin

[![ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://zenhub.io)
[![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This skeleton is part of the [Aurelia](http://www.aurelia.io/) platform. It sets up a standard aurelia plugin using gulp to build your ES6 code with the Babel compiler. Karma/Jasmine testing is also configured.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

  ```shell
  npm install -g jspm
  ```
3. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```

4. You can now run the tests with this command:

  ```shell
  karma start
  ```
