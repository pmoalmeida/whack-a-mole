import { useState, useEffect } from 'react'

// @ts-ignore
import gameOver from '../assets/sounds/game-over.wav'

export const useGameTime = () => {
  const gameOverAudio = new Audio(gameOver)
  const [countDown, setCountDown] = useState<number>(0)
  const [runTimer, setRunTimer] = useState(true)

  useEffect(() => {
    let timerId: NodeJS.Timer

    if (runTimer) {
      setCountDown(60 * 0.3)
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
      gameOverAudio.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, runTimer])

  return { runTimer, countDown }
}
