import { useState, useEffect } from 'react'
import { getRandomInt } from '../utils'
import { Dispatch } from '@reduxjs/toolkit'
import { setActiveNumber } from '../store/slices/gameSlice'
import { DIFFICULTY_INTERVALS, GAME_DIFFICULTY } from '../config'

/*  
Depending on the game difficulty the player has chosen in the setup, the random number generator will be faster/slower
*/
export const useGenerateNumber = (
  isActive: boolean,
  difficulty: GAME_DIFFICULTY,
  dispatch: Dispatch
) => {
  const [generatedNumber, setGeneratedNumber] = useState(0)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const activeNumber = getRandomInt(0, 11)
        dispatch(setActiveNumber(activeNumber))
        setGeneratedNumber(activeNumber)
      }, DIFFICULTY_INTERVALS[difficulty].generateInterval)

      return () => {
        clearInterval(interval)
      }
    }
  }, [isActive, difficulty, dispatch])

  return generatedNumber
}
