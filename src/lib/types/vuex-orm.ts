import { WampClientInterface } from '@fastybird/vue-wamp-v1'
import {
  Config,
  GlobalConfig,
} from '../contracts/Config'
import { Request } from '../client/Request'

declare module '@vuex-orm/core' {
  namespace Model {
    /**
     * The wamp client
     */
    export const wampInstance: WampClientInterface | null

    /**
     * The global wamp configuration for all models
     */
    export const globalWampConfig: GlobalConfig

    /**
     * The wamp configuration for the model
     */
    export const wampConfig: Config

    /**
     * Set the given wamp client instance
     */
    export function setWamp(instance: WampClientInterface): void

    /**
     * Get the wamp request instance
     */
    export function wamp(): Request
  }
}
