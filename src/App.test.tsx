import { act, render, screen, waitFor } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'

import App from './App'

import { Provider } from 'react-redux'
import { buildStore } from './utils/testUtils'
const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

function renderApp() {
  const store = buildStore()

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const result = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  return { result, store }
}

describe('App', () => {
  afterEach(() => {
    mockAxios.reset()
  })
  it('should render the initial screen', async () => {
    renderApp()

    expect(screen.getByLabelText('Title')).toBeVisible()
    expect(screen.getByText('PLAY', { selector: 'button' })).toBeVisible()
    expect(screen.getByText('LEADERBOARD', { selector: 'button' })).toBeVisible()
  })

  it('should set the step to 2 (moving to the leaderboard page) when clicking on the leaderboard button', async () => {
    const mockRecord = {
      id: 'idRecord',
      fields: {
        Name: 'Test Name',
        Score: 200,
      },
    }
    const resp = { data: { records: [mockRecord] } }
    mockAxios.get.mockResolvedValue(resp)
    renderApp()
    screen.getByText('LEADERBOARD', { selector: 'button' }).click()

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ payload: 2, type: 'Game/setStep' })
    })
  })

  it('should set the step to 0 (moving to the player setup page) when clicking on the play button', async () => {
    renderApp()
    act(() => {
      screen.getByText('PLAY', { selector: 'button' }).click()

      expect(mockDispatch).toHaveBeenCalledWith({ payload: 0, type: 'Game/setStep' })
    })
  })
})
