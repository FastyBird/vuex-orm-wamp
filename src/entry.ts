import Plugin from '@/lib/plugin';

import { ComponentsInterface, GlobalConfigInterface } from '../vuex-orm-wamp'

// install function executed by VuexORM.use()
const install = function installVuexOrmWamp(components: ComponentsInterface, config: GlobalConfigInterface) {
  new Plugin(components, config).plugin();
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

export default plugin;
