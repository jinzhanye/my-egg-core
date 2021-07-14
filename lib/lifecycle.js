const { EventEmitter } = require('events');

class Lifecycle extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }
}

module.exports = Lifecycle;
