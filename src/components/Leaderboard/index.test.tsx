import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'
import { Provider } from 'react-redux'
import Leaderboard from '.'
import { buildStore } from '../../utils/testUtils'
const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

function renderLeaderboard() {
  const store = buildStore()

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const result = render(
    <Provider store={store}>
      <Leaderboard />
    </Provider>
  )

  return { result, store }
}

describe('Leaderboard', () => {
  beforeEach(() => {
    const mockRecord = {
      id: 'idRecord',
      fields: {
        Name: 'Test Name',
        Score: 200,
      },
    }
    const resp = { data: { records: [mockRecord] } }

    mockAxios.get.mockResolvedValue(resp)
  })
  afterEach(() => {
    mockAxios.reset()
  })
  it('should render the leaderboard if there are results', async () => {
    renderLeaderboard()

    await waitForElementToBeRemoved(() => screen.queryByRole(/progressbar/i))
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))
    expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()

    expect(screen.queryByText('Player name')).toBeVisible()
    expect(screen.queryByText('Score')).toBeVisible()
    expect(screen.queryByText('#')).toBeVisible()
    expect(screen.queryByText('Test Name')).toBeVisible()
    expect(screen.queryByText('200')).toBeVisible()
  })

  it('should render the no players section if there are no results', async () => {
    mockAxios.get.mockResolvedValue({ data: { records: [] } })
    renderLeaderboard()

    await waitForElementToBeRemoved(() => screen.queryByRole(/progressbar/i))
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))
    expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()

    expect(screen.queryByText('No players yet!')).toBeVisible()
  })

  it('should trigger the previous step when clicking on back to home', async () => {
    renderLeaderboard()
    await waitForElementToBeRemoved(() => screen.queryByRole(/progressbar/i))
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))
    expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()

    screen.getByText('BACK TO HOME', { selector: 'button' }).click()
    expect(mockDispatch).toHaveBeenCalledWith({ payload: -1, type: 'Game/setStep' })
  })
})
