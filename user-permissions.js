const { Permissions, Allow } = require('user-permissions');

const appAbilities = new Permissions([
  // Everyone allow read the posts title and body
  new Allow().actions('read').resources('posts'),
  new Allow().actions('create').resources('products'),
  new Allow().actions('delete').resources('comments'),
  new Allow().actions('*').resources('tags')
]);

module.exports = appAbilities;