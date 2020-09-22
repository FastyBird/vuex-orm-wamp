import { WampClientInterface } from '@fastybird/vue-wamp-v1'

export interface Config {
  topic?: string
}

export interface GlobalConfig extends Config {
  wamp?: WampClientInterface
}
