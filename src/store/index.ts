import { createStore } from 'vuex'
import RootStateTypes from './types'
import CountModule from './modules/countStore'

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
    CountModule
  }
})
export default store
