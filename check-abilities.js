const { Abilities, allow } = require('check-abilities');

const appAbilities = new Abilities([
  // Everyone allow read the posts title and body
  allow().actions('read').subjects('posts'),
  allow().actions('create').subjects('products'),
  allow().actions('delete').subjects('comments'),
  allow().actions('*').subjects('tags')
]);

module.exports = appAbilities;