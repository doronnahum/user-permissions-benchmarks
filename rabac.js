
var { RBAC } = require('rbac');

const rbac = new RBAC({
  roles: ['user'],
  permissions: {
    posts: ['read'],
    products: ['create'],
    comments: ['delete'],
    tags: ['create', 'update', 'delete', 'read'],
  },
  grants: {
    user: ['read_posts', 'create_products', 'delete_comments', 'create_tags', 'update_tags', 'delete_tags', 'read_tags'],
  },
});

module.exports = rbac;

