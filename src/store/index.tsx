import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/playerSlice'

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
