export type Player = {
  score: number
  name: string
}

export enum GAMESTEPS {
  INITIAL = -1,
  PLAYER_SETUP = 0,
  GAME = 1,
  LEADERBOARD = 2,
}
