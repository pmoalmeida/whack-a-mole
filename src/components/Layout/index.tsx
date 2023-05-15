import { Box, Container } from '@mui/material'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Container sx={{ textAlign: 'center' }} maxWidth="lg">
        {children}
      </Container>
    </Box>
  )
}
