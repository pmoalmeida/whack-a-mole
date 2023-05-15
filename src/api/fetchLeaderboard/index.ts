import axios from 'axios'
import { API_KEY, API_URL } from '../../config/api'
import { Player } from '../../types'
import { transformLeaderboardData } from '../../utils'

/*
   This data is coming sorted by the BE service by default
   I'm just limiting it to be 10 max records
   */
export const fetchLeaderboard = async (): Promise<{
  success: boolean
  records?: Player[]
  error?: Error
}> =>
  await axios
    .get(`${API_URL}?maxRecords=10&view=Leaderboard`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((r) => {
      return { success: true, records: transformLeaderboardData(r.data.records) }
    })
    .catch((e) => {
      return { success: false, error: e }
    })
