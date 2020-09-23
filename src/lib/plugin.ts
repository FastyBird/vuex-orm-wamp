import {Model} from '@vuex-orm/core'

import {ClientInterface, GlobalConfigInterface, ComponentsInterface} from '@/lib/types'
import {WampClientInterface} from "@fastybird/vue-wamp-v1";
import Client from "@/lib/client";

export default class Plugin {
  /**
   * The model class
   */
  model: typeof Model

  /**
   * The global configuration object
   */
  config: GlobalConfigInterface

  /**
   * Create a new Vuex ORM WAMP instance
   */
  constructor(components: ComponentsInterface, config: GlobalConfigInterface) {
    this.model = components.Model
    this.config = config
  }

  /**
   * Plug-in features
   */
  plugin(): void {
    // The wamp client
    Object.assign(this.model, {wampInstance: this.config.wamp || null})

    // The global wamp configuration for all models
    Object.assign(this.model, {globalWampConfig: this.config})

    // The wamp configuration for the model
    Object.assign(this.model, {wampConfig: {}})

    // Set the given wamp client
    Object.assign(this.model, {
      setWamp: (instance: WampClientInterface): void => {
        Object.assign(this.model, {wampInstance: instance})
      },
    })

    // Get the wamp client instance
    Object.assign(this.model, {
      wamp: (): ClientInterface => {
        // @ts-ignore
        return new Client(this.model)
      },
    })
  }
}
