import CountState from './modules/countStore/types'
import AppState from './modules/appStore/types'

export default interface RootStateTypes {
  text: string
}

export interface AllStateTypes extends RootStateTypes {
  CountModule: CountState,
  AppState: AppState
}
