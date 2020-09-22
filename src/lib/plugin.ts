import { Model } from '@vuex-orm/core'

import { Components } from '@/lib/contracts/Components'
import { GlobalConfig } from '@/lib/contracts/Config'
import { Model as ModelMixin } from '@/lib/mixins/Model'

export default class Plugin {
  /**
   * The model class
   */
  model: typeof Model

  /**
   * The global configuration object
   */
  config: GlobalConfig

  /**
   * Create a new Vuex ORM WAMP instance
   */
  constructor(components: Components, config: GlobalConfig) {
    this.model = components.Model
    this.config = config
  }

  /**
   * Plug-in features
   */
  plugin(): void {
    ModelMixin(this.model, this.config)
  }
}
