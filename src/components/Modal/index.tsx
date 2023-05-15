import { ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import { DialogTitle } from '@mui/material'

export interface ModalProps {
  open: boolean
  children: ReactNode
  title: string
}

export default function Modal(props: ModalProps) {
  const { open, title } = props

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      {props.children}
    </Dialog>
  )
}
