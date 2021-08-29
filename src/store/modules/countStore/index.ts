import { Module } from 'vuex'
import CountState from './types'
import RootStateTypes from '../../types'

// Create a new store Modules.
const CountModule: Module<CountState, RootStateTypes> = {
  namespaced: true,
  state: {
    name: 'count-module',
    count: 1
  },
  mutations: {
    DOUBLE_COUNT(state: CountState) {
      state.count *= 2
    }
  },
  actions: {
  }
}

export default CountModule
