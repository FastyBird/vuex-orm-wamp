import {Components} from "@/lib/contracts/Components";

import Plugin from "@/lib/plugin";
import {Config} from "@/lib/contracts/Config";

// install function executed by VuexORM.use()
const install = function installVuexOrmWamp(components: Components, config: Config) {
    new Plugin(components, config).plugin();
};

// Create module definition for Vue.use()
const plugin = {
    install,
};

// Default export is library as a whole, registered via Vue.use()
export default plugin;

