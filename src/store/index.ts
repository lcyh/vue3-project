import { createStore } from 'vuex'
import RootStateTypes from './types'
import countModule from './modules/countStore'
import appModule from './modules/appStore'

const store = createStore<RootStateTypes>({
  state: {
    text: 'This is Vuex Root.state.text(这是全局的store)'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    appModule,
    countModule,
  }
})
export default store
