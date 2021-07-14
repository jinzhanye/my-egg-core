const KoaApplication = require('koa');
const Router = require('@eggjs/router').EggRouter;

const Lifecycle = require('./lifecycle');
const BaseContextClass = require('./utils/base_context_class');

const ROUTER = Symbol('EggCore#router');
const EGG_LOADER = Symbol.for('egg#loader');

class EggCore extends KoaApplication {
  /**
   * @class
   * @param {Object} options - options
   * @param {String} [options.baseDir=process.cwd()] - the directory of application
   * @param {String} [options.type=application|agent] - whether it's running in app worker or agent worker
   * @param {Object} [options.plugins] - custom plugins
   * @since 1.0.0
   */
  constructor(options = {}) {
    super();
    const Loader = this[EGG_LOADER];

    this.BaseContextClass = BaseContextClass;

    const Controller = this.BaseContextClass;
    this.Controller = Controller;

    const Service = this.BaseContextClass;
    this.Service = Service;

    //初始化 loader 对象
    this.loader = new Loader({
      baseDir: options.baseDir,          //项目启动的根目录
      app: this,                         // EggCore 实例本身
      plugins: options.plugins,          //自定义插件配置信息，设置插件配置信息有多种方式，后面我们会讲
      logger: this.console,
      serverScope: options.serverScope,
    });

    this.lifecycle = new Lifecycle({
      baseDir: options.baseDir,
      app: this,
      logger: this.console,
    });
    this.lifecycle.on('error', err => this.emit('error', err));
    this.lifecycle.on('ready_timeout', id => this.emit('ready_timeout', id));
    this.lifecycle.on('ready_stat', data => this.emit('ready_stat', data));
  }


  get [EGG_LOADER]() {
    return require('./loader/egg_loader');
  }

  get router() {
    if (this[ROUTER]) {
      return this[ROUTER];
    }

    const router = this[ROUTER] = new Router({ sensitive: true }, this);

    // TODO koa 方法？
    this.beforeStart(() => {
      this.use(router.middleware());
    });

    return router;
  }
}

module.exports = EggCore;
