import {RpCallPromise, RpCallResponse, WampClientInterface} from '@fastybird/vue-wamp-v1'
import {Model} from '@vuex-orm/core'

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
