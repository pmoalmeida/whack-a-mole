export enum GAME_DIFFICULTY {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
}

export const DIFFICULTY_INTERVALS = {
  [GAME_DIFFICULTY.EASY]: {
    generateInterval: 3000,
  },
  [GAME_DIFFICULTY.NORMAL]: {
    generateInterval: 2000,
  },
  [GAME_DIFFICULTY.HARD]: {
    generateInterval: 900,
  },
}
