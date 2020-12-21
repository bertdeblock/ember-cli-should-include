# Ember CLI Should Include

[![NPM Version](https://badge.fury.io/js/ember-cli-should-include.svg)](https://badge.fury.io/js/ember-cli-should-include)
[![Build Status](https://travis-ci.com/bertdeblock/ember-cli-should-include.svg?branch=main)](https://travis-ci.com/bertdeblock/ember-cli-should-include)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-should-include.svg)](https://emberobserver.com/addons/ember-cli-should-include)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Allow the users of your addon to configure which parts of your addon they want to include.

> :warning: For now, this is mainly a personal experiment to become more familiar with the Ember CLI build system. You probably shouldn't use this.

## Table of Contents

- [Support](#support)
- [Installation](#installation)
- [Examples](#examples)
- [Roadmap](#roadmap)

## Support

`ember-cli-should-include` supports **Ember CLI v2.13 and up**.

## Installation

```shell
yarn add ember-cli-should-include
```

```shell
npm install ember-cli-should-include
```

> :information_source: Make sure `ember-cli-should-include` ends up in your `dependencies`.

## Examples

### 1\. Including Components

If your addon ships a lot of components, you might want to give your users the ability to configure which ones should be included and which ones should not.

Configuring your addon could look like this:

```javascript
const app = new EmberApp(defaults, {
  'your-addon': {
    include: [
      'component-1',
      'component-2',
    ],
  },
});
```

The implementation on your side could look like this:

```javascript
'use strict';

const {
  shouldIncludeForAddonTree,
  shouldIncludeForAppTree,
} = require('ember-cli-should-include/lib');

module.exports = {
  name: require('./package').name,
  shouldIncludeConfig: null,

  included(app) {
    const yourAddonOptions = app.options[this.name] || {};

    this.shouldIncludeConfig = {
      components: yourAddonOptions.include
    };

    return this._super.included.apply(this, arguments);
  },

  treeForAddon(tree) {
    const newTree = shouldIncludeForAddonTree(tree, this.shouldIncludeConfig);

    return this._super.treeForAddon.apply(this, [newTree]);
  },

  treeForApp(tree) {
    const newTree = shouldIncludeForAppTree(tree, this.shouldIncludeConfig);

    return this._super.treeForApp.apply(this, [newTree]);
  },
};
```

Eh voilà! Now only `component-1` and `component-2` will be included in your user's app.

> :information_source: Only colocated components are supported.

> :information_source: This example works as well for any other type of entity (e.g. helpers, models, services and so on).

### 2\. Including Multiple Types of Entities

If your addon ships more than a single type of entity, configuring your addon could look like this:

```javascript
const app = new EmberApp(defaults, {
  'your-addon': {
    include: {
      components: [
        'component-1',
        'component-2',
      ],
      helpers: [
        'helper-1',
        'helper-2',
      ],
    },
  },
});
```

The implementation on your side could look like this:

```javascript
'use strict';

const {
  shouldIncludeForAddonTree,
  shouldIncludeForAppTree,
} = require('ember-cli-should-include/lib');

module.exports = {
  name: require('./package').name,
  shouldIncludeConfig: null,

  included(app) {
    const yourAddonOptions = app.options[this.name] || {};

    this.shouldIncludeConfig = yourAddonOptions.include;

    return this._super.included.apply(this, arguments);
  },

  treeForAddon(tree) {
    const newTree = shouldIncludeForAddonTree(tree, this.shouldIncludeConfig);

    return this._super.treeForAddon.apply(this, [newTree]);
  },

  treeForApp(tree) {
    const newTree = shouldIncludeForAppTree(tree, this.shouldIncludeConfig);

    return this._super.treeForApp.apply(this, [newTree]);
  },
};
```

Done! Now only `component-1`, `component-2`, `helper-1` and `helper-2` will be included in your user's app.

## Roadmap

- [ ] Including/Excluding CSS
- [ ] Validating entity types
