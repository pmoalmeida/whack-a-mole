import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Game from '.'
import { buildStore } from '../../utils/testUtils'
import mockAxios from 'jest-mock-axios'
import { API_KEY, API_URL } from '../../config/api'

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
  it('should present the game over modal when time runs out and save the score', async () => {
    mockAxios.post.mockResolvedValue({})

    const { store } = renderGame()

    act(() => jest.advanceTimersByTime(3000))

    expect(screen.queryByAltText('Mole')).toBeVisible()

    act(() => screen.getByAltText('Mole').click())

    act(() => jest.advanceTimersByTime(120000))

    expect(store.getState().player.score).toBe(100)
    expect(screen.getByText('PLAY AGAIN', { selector: 'button' })).toBeVisible()
    expect(screen.getByText('LEADERBOARD', { selector: 'button' })).toBeVisible()
    expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()
    expect(mockAxios.post).toHaveBeenCalledWith(
      API_URL,
      {
        records: [{ fields: { Name: '', Score: 100 } }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )
  })

  it('should redirect to player setup when clicking on play again within the game over modal', async () => {
    mockAxios.post.mockResolvedValue({})

    const { store } = renderGame()

    act(() => jest.advanceTimersByTime(3000))

    expect(screen.queryByAltText('Mole')).toBeVisible()

    act(() => screen.getByAltText('Mole').click())

    act(() => jest.advanceTimersByTime(120000))

    expect(store.getState().player.score).toBe(100)
    expect(screen.getByText('PLAY AGAIN', { selector: 'button' })).toBeVisible()

    screen.getByText('PLAY AGAIN', { selector: 'button' }).click()

    expect(store.getState().game.step).toEqual(0)
  })

  it('should redirect to leaderboard step when clicking on play again within the game over modal', async () => {
    mockAxios.post.mockResolvedValue({})
    const mockRecord = {
      id: 'idRecord',
      fields: {
        Name: 'Test Name',
        Score: 200,
      },
    }
    const resp = { data: { records: [mockRecord] } }
    mockAxios.get.mockResolvedValue(resp)

    const { store } = renderGame()

    act(() => jest.advanceTimersByTime(3000))

    expect(screen.queryByAltText('Mole')).toBeVisible()

    act(() => screen.getByAltText('Mole').click())

    act(() => jest.advanceTimersByTime(120000))

    expect(store.getState().player.score).toBe(100)
    expect(screen.getByText('LEADERBOARD', { selector: 'button' })).toBeVisible()

    screen.getByText('LEADERBOARD', { selector: 'button' }).click()

    expect(store.getState().game.step).toEqual(2)
  })

  it('should redirect to the initial step when clicking on play again within the game over modal', async () => {
    mockAxios.post.mockResolvedValue({})

    const { store } = renderGame()

    act(() => jest.advanceTimersByTime(3000))

    expect(screen.queryByAltText('Mole')).toBeVisible()

    act(() => screen.getByAltText('Mole').click())

    act(() => jest.advanceTimersByTime(120000))

    expect(store.getState().player.score).toBe(100)
    expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()

    screen.getByText('BACK TO HOME', { selector: 'button' }).click()

    expect(store.getState().game.step).toEqual(-1)
  })
})
