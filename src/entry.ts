import {WampClientInterface} from "@fastybird/vue-wamp-v1";

// Import library
import Client from "@/lib/client";
import {ClientInterface, ComponentsInterface, GlobalConfigInterface, InstallFunction} from '@/types/vuex-orm-wamp';

// install function executed by VuexORM.use()
const install: InstallFunction = function installVuexOrmWamp(components: ComponentsInterface, config: GlobalConfigInterface) {
    if (install.installed) return;
    install.installed = true;

    // The wamp client
    Object.assign(components.Model, {wampInstance: config.wamp || null})

    // The global wamp configuration for all models
    Object.assign(components.Model, {globalWampConfig: config})

    // The wamp configuration for the model
    Object.assign(components.Model, {wampConfig: {}})

    // Set the given wamp client
    Object.assign(components.Model, {
        setWamp: (instance: WampClientInterface): void => {
            Object.assign(components.Model, {wampInstance: instance})
        },
    })

    // Get the wamp client instance
    Object.assign(components.Model, {
        wamp: (): ClientInterface => {
            return new Client(components.Model)
        },
    })
};

// Create module definition for VuexORM.use()
const plugin = {
  install,
};

// Default export is library as a whole, registered via VuexORM.use()
export default plugin;

export * from '@/types/vuex-orm-wamp';
