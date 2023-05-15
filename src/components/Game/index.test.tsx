import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Game from '.'
import { buildStore } from '../../utils/testUtils'
import mockAxios from 'jest-mock-axios'

function renderGame() {
  const store = buildStore()

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const result = render(
    <Provider store={store}>
      <Game />
    </Provider>
  )

  return { result, store }
}

describe('Game', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  afterEach(() => {
    mockAxios.reset()
  })
  it('should render the game screen', async () => {
    renderGame()
    expect(screen.queryByText('Score')).toBeVisible()
    expect(screen.queryByText('Time remaining')).toBeVisible()
    expect(screen.queryByText('0')).toBeVisible()
    expect(screen.queryByText('02:00')).toBeVisible()

    Array(12)
      .fill(true)
      .forEach((_, i) => {
        expect(screen.queryByAltText(`Hole-${i}`)).toBeVisible()
      })

    // expect(screen.getByText('PLAY AGAIN', { selector: 'button' })).toBeVisible()
    // expect(screen.getByText('LEADERBOARD', { selector: 'button' })).toBeVisible()
    // expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()
  })

  it('should increment score when hitting on a mole', async () => {
    const { store } = renderGame()
    expect(screen.queryByText('Score')).toBeVisible()
    expect(screen.queryByText('Time remaining')).toBeVisible()
    expect(screen.queryByText('0')).toBeVisible()
    expect(screen.queryByText('02:00')).toBeVisible()

    Array(12)
      .fill(true)
      .forEach((_, i) => {
        expect(screen.queryByAltText(`Hole-${i}`)).toBeVisible()
      })

    act(() => jest.advanceTimersByTime(3000))

    expect(screen.queryByAltText(`Mole`)).toBeVisible()

    act(() => screen.getByAltText('Mole').click())

    expect(store.getState().player.score).toBe(100)
  })

  it('should present the game over modal when time runs out but not save the score', async () => {
    const { store } = renderGame()

    act(() => jest.advanceTimersByTime(121000))

    expect(store.getState().player.score).toBe(0)
    expect(screen.getByText('PLAY AGAIN', { selector: 'button' })).toBeVisible()
    expect(screen.getByText('LEADERBOARD', { selector: 'button' })).toBeVisible()
    expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()
    expect(mockAxios.post).not.toHaveBeenCalled()
  })
  it.skip('should present the game over modal when time runs out and save the score', async () => {
    //TODO
    const { store } = renderGame()

    act(() => jest.advanceTimersByTime(3000))

    expect(screen.queryByAltText('Mole')).toBeVisible()

    act(() => screen.getByAltText('Mole').click())

    act(() => jest.advanceTimersByTime(120000))

    expect(store.getState().player.score).toBe(100)
    expect(screen.getByText('PLAY AGAIN', { selector: 'button' })).toBeVisible()
    expect(screen.getByText('LEADERBOARD', { selector: 'button' })).toBeVisible()
    expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()
    expect(mockAxios.post).toHaveBeenCalledWith('')
  })
})
