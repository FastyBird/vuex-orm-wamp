import { RpCallPromise, RpCallResponse, WampClientInterface } from '@fastybird/vue-wamp-v1'

import { Model } from '@vuex-orm/core'

import VuexOrmWamp from './src/lib/plugin';

export interface GlobalConfigInterface {
  wamp?: WampClientInterface
}

export interface PublishConfigInterface extends GlobalConfigInterface {
  topic: string
  exclude?: Array<string> | null
  eligible?: Array<string> | null
}

export interface RpCallConfigInterface extends GlobalConfigInterface {
  topic: string
}

export interface ComponentsInterface {
  Model: typeof Model
}

export interface ClientInterface {
  publish(data: any, config?: PublishConfigInterface): boolean

  call(data: any, config?: RpCallConfigInterface): RpCallPromise<RpCallResponse>
}

export default VuexOrmWamp;

declare module '@vuex-orm/core' {
  namespace Model {
    /**
     * The wamp client
     */
    let wampInstance: WampClientInterface | null;

    /**
     * The global wamp configuration for all models
     */
    let globalWampConfig: GlobalConfigInterface;

    /**
     * The wamp configuration for the model
     */
    let wampConfig: GlobalConfigInterface;

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
