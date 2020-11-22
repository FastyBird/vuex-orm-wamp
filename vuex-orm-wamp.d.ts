import { RpCallPromise, RpCallResponse, WampClientInterface } from '@fastybird/vue-wamp-v1';

import {
  GlobalConfigInterface,
  PublishConfigInterface,
  RpCallConfigInterface,
  ComponentsInterface,
  ClientInterface,
} from './src/lib/types';

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

export { GlobalConfigInterface, PublishConfigInterface, RpCallConfigInterface, ComponentsInterface, ClientInterface };
