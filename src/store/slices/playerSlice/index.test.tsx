import { incrementScore, resetScore, setPlayerName } from '.'
import store from '../..'

describe('Player Redux Slice', () => {
  it('should initially set game to the initial state', () => {
    const state = store.getState().player
    expect(state).toEqual({
      score: 0,
      name: '',
    })
  })

  it('should set player name', async () => {
    const result = await store.dispatch(setPlayerName('Mario'))
    const name = result.payload

    const state = store.getState().player
    expect(state).toEqual({ name, score: 0 })
  })

  it('should increment score', async () => {
    await store.dispatch(incrementScore())

    const state = store.getState().player
    expect(state).toEqual({ name: 'Mario', score: 100 })
  })

  it('should reset score', async () => {
    await store.dispatch(resetScore())

    const state = store.getState().player
    expect(state).toEqual({ score: 0, name: 'Mario' })
  })
})
