'use strict';

const {
  shouldIncludeForAddonTree,
  shouldIncludeForAppTree,
} = require('ember-cli-should-include/lib');

module.exports = {
  name: require('./package').name,
  shouldIncludeConfig: null,

  included(app) {
    const testAddonOptions = app.options[this.name] || {};

    this.shouldIncludeConfig = testAddonOptions.include;

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
