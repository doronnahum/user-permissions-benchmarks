var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
const checkAbilities = require('./check-abilities');
const casl = require('./casl');
const Rbac = require('./rabac');
const acl = require('./acl');
suite
  .add('casl', {
    defer: true,
    fn: function (deferred) {
      casl.can('read', 'Post')
      casl.can('read', 'notAble')
      deferred.resolve();
    }
  })
  .add('acl', {
    defer: true,
    fn: function (deferred) {
      acl.isAllowed('user', 'Post', 'read')
      acl.isAllowed('user', 'notAble', 'read')
      deferred.resolve();
    }
  })
  .add('check-abilities', {
    defer: true,
    fn: async function (deferred) {
      await checkAbilities.can('create', 'posts');
      await checkAbilities.can('create', 'notAble');
      deferred.resolve();
    }
  })
  .add('rbac', {
    defer: true,
    fn: async function (deferred) {
      await Rbac.can('user', 'create', 'article');
      await Rbac.can('user', 'create', 'notAble');
      deferred.resolve();
    }
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run()