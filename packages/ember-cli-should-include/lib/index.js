const funnel = require('broccoli-funnel');

const TREE = {
  ADDON: 'ADDON',
  APP: 'APP',
};

function shouldIncludeForAddonTree() {
  return shouldInclude(TREE.ADDON, ...arguments);
}

function shouldIncludeForAppTree() {
  return shouldInclude(TREE.APP, ...arguments);
}

function shouldInclude(treeId, inputNode, entities) {
  let include = [];

  if (isEntities(entities)) {
    include = includeForTree(treeId, entities);
  }

  if (process.env.EMBER_CLI_SHOULD_INCLUDE_DEBUG) {
    console.log(`ember-cli-should-include "${treeId}" tree:`);
    console.log(include);
  }

  if (include.length === 0) {
    return inputNode;
  }

  return funnel(inputNode, {
    include,
  });
}

function isEntities(entities) {
  return (
    typeof entities === 'object' &&
    entities !== null &&
    !Array.isArray(entities)
  );
}

function includeForTree(treeId, entities) {
  const entityTypes = Object.keys(entities);
  const include = [];

  entityTypes.forEach(function (entityType) {
    const entityNames = entities[entityType];

    if (!Array.isArray(entityNames)) {
      return;
    }

    entityNames.forEach(function (entityName) {
      include.push(`${entityType}/${entityName}.js`);

      if (treeId === TREE.ADDON && entityType === 'components') {
        include.push(`components/${entityName}.hbs`);
        include.push(`components/${entityName}/**/*.js`);
        include.push(`components/${entityName}/**/*.hbs`);
      }
    });
  });

  return include;
}

module.exports = {
  shouldIncludeForAddonTree,
  shouldIncludeForAppTree,
};
