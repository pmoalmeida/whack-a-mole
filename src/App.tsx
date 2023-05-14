import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { GAMESTEPS } from './types';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import { Box, Button, Grid, Typography } from '@mui/material';
import { setStep } from './store/slices/playerSlice';
import PlayerSetup from './components/PlayerSetup';
import Layout from './components/Layout';

function App() {
  const step: GAMESTEPS = useSelector((state: RootState) => state.player.step);
  const dispatch = useDispatch();

  function renderStep(step: GAMESTEPS) {
    switch (step) {
      case GAMESTEPS.GAME:
        return <Game />;
      case GAMESTEPS.PLAYER_SETUP:
        return <PlayerSetup />;
      case GAMESTEPS.LEADERBOARD:
        return <Leaderboard />;
      default:
        return (
          <Layout>
            <Box>
              <Typography variant="h1" paragraph>
                Whack-a-mole!
              </Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => {
                    dispatch(setStep(GAMESTEPS.PLAYER_SETUP));
                  }}
                >
                  PLAY
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => {
                    dispatch(setStep(GAMESTEPS.LEADERBOARD));
                  }}
                >
                  LEADERBOARD
                </Button>
              </Grid>
            </Grid>
          </Layout>
        );
    }
  }

  return renderStep(step);
}

export default App;
