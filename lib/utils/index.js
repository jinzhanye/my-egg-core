const BuiltinModule = require('module');

// Guard against poorly mocked module constructors.
const Module = module.constructor.length > 1
  ? module.constructor
  /* istanbul ignore next */
  : BuiltinModule;


module.exports = {
  extensions: Module._extensions,
}
