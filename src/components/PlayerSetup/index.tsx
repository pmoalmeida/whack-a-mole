import React, { useState } from 'react'
import { resetScore, setPlayerName, setStep } from '../../store/slices/playerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { GAMESTEPS, Player } from '../../types'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import Layout from '../Layout'

export default function PlayerSetup() {
  const player: Player = useSelector((state: RootState) => state.player)
  const [name, setName] = useState(player.name)
  console.log('player', player)
  const dispatch = useDispatch()
  return (
    <Layout>
      <Box>
        <Typography variant="h4" paragraph>
          What do you want to be called?
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="playerName"
            onChange={(e) => setName(e.target.value)}
            label="Player name"
            variant="outlined"
            defaultValue={name}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="medium"
            onClick={() => {
              dispatch(resetScore())
              dispatch(setPlayerName(name))
              dispatch(setStep(GAMESTEPS.GAME))
            }}
          >
            Play now!
          </Button>
        </Grid>
      </Grid>
    </Layout>
  )
}
