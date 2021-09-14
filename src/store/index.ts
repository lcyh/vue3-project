import { createStore } from 'vuex'
import RootStateTypes from './types'
import countModule from './modules/countStore'
import appModule from './modules/appStore'
import databoardModule from './modules/databoardStore'

const store = createStore<RootStateTypes>({
  modules: {
    appModule,
    countModule,
    databoardModule
  }
})
export default store
