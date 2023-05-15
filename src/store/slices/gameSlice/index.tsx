import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GAMESTEPS } from '../../../types'
import InitialState, { UpdateGameSlice } from './types'
import { GAME_DIFFICULTY } from '../../../config'

const initialState: InitialState = {
  step: GAMESTEPS.INITIAL,
  activeNumber: -1,
  difficulty: GAME_DIFFICULTY.NORMAL,
}

export const gameSlice = createSlice({
  name: UpdateGameSlice,
  initialState,
  reducers: {
    setActiveNumber: (state, action: PayloadAction<number>) => {
      state.activeNumber = action.payload
    },
    setStep: (state, action: PayloadAction<GAMESTEPS>) => {
      state.step = action.payload
    },
    setDifficulty: (state, action: PayloadAction<GAME_DIFFICULTY>) => {
      state.difficulty = action.payload
    },
  },
})

export const { setStep, setActiveNumber, setDifficulty } = gameSlice.actions
export default gameSlice.reducer
