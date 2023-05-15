import { useState, useEffect } from 'react'

export const useGameTime = (onFinishGame: () => void) => {
  const [countDown, setCountDown] = useState<number>(0)
  const [runTimer, setRunTimer] = useState(true)

  useEffect(() => {
    let timerId: NodeJS.Timer | undefined

    if (runTimer) {
      setCountDown(60 * 2) // 2 minutes is the time that the game should be running
      timerId = setInterval(() => {
        setCountDown((ctd) => ctd - 1)
      }, 1000)
    } else {
      clearInterval(timerId)
    }

    return () => clearInterval(timerId)
  }, [runTimer])

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false)
      setCountDown(0)
      onFinishGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, runTimer])

  return { runTimer, countDown }
}
