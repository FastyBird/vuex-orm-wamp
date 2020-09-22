import { WampClientInterface } from '@fastybird/vue-wamp-v1'
import { Model as BaseModel } from '@vuex-orm/core'

import { GlobalConfig } from '@/lib/contracts/Config'
import { Request } from '@/lib/client/Request'

export function Model(model: typeof BaseModel, config: GlobalConfig): void {
  // @ts-ignore
  const that = this

  /**
   * The wamp client
   */
  Object.assign(model, { wampInstance: config.wamp || null })

  /**
   * The global wamp configuration for all models
   */
  Object.assign(model, { globalWampConfig: config })

  /**
   * The wamp configuration for the model
   */
  Object.assign(model, { wampConfig: {} })

  /**
   * Set the given wamp client
   */
  Object.assign(model, {
    setWamp: (instance: WampClientInterface): void => {
      Object.assign(model, { wampInstance: instance })
    },
  })

  /**
   * Get the wamp client instance
   */
  Object.assign(model, {
    wamp: (): Request => {
      return new Request(that)
    },
  })
}
