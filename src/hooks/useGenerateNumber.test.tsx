import { renderHook, act } from '@testing-library/react'
import { useGenerateNumber } from './useGenerateNumber'
import { GAME_DIFFICULTY } from '../config'
import * as utils from '../utils'

describe('useGenerateNumber', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  it('should run the timer and get a random number from 2 to 2 seconds', () => {
    jest.spyOn(utils, 'getRandomInt').mockReturnValue(2)
    const dispatch = jest.fn()
    const { result } = renderHook(() => useGenerateNumber(true, GAME_DIFFICULTY.NORMAL, dispatch))

    // assert initial state
    expect(result.current).toBe(0)

    // 1 minute after
    act(() => jest.advanceTimersByTime(60000))
    expect(result.current).toBe(2)
    expect(dispatch).toHaveBeenCalledWith({
      payload: 2,
      type: 'Game/setActiveNumber',
    })

    jest.spyOn(utils, 'getRandomInt').mockReturnValue(5)

    // 1 minute after
    act(() => jest.advanceTimersByTime(60000))
    expect(result.current).toBe(5)
    expect(dispatch).toHaveBeenCalledWith({
      payload: 5,
      type: 'Game/setActiveNumber',
    })
  })

  it('should not run the timer if its not active', () => {
    const dispatch = jest.fn()
    const { result } = renderHook(() => useGenerateNumber(false, GAME_DIFFICULTY.NORMAL, dispatch))

    // assert initial state
    expect(result.current).toBe(0)

    // 1 minute after
    act(() => jest.advanceTimersByTime(60000))
    expect(result.current).toBe(0)
    expect(dispatch).not.toHaveBeenCalled()
  })
})
