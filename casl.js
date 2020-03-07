const { AbilityBuilder } = require('@casl/ability');

const ability = AbilityBuilder.define((can, cannot) => {
  can('read', 'posts');
  can('create', 'products');
  can('delete', 'comments');
  can('manage', 'tags');
})

module.exports = ability;