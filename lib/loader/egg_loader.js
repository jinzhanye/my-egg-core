const FileLoader = require('./file_loader');

class EggLoader {

  /**
   * @class
   * @param {Object} options - options
   * @param {String} options.baseDir - the directory of application
   * @param {EggCore} options.app - Application instance
   * @param {Logger} options.logger - logger
   * @param {Object} [options.plugins] - custom plugins
   * @since 1.0.0
   */
  constructor(options) {

  }

  getEggPaths() {}

  getTypeFiles(filename) {
    const files = [`${filename}.default`];

    return files;
  }

  loadToApp(directory, property, opt) {
    new FileLoader(opt).load();
  }
}

const loaders = [
  require('./mixin/controller'),
];

for (const loader of loaders) {
  Object.assign(EggLoader.prototype, loader)
}

module.exports = EggLoader;
