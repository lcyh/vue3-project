import CountState from './modules/countStore/types'
import AppState from './modules/appStore/types'
import DataBoardState from './modules/databoardStore/types'

export default interface RootStateTypes {
  text: string
}

export interface AllStateTypes extends RootStateTypes {
  CountState: CountState,
  AppState: AppState,
  databoardState: DataBoardState
}
