import { useState, useEffect } from 'react'
import { getRandomInt } from '../utils'
import { Dispatch } from '@reduxjs/toolkit'
import { setActiveNumber } from '../store/slices/gameSlice'

export const useGenerateNumber = (isActive: boolean, dispatch: Dispatch) => {
  const [generatedNumber, setGeneratedNumber] = useState(0)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(
        // set number every 2s
        () => {
          const activeNumber = getRandomInt(0, 11)
          dispatch(setActiveNumber(activeNumber))
          setGeneratedNumber(activeNumber)
        },
        2000
      )

      return () => {
        clearInterval(interval)
      }
    }
  }, [isActive, dispatch])

  return generatedNumber
}
