import { GAMESTEPS } from '../../../types'

interface InitialState {
  step: GAMESTEPS
  activeNumber: number
}

const UpdateGameSlice: string = 'Game'

export default InitialState
export { UpdateGameSlice }
