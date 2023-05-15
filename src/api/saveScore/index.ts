import axios from 'axios'
import { API_KEY, API_URL } from '../../config/api'
import { Player } from '../../types'

export const saveScore = async ({ name, score }: Player) => {
  const payload = {
    records: [
      {
        fields: {
          Name: name,
          Score: score,
        },
      },
    ],
  }

  return await axios
    .post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((r) => {
      return { success: true }
    })
    .catch((e) => {
      return { success: false, error: e }
    })
}
