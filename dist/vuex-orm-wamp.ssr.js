'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}var Request = /*#__PURE__*/function () {
  /**
   * The model class
   */

  /**
   * The default config
   */

  /**
   * Create a new client instance
   */
  function Request(model) {
    _classCallCheck(this, Request);

    _defineProperty(this, "model", void 0);

    _defineProperty(this, "config", {
      topic: ''
    });

    this.model = model;
  }
  /**
   * Get the wamp client
   */


  _createClass(Request, [{
    key: "publish",

    /**
     * Perform a publish request
     */
    value: function publish() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var requestConfig = this.createConfig(config);
      return this.wamp.publish(requestConfig.topic, data);
    }
    /**
     * Perform a call request
     */

  }, {
    key: "call",
    value: function call() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var requestConfig = this.createConfig(config);
      return this.wamp.call(requestConfig.topic, data);
    }
    /**
     * Create a new config by merging the global config, the model config,
     * and the given config
     */

  }, {
    key: "createConfig",
    value: function createConfig(config) {
      return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, this.config), this.model.globalWampConfig), this.model.wampConfig), config);
    }
  }, {
    key: "wamp",
    get: function get() {
      if (!this.model.wampInstance) {
        throw new Error('[Vuex ORM WAMP] The wamp instance is not registered. Please register the wamp instance to the model.');
      }

      return this.model.wampInstance;
    }
  }]);

  return Request;
}();function Model(model, config) {
  var _this = this;

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
    setWamp: function setWamp(instance) {
      Object.assign(model, {
        wampInstance: instance
      });
    }
  });
  /**
   * Get the wamp client instance
   */

  Object.assign(model, {
    wamp: function wamp() {
      // @ts-ignore
      return new Request(_this);
    }
  });
}var Plugin = /*#__PURE__*/function () {
  /**
   * The model class
   */

  /**
   * The global configuration object
   */

  /**
   * Create a new Vuex ORM WAMP instance
   */
  function Plugin(components, config) {
    _classCallCheck(this, Plugin);

    _defineProperty(this, "model", void 0);

    _defineProperty(this, "config", void 0);

    this.model = components.Model;
    this.config = config;
  }
  /**
   * Plug-in features
   */


  _createClass(Plugin, [{
    key: "plugin",
    value: function plugin() {
      Model(this.model, this.config);
    }
  }]);

  return Plugin;
}();// install function executed by VuexORM.use()
var install = function installVuexOrmWamp(components, config) {
  new Plugin(components, config).plugin();
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // Default export is library as a whole, registered via Vue.use()
exports.default=plugin;