import React, { useState } from 'react'
import { resetScore, setPlayerName } from '../../store/slices/playerSlice'
import { setStep } from '../../store/slices/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { GAMESTEPS, Player } from '../../types'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import Layout from '../Layout'
import Difficulty from '../Difficulty'

export default function PlayerSetup() {
  const player: Player = useSelector((state: RootState) => state.player)
  const [name, setName] = useState(player.name)
  const [error, setError] = useState(false)
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
            error={error}
            helperText={!!error ? 'Please choose a name' : ''}
            onChange={(e) => {
              setError(!e.target.value)
              setName(e.target.value)
            }}
            label="Player name"
            variant="outlined"
            defaultValue={name}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Difficulty />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="medium"
            onClick={() => {
              if (name) {
                dispatch(resetScore())
                dispatch(setPlayerName(name))
                dispatch(setStep(GAMESTEPS.GAME))
              } else {
                setError(true)
              }
            }}
          >
            Play now!
          </Button>
        </Grid>
      </Grid>
    </Layout>
  )
}
