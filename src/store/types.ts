import CountState from './modules/countStore/types'

export default interface RootStateTypes {
  text: string
}

export interface AllStateTypes extends RootStateTypes {
  CountModule: CountState
}
