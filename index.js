var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
const checkAbilities = require('./user-permissions');
const casl = require('./casl');
const Rbac = require('./rabac');
const acl = require('./acl');
const roleAcl = require('./role-acl');
const get_casbin = require('./node-casbin/casbin');

const test = function () {
  return async function () {
    const casbin = await get_casbin();
    suite
      .add('casbin', {
        defer: true,
        fn: async function (deferred) {
          await casbin.enforce('user', 'post', 'read');
          await casbin.enforce('user', 'post', 'notAble');
          deferred.resolve();
        }
      })
      .add('casl', {
        defer: true,
        fn: function (deferred) {
          casl.can('read', 'Post')
          casl.can('read', 'notAble')
          deferred.resolve();
        }
      })
      .add('user-permissions', {
        defer: true,
        fn: async function (deferred) {
          await checkAbilities.isAllowed('create', 'posts');
          await checkAbilities.isAllowed('create', 'notAble');
          deferred.resolve();
        }
      })
      // .add('user-permissions-full', {
      //   defer: true,
      //   fn: async function (deferred) {
      //     await checkAbilities.check('create', 'posts');
      //     await checkAbilities.check('create', 'notAble');
      //     deferred.resolve();
      //   }
      // })
      .add('role-acl', {
        defer: true,
        fn: async function (deferred) {
          await roleAcl.can('user').execute('create').on('posts')
          await roleAcl.can('user').execute('create').on('notAble')
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
      .run({ 'async': true })
  }();
}()
