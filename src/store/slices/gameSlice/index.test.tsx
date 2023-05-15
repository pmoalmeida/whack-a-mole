import { setActiveNumber, setDifficulty, setStep } from '.'
import store from '../..'
import { GAME_DIFFICULTY } from '../../../config'
import { GAMESTEPS } from '../../../types'

describe('Game Redux Slice', () => {
  it('should initially set game to the initial state', () => {
    const state = store.getState().game
    expect(state).toEqual({
      activeNumber: -1,
      difficulty: GAME_DIFFICULTY.NORMAL,
      step: -1,
    })
  })

  it('should set active number', async () => {
    const result = await store.dispatch(setActiveNumber(2))
    const activeNumber = result.payload

    const state = store.getState().game
    expect(state).toEqual({ activeNumber, difficulty: GAME_DIFFICULTY.NORMAL, step: -1 })
  })

  it('should set step', async () => {
    const result = await store.dispatch(setStep(GAMESTEPS.PLAYER_SETUP))
    const step = result.payload

    const state = store.getState().game
    expect(state).toEqual({ step, difficulty: GAME_DIFFICULTY.NORMAL, activeNumber: 2 })
  })

  it('should set game difficulty', async () => {
    const result = await store.dispatch(setDifficulty(GAME_DIFFICULTY.HARD))
    const difficulty = result.payload

    const state = store.getState().game
    expect(state).toEqual({ step: GAMESTEPS.PLAYER_SETUP, difficulty, activeNumber: 2 })
  })
})
