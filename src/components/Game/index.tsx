import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Player } from '../../types';
import { Container, Grid } from '@mui/material';
import { GameWrapper, Score, ScoreLabel, ScoreWrapper } from './style';

export default function Game() {
  const player: Player = useSelector((state: RootState) => state.player);
  console.log('player', player);
  const dispatch = useDispatch();
  return (
    <GameWrapper>
      <ScoreWrapper>
        <ScoreLabel>Score</ScoreLabel>
        <Score>0</Score>
      </ScoreWrapper>
      <Container>
        <Grid container rowSpacing={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Array(12)
            .fill(true)
            .map((_, i) => (
              <Grid item xs={4}>
                <span>{i}</span>
              </Grid>
            ))}
        </Grid>
      </Container>
    </GameWrapper>
  );
}
