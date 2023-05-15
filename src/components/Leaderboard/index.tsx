import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Layout from '../Layout'
import { fetchLeaderboard } from '../../api/fetchLeaderboard'
import { GAMESTEPS, Player } from '../../types'
import { setStep } from '../../store/slices/gameSlice'
import { useDispatch } from 'react-redux'

export default function Leaderboard() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])

  useEffect(() => {
    setLoading(true)
    const getLeaderBoard = async () => {
      const leaderboard = await fetchLeaderboard()
      setLoading(false)
      if (leaderboard.records) {
        setLeaderboard(leaderboard.records)
      }
    }

    getLeaderBoard()
  }, [])

  const renderLeaderboard = () =>
    leaderboard.length > 0 ? (
      <TableContainer>
        <Table size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Player name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((row, i) => (
              <TableRow key={row.name}>
                <TableCell>
                  <b>{i + 1}</b>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <>
        <p>No players yet!</p>
      </>
    )

  return (
    <Layout>
      <Box>
        <Typography variant="h2" paragraph>
          Leaderboard
        </Typography>
      </Box>
      {loading ? <CircularProgress /> : renderLeaderboard()}
      <Grid container spacing={1}>
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
    </Layout>
  )
}
