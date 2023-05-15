import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { GAMESTEPS, Player } from '../../types'
import { Button, Container, Grid } from '@mui/material'
import {
  GameWrapper,
  RedBoldLabel,
  BoldLabel,
  InfoWrapper,
  ResultWrapper,
  GameHeader,
} from './style'
import hole from '../../assets/WAM_Hole.png'
import mole from '../../assets/WAM_Mole.png'
import hammer from '../../assets/hammer.png'
import Modal from '../Modal'
import { setActiveNumber, setStep } from '../../store/slices/gameSlice'
import { incrementScore } from '../../store/slices/playerSlice'
import { useGenerateNumber } from '../../hooks/useGenerateNumber'
// @ts-ignore
import boing from '../../assets/sounds/boing.mp3'
// @ts-ignore
import gameOver from '../../assets/sounds/game-over.wav'
import { useGameTime } from '../../hooks/useGameTime'
import { GAME_DIFFICULTY } from '../../config'
import { saveScore } from '../../api/saveScore'

export default function Game() {
  const boingAudio = new Audio(boing)
  const gameOverAudio = new Audio(gameOver)
  const player: Player = useSelector((state: RootState) => state.player)
  const difficulty: GAME_DIFFICULTY = useSelector((state: RootState) => state.game.difficulty)
  const generatedNumber: number = useSelector((state: RootState) => state.game.activeNumber)
  const dispatch = useDispatch()

  const onFinishGame = async () => {
    gameOverAudio.play()
    if (player.score > 0) await saveScore(player)
  }

  const { runTimer, countDown } = useGameTime(onFinishGame)

  useGenerateNumber(runTimer, difficulty, dispatch)

  const seconds = String(countDown % 60).padStart(2, '0')
  const minutes = String(Math.floor(countDown / 60)).padStart(2, '0')

  return (
    <>
      <GameWrapper>
        <GameHeader>
          <InfoWrapper>
            <RedBoldLabel>Score</RedBoldLabel>
            <BoldLabel>{player.score}</BoldLabel>
          </InfoWrapper>
          <InfoWrapper>
            <BoldLabel>Time remaining</BoldLabel>
            <BoldLabel>
              {minutes}:{seconds}
            </BoldLabel>
          </InfoWrapper>
        </GameHeader>
        <Container
          sx={{
            cursor: `url(${hammer}), pointer`,
          }}
        >
          <Grid container rowSpacing={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {Array(12)
              .fill(true)
              .map((_, i) => (
                <Grid
                  item
                  key={`grid-${i}`}
                  onClick={() => {
                    if (i === generatedNumber) {
                      boingAudio.play()
                      dispatch(incrementScore())
                      dispatch(setActiveNumber(-1))
                    }
                  }}
                  xs={4}
                >
                  <img src={i === generatedNumber ? mole : hole} key={`image-${i}`} alt={'Hole'} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </GameWrapper>
      <Modal title="Game over" open={!runTimer}>
        <ResultWrapper>
          <p>Thank you for playing, {player.name}</p>
          <p>Time is off, you scored a total of {player.score} points!</p>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => {
                  dispatch(setStep(GAMESTEPS.PLAYER_SETUP))
                }}
              >
                PLAY AGAIN
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => {
                  dispatch(setStep(GAMESTEPS.LEADERBOARD))
                }}
              >
                LEADERBOARD
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => {
                  dispatch(setStep(GAMESTEPS.INITIAL))
                }}
              >
                BACK TO HOME
              </Button>
            </Grid>
          </Grid>
        </ResultWrapper>
      </Modal>
    </>
  )
}
