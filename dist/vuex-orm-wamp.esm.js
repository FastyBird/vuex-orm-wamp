function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class Request {
  /**
   * The model class
   */

  /**
   * The default config
   */

  /**
   * Create a new client instance
   */
  constructor(model) {
    _defineProperty(this, "model", void 0);

    _defineProperty(this, "config", {
      topic: ''
    });

    this.model = model;
  }
  /**
   * Get the wamp client
   */


  get wamp() {
    if (!this.model.wampInstance) {
      throw new Error('[Vuex ORM WAMP] The wamp instance is not registered. Please register the wamp instance to the model.');
    }

    return this.model.wampInstance;
  }
  /**
   * Perform a publish request
   */


  publish(data = {}, config = {}) {
    const requestConfig = this.createConfig(config);
    return this.wamp.publish(requestConfig.topic, data);
  }
  /**
   * Perform a call request
   */


  call(data = {}, config = {}) {
    const requestConfig = this.createConfig(config);
    return this.wamp.call(requestConfig.topic, data);
  }
  /**
   * Create a new config by merging the global config, the model config,
   * and the given config
   */


  createConfig(config) {
    return { ...this.config,
      ...this.model.globalWampConfig,
      ...this.model.wampConfig,
      ...config
    };
  }

}

function Model(model, config) {
  /**
   * The wamp client
   */
  Object.assign(model, {
    wampInstance: config.wamp || null
  });
  /**
   * The global wamp configuration for all models
   */

  Object.assign(model, {
    globalWampConfig: config
  });
  /**
   * The wamp configuration for the model
   */

  Object.assign(model, {
    wampConfig: {}
  });
  /**
   * Set the given wamp client
   */

  Object.assign(model, {
    setWamp: instance => {
      Object.assign(model, {
        wampInstance: instance
      });
    }
  });
  /**
   * Get the wamp client instance
   */

  Object.assign(model, {
    wamp: () => {
      // @ts-ignore
      return new Request(this);
    }
  });
}

class Plugin {
  /**
   * The model class
   */

  /**
   * The global configuration object
   */

  /**
   * Create a new Vuex ORM WAMP instance
   */
  constructor(components, config) {
    _defineProperty(this, "model", void 0);

    _defineProperty(this, "config", void 0);

    this.model = components.Model;
    this.config = config;
  }
  /**
   * Plug-in features
   */


  plugin() {
    Model(this.model, this.config);
  }

}

// install function executed by VuexORM.use()
const install = function installVuexOrmWamp(components, config) {
  new Plugin(components, config).plugin();
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // Default export is library as a whole, registered via Vue.use()

export default plugin;
