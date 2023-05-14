import { GAMESTEPS } from '../types'

interface InitialState {
  score: number
  name: string
  step: GAMESTEPS
}

const UpdatePlayerSlice: string = 'Player'

export default InitialState
export { UpdatePlayerSlice }
