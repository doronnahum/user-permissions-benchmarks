const casbin = require('casbin');


module.exports = async () => {
  const _casbin = await casbin.newEnforcer('./node-casbin/basic_model.conf', './node-casbin/basic_policy.csv');
  return _casbin;
}
