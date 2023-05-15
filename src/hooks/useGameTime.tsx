import { useState, useEffect } from 'react'

export const useGameTime = (onFinishGame: () => {}) => {
  const [countDown, setCountDown] = useState<number>(0)
  const [runTimer, setRunTimer] = useState(true)

  useEffect(() => {
    let timerId: NodeJS.Timer

    if (runTimer) {
      setCountDown(60 * 1) //TODO
      timerId = setInterval(() => {
        setCountDown((ctd) => ctd - 1)
      }, 1000)
    } else {
      //@ts-ignore
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
