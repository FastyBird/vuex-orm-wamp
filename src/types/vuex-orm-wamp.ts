import { Model } from '@vuex-orm/core'
import { Plugin } from '@vuex-orm/core/dist/src/plugins/use'

import { RpCallResponse, WampClientInterface } from '@fastybird/vue-wamp-v1'

export interface InstallFunction extends Plugin {
  installed?: boolean;
}

export interface GlobalConfigInterface {
  wamp?: WampClientInterface
}

export interface PublishConfigInterface extends GlobalConfigInterface {
  topic: string
  exclude?: string[] | null
  eligible?: string[] | null
}

export interface RpCallConfigInterface extends GlobalConfigInterface {
  topic: string
}

export interface ComponentsInterface {
  Model: typeof Model
}

export interface ClientInterface {
  publish(data: any, config?: PublishConfigInterface): boolean

  call<T>(data: any, config?: RpCallConfigInterface): Promise<RpCallResponse<T>>
}

declare module '@vuex-orm/core' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Model {
    /**
     * The wamp client
     */
    let wampInstance: WampClientInterface | null

    /**
     * The global wamp configuration for all models
     */
    let globalWampConfig: GlobalConfigInterface

    /**
     * The wamp configuration for the model
     */
    let wampConfig: GlobalConfigInterface

    /**
     * Set the given wamp client
     */
    function setWamp(instance: WampClientInterface): void;

    /**
     * Get the wamp client instance
     */
    function wamp(): ClientInterface;
  }
}
