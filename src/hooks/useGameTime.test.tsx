import { renderHook, act } from '@testing-library/react'
import { useGameTime } from './useGameTime'

describe('useGameTime', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  it('should run the timer until it finishes', () => {
    const onFinish = jest.fn()
    const { result } = renderHook(() => useGameTime(onFinish))

    // assert initial state
    expect(result.current.countDown).toBe(120)
    expect(result.current.runTimer).toBe(true)

    // 1 minute after
    act(() => jest.advanceTimersByTime(60000))
    expect(result.current.countDown).toBe(60)
    expect(result.current.runTimer).toBe(true)

    // 1.5 minutes after
    act(() => jest.advanceTimersByTime(90000))
    expect(result.current.countDown).toBe(0)
    expect(result.current.runTimer).toBe(false)
    expect(onFinish).toHaveBeenCalledTimes(1)
  })
})
