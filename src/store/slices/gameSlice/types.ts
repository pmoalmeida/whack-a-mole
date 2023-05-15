import { GAME_DIFFICULTY } from '../../../config'
import { GAMESTEPS } from '../../../types'

interface InitialState {
  step: GAMESTEPS
  activeNumber: number
  difficulty: GAME_DIFFICULTY
}

const UpdateGameSlice: string = 'Game'

export default InitialState
export { UpdateGameSlice }
