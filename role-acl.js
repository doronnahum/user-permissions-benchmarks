const { AccessControl } = require('role-acl');

const ac = new AccessControl();

ac.grant('user')                    // define new or modify existing role. also takes an array.
  .execute('read').on('posts')             // equivalent to .execute('create').on('video', ['*'])
  .execute('create').on('products')
  .execute('delete').on('comments')
  .execute('manage').on('tags');

module.exports = ac;