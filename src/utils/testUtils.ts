import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../store/slices/gameSlice'
import playerReducer from '../store/slices/playerSlice'

function buildStore(gamePayload = {}) {
  const store = configureStore({
    reducer: {
      game: gameReducer,
      player: playerReducer,
    },
  })
  return store
}

export { buildStore }
