import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GAMESTEPS } from '../../../types'
import InitialState, { UpdateGameSlice } from './types'

const initialState: InitialState = {
  step: GAMESTEPS.INITIAL,
  activeNumber: -1,
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
  },
})

export const { setStep, setActiveNumber } = gameSlice.actions
export default gameSlice.reducer
