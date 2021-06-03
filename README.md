# FastyBird Vuex ORM WAMPv1 websocket client plugin

[![Latest stable](https://badgen.net/npm/v/@fastybird/vuex-orm-wamp?cache=300&style=flast-square)](https://www.npmjs.com/package/@fastybird/vuex-orm-wamp)
[![Downloads total](https://badgen.net/npm/dt/@fastybird/vuex-orm-wamp?cache=300&style=flast-square)](https://www.npmjs.com/package/@fastybird/vuex-orm-wamp)
[![Licence](https://badgen.net/npm/license/@fastybird/vuex-orm-wamp?cache=300&style=flast-square)](https://www.npmjs.com/package/@fastybird/vuex-orm-wamp)
![Types](https://badgen.net/npm/types/@fastybird/vuex-orm-wamp?cache=300&style=flast-square)

## What is FastyBird Vuex ORM WAMPv1 websocket client plugin?

This plugin add smooth integration between [WAMPv1](https://wamp-proto.org) requests and [Vuex ORM](https://github.com/vuex-orm/vuex-orm) data persistence through the awesome [WAMP client](https://github.com/FastyBird/vue-wamp-v1) library.

## Installation

The best way to install **@fastybird/vuex-orm-wamp** is using [Yarn](https://yarnpkg.com/):

```sh
yarn add @fastybird/vuex-orm-wamp
```

or if you prefer npm:

```sh
npm install @fastybird/vuex-orm-wamp
```

## Setup in your application

Register Vue plugin:

```js
import VuexORM from '@vuex-orm/core'
import VuexORMWamp from '@fastybird/vuex-orm-wamp'
import { WampClient } from '@fastybird/vue-wamp-v1'

VuexORM.use(VuexORMWamp, {
  wamp: WampClient('ws://your.server.com', null)
})
```

#### Options:

- `wamp` - optional option which have to provide WAMP client instance

## Usage

Available methods:

```js
User.wamp().open()
User.wamp().close()

User.publish(data, config)
User.call(data, config)
```

## Typescript setup

Add the types to your `"types"` array in **tsconfig.json**.

```json
{
  "compilerOptions": {
    "types": [
      "@fastybird/vuex-orm-wamp"
    ]
  }
}
```

***
Homepage [https://www.fastybird.com](https://www.fastybird.com) and repository [https://github.com/FastyBird/vue-wamp-v1](https://github.com/FastyBird/vue-wamp-v1).
