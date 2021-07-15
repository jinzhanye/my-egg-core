module.exports = {
  /**
   * Load app/controller
   * @param {Object} opt - LoaderOptions
   * @since 1.0.0
   */
  loadPlugin(opt) {
    this.timing.start('Load Plugin');

    const appPlugins = this.readPluginConfigs(path.join(this.options.baseDir, 'config/plugin.default'));
    const eggPluginConfigPaths = this.eggPaths.map(eggPath => path.join(eggPath, 'config/plugin.default'));




    this.plugins = enablePlugins;

    this.timing.end('Load Plugin');
  }
}
