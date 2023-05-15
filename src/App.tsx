import React from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { GAMESTEPS } from './types'
import Game from './components/Game'
import Leaderboard from './components/Leaderboard'
import { Box, Button, Grid, Typography } from '@mui/material'
import PlayerSetup from './components/PlayerSetup'
import Layout from './components/Layout'
import { setStep } from './store/slices/gameSlice'

function App() {
  const step: GAMESTEPS = useSelector((state: RootState) => state.game.step)
  const dispatch = useDispatch()

  function renderStep(stepToRender: GAMESTEPS) {
    switch (stepToRender) {
      case GAMESTEPS.GAME:
        return <Game />
      case GAMESTEPS.PLAYER_SETUP:
        return <PlayerSetup />
      case GAMESTEPS.LEADERBOARD:
        return <Leaderboard />
      default:
        return (
          <Layout>
            <Box>
              <Typography variant="h1" paragraph={true} aria-label="Title">
                Whack-a-mole!
              </Typography>
            </Box>
            <Grid container={true} spacing={1}>
              <Grid item={true} xs={12}>
                <Button
                  fullWidth={true}
                  variant="contained"
                  size="large"
                  onClick={() => dispatch(setStep(GAMESTEPS.PLAYER_SETUP))}
                >
                  PLAY
                </Button>
              </Grid>
              <Grid item={true} xs={12}>
                <Button
                  fullWidth={true}
                  variant="contained"
                  size="large"
                  onClick={() => dispatch(setStep(GAMESTEPS.LEADERBOARD))}
                >
                  LEADERBOARD
                </Button>
              </Grid>
            </Grid>
          </Layout>
        )
    }
  }

  return renderStep(step)
}

export default App
