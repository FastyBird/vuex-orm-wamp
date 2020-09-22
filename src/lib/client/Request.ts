import { WampClientInterface, RpCallPromise, RpCallResponse } from '@fastybird/vue-wamp-v1'
import { Model } from '@vuex-orm/core'

import { Config } from '@/lib/contracts/Config'

export class Request {
  /**
   * The model class
   */
  model: typeof Model

  /**
   * The default config
   */
  config: Config = {
    topic: '',
  }

  /**
   * Create a new client instance
   */
  constructor(model: typeof Model) {
    this.model = model
  }

  /**
   * Get the wamp client
   */
  get wamp(): WampClientInterface {
    if (!this.model.wampInstance) {
      throw new Error(
        '[Vuex ORM WAMP] The wamp instance is not registered. Please register the wamp instance to the model.',
      )
    }

    return this.model.wampInstance
  }

  /**
   * Perform a publish request
   */
  publish(data: any = {}, config: Config = {}): boolean {
    const requestConfig = this.createConfig(config)

    return this.wamp.publish(requestConfig.topic, data)
  }

  /**
   * Perform a call request
   */
  call(data: any = {}, config: Config = {}): RpCallPromise<RpCallResponse> {
    const requestConfig = this.createConfig(config)

    return this.wamp.call(requestConfig.topic, data)
  }

  /**
   * Create a new config by merging the global config, the model config,
   * and the given config
   */
  private createConfig(config: Config): Config {
    return {
      ...this.config,
      ...this.model.globalWampConfig,
      ...this.model.wampConfig,
      ...config,
    }
  }
}
