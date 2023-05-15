import { useState, useEffect } from 'react'
import { getRandomInt } from '../utils'

export const useGenerateNumber = (isActive: boolean) => {
  const [generatedNumber, setGeneratedNumber] = useState(0)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(
        // set number every 2s
        () => setGeneratedNumber(getRandomInt(0, 11)),
        2000
      )

      return () => {
        clearInterval(interval)
      }
    }
  }, [isActive])

  return generatedNumber
}
