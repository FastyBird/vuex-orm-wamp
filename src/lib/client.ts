import {WampClientInterface, RpCallPromise, RpCallResponse} from '@fastybird/vue-wamp-v1'
import {Model} from '@vuex-orm/core'

import {ClientInterface, PublishConfigInterface, RpCallConfigInterface} from '@/lib/types.d.ts'

export default class Client implements ClientInterface {
  /**
   * The model class
   */
  model: typeof Model

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
  publish(data: any = {}, config?: PublishConfigInterface): boolean {
    const requestConfig: PublishConfigInterface = {
      ...{
        topic: ''
      },
      ...this.model.globalWampConfig,
      ...this.model.wampConfig,
      ...config,
    }

    return this.wamp.publish(requestConfig.topic, data)
  }

  /**
   * Perform a call request
   */
  call(data: any = {}, config?: RpCallConfigInterface): RpCallPromise<RpCallResponse> {
    const requestConfig: RpCallConfigInterface = {
      ...{
        topic: ''
      },
      ...this.model.globalWampConfig,
      ...this.model.wampConfig,
      ...config,
    }

    return this.wamp.call(requestConfig.topic, data)
  }
}
