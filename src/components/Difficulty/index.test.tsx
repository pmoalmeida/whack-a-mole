import { act, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Difficulty from '.'
import { buildStore } from '../../utils/testUtils'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

function renderDifficulty() {
  const store = buildStore()

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const result = render(
    <Provider store={store}>
      <Difficulty />
    </Provider>
  )

  return { result, store }
}

describe('Difficulty', () => {
  it('should render the initial screen', () => {
    renderDifficulty()

    expect(screen.queryByLabelText('Difficulty')).toBeVisible()
    const easyInput = screen.getByRole('radio', { name: /Easy/ }) as HTMLInputElement
    expect(screen.queryByLabelText('Difficulty')).toBeVisible()
    const normalInput = screen.getByRole('radio', { name: /Normal/ }) as HTMLInputElement
    expect(screen.queryByLabelText('Difficulty')).toBeVisible()
    const hardInput = screen.getByRole('radio', { name: /Hard/ }) as HTMLInputElement

    expect(easyInput).toBeInTheDocument()
    expect(normalInput).toBeInTheDocument()
    expect(hardInput).toBeInTheDocument()
    expect(normalInput.checked).toBe(true)
    expect(easyInput.checked).toBe(false)
    expect(hardInput.checked).toBe(false)
  })

  it('should change the difficulty to easy when clicked on easy', async () => {
    renderDifficulty()

    const easyInput = screen.getByRole('radio', { name: /Easy/ }) as HTMLInputElement
    act(() => easyInput.click())

    expect(easyInput.checked).toBe(true)
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ payload: 'EASY', type: 'Game/setDifficulty' })
    })
  })
})
