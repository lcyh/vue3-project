import CountState from './modules/Count/types'

export default interface RootStateTypes {
  text: string
}

export interface AllStateTypes extends RootStateTypes {
  CountModule: CountState
}
