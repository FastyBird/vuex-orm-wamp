import { WampClientInterface } from '@fastybird/vue-wamp-v1'

import { Config, GlobalConfig } from '@/lib/contracts/Config';
import { Request } from '@/lib/client/Request';

export default VuexOrmWamp;

export {Config, GlobalConfig} from '@/lib/contracts/Config';

declare module '@vuex-orm/core' {
  namespace Model {
    /**
     * The wamp client
     */
    let wampInstance: WampClientInterface | null;

    /**
     * The global wamp configuration for all models
     */
    let globalWampConfig: GlobalConfig;

    /**
     * The wamp configuration for the model
     */
    let wampConfig: Config;

    /**
     * Set the given wamp client
     */
    function setWamp(instance: WampClientInterface): void;

    /**
     * Get the wamp client instance
     */
    function wamp(): Request;
  }
}
