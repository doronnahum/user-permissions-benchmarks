var Acl = require('acl');

const acl = new Acl(new Acl.memoryBackend());

acl.allow('user', 'posts', 'read')
acl.allow('user', 'products', 'create')
acl.allow('user', 'comments', 'delete')
acl.allow('user', 'tags', ['edit', 'view', 'delete'])

module.exports = acl;