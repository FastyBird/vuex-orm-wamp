import {WampClientInterface} from '@fastybird/vue-wamp-v1'

import VuexOrmWamp from './src/lib/plugin';
import {ClientInterface, GlobalConfigInterface} from '@/lib/types';

export default VuexOrmWamp;

export {GlobalConfigInterface};

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
