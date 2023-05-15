import { ApiRecord } from '../api/types'

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const transformLeaderboardData = (records: ApiRecord[]) =>
  records.map((record) => ({
    name: record.fields.Name,
    score: record.fields.Score,
  }))
