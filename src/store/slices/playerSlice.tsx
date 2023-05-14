import { GAMESTEPS } from '../../types';
import InitialState, { UpdatePlayerSlice } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialState = {
  score: 0,
  name: '',
  step: GAMESTEPS.INITIAL,
};

export const playerSlice = createSlice({
  name: UpdatePlayerSlice,
  initialState: initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 100;
    },
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setStep: (state, action: PayloadAction<GAMESTEPS>) => {
      state.step = action.payload;
    },
  },
});

export const { incrementScore, setPlayerName, setStep } = playerSlice.actions;
export default playerSlice.reducer;
