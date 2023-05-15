import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import InitialState, { UpdatePlayerSlice } from './types'

const initialState: InitialState = {
  score: 0,
  name: '',
}

export const playerSlice = createSlice({
  name: UpdatePlayerSlice,
  initialState,
  reducers: {
    resetScore: (state) => {
      state.score = 0
    },
    incrementScore: (state) => {
      state.score += 100
    },
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

export const { incrementScore, setPlayerName, resetScore } = playerSlice.actions
export default playerSlice.reducer
