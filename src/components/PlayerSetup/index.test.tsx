import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import PlayerSetup from '.'
import { buildStore } from '../../utils/testUtils'
const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

function renderPlayerSetup() {
  const store = buildStore()

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const result = render(
    <Provider store={store}>
      <PlayerSetup />
    </Provider>
  )

  return { result, store }
}

describe('PlayerSetup', () => {
  it('should render the player setup in a vanilla state', async () => {
    renderPlayerSetup()
    expect(screen.queryByText('What do you want to be called?')).toBeVisible()

    const playerNameInput = screen.getByRole('textbox', { name: /Player name/ }) as HTMLInputElement
    expect(playerNameInput).toBeInTheDocument()

    expect(screen.getByText('PLAY NOW!', { selector: 'button' })).toBeVisible()
    expect(screen.getByText('BACK TO HOME', { selector: 'button' })).toBeVisible()
  })

  it('should trigger the previous step when clicking on back to home', async () => {
    renderPlayerSetup()

    screen.getByText('BACK TO HOME', { selector: 'button' }).click()
    expect(mockDispatch).toHaveBeenCalledWith({ payload: -1, type: 'Game/setStep' })
  })

  it('should not advance into the game step if the player name is empty', async () => {
    renderPlayerSetup()

    act(() => screen.getByText('PLAY NOW!', { selector: 'button' }).click())
    expect(mockDispatch).not.toHaveBeenCalled()

    expect(screen.queryByText('Please choose a name')).toBeVisible()
  })

  it('should move to the game step if there is a player name and the user clicks on play now', async () => {
    renderPlayerSetup()
    const playerNameInput = screen.getByRole('textbox', { name: /Player name/ }) as HTMLInputElement
    fireEvent.change(playerNameInput, { target: { value: 'Test Player' } })

    act(() => screen.getByText('PLAY NOW!', { selector: 'button' }).click())
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'Player/resetScore' })
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      payload: 'Test Player',
      type: 'Player/setPlayerName',
    })
    expect(mockDispatch).toHaveBeenNthCalledWith(3, { payload: 1, type: 'Game/setStep' })
  })
})
