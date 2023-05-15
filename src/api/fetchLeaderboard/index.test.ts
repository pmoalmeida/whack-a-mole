import mockAxios from 'jest-mock-axios'
import { fetchLeaderboard } from '.'
import { API_KEY, API_URL } from '../../config/api'
describe('fetchLeaderboard', () => {
  afterEach(() => {
    mockAxios.reset()
  })
  it('should fetch the raw data from leaderboard and return it transformed', async () => {
    const mockRecord = {
      id: 'idRecord',
      fields: {
        Name: 'Test Name',
        Score: 200,
      },
    }
    const resp = { data: { records: [mockRecord] } }
    mockAxios.get.mockResolvedValue(resp)
    const result = await fetchLeaderboard()

    expect(mockAxios.get).toHaveBeenCalledWith(`${API_URL}?maxRecords=10&view=Leaderboard`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    expect(result).toEqual({
      records: [
        {
          name: 'Test Name',
          score: 200,
        },
      ],
      success: true,
    })
  })

  it('should return error when api fails', async () => {
    const errorObj = new Error('Something wrong')
    mockAxios.get.mockRejectedValue(errorObj)
    const result = await fetchLeaderboard()

    expect(mockAxios.get).toHaveBeenCalledWith(`${API_URL}?maxRecords=10&view=Leaderboard`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    expect(result).toEqual({
      error: errorObj,
      success: false,
    })
  })
})
