import mockAxios from 'jest-mock-axios'
import { saveScore } from '.'
import { API_KEY, API_URL } from '../../config/api'
describe('saveScore', () => {
  afterEach(() => {
    mockAxios.reset()
  })
  it('should save the score', async () => {
    const player = {
      name: 'Its me, Mario',
      score: 200,
    }
    mockAxios.post.mockResolvedValue({})
    const result = await saveScore(player)
    const payload = {
      records: [
        {
          fields: {
            Name: player.name,
            Score: player.score,
          },
        },
      ],
    }

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    expect(result).toEqual({
      success: true,
    })
  })

  it('should return error when api fails', async () => {
    const errorObj = new Error('Something wrong')
    mockAxios.post.mockRejectedValue(errorObj)

    const player = {
      name: 'Its me, Mario',
      score: 200,
    }

    const result = await saveScore(player)
    const payload = {
      records: [
        {
          fields: {
            Name: player.name,
            Score: player.score,
          },
        },
      ],
    }

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL, payload, {
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
