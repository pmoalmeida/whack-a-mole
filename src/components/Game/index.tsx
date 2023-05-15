import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { GAMESTEPS, Player } from '../../types'
import { Button, Container, Grid } from '@mui/material'
import { GameWrapper, Score, ScoreLabel, ScoreWrapper } from './style'
import hole from '../../assets/WAM_Hole.png'
import mole from '../../assets/WAM_Mole.png'
import hammer from '../../assets/hammer.png'
import Modal from '../Modal'
import { incrementScore, setStep } from '../../store/slices/playerSlice'
import { useGenerateNumber } from '../../hooks/useGenerateNumber'
//@ts-ignore
import boing from '../../assets/sounds/boing.mp3'
//@ts-ignore
import gameOver from '../../assets/sounds/game-over.wav'

export default function Game() {
  const player: Player = useSelector((state: RootState) => state.player)
  console.log('player', player)
  const dispatch = useDispatch()
  const [countDown, setCountDown] = useState(0)
  const [runTimer, setRunTimer] = useState(true)

  useEffect(() => {
    let timerId: NodeJS.Timer

    if (runTimer) {
      setCountDown(60 * 0.3)
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1)
      }, 1000)
    } else {
      //@ts-ignore
      clearInterval(timerId)
    }

    return () => clearInterval(timerId)
  }, [runTimer])

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false)
      setCountDown(0)
      new Audio(gameOver).play()
    }
  }, [countDown, runTimer])
  const generatedNumber = useGenerateNumber(runTimer)

  const seconds = String(countDown % 60).padStart(2, '0')
  const minutes = String(Math.floor(countDown / 60)).padStart(2, '0')

  return (
    <>
      <GameWrapper>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <ScoreWrapper>
            <ScoreLabel>Score</ScoreLabel>
            <Score>{player.score}</Score>
          </ScoreWrapper>
          <ScoreWrapper>
            <Score>Time remaining</Score>
            <Score>
              {minutes}:{seconds}
            </Score>
          </ScoreWrapper>
        </div>
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
                  onClick={() => {
                    if (i === generatedNumber) {
                      new Audio(boing).play()
                      dispatch(incrementScore())
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
        <div style={{ padding: '2rem' }}>
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
        </div>
      </Modal>
    </>
  )
}
