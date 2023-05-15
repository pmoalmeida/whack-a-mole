import { getRandomInt, transformLeaderboardData } from '.'

describe('utils', () => {
  describe('getRandomInt', () => {
    it('should generate a number between 0 and 11', () => {
      const randomInt = getRandomInt(0, 11)
      expect(randomInt).toBeGreaterThanOrEqual(0)
      expect(randomInt).toBeLessThanOrEqual(11)
    })
  })

  describe('transformLeaderboardData', () => {
    it('should transform the raw data into leaderboard data', () => {
      const mockRecord = {
        createdTime: 'time',
        fields: {
          Name: 'Test Name',
          Score: 200,
        },
        id: 'id123',
      }
      const records = [mockRecord]
      expect(transformLeaderboardData(records)).toEqual([
        {
          name: 'Test Name',
          score: 200,
        },
      ])
    })
  })
})
