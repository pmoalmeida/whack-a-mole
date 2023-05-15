import { render, screen } from '@testing-library/react'
import Modal from '.'

describe('Modal', () => {
  it('should render a modal with its content', () => {
    render(
      <Modal open={true} title="Title">
        <div aria-label="test">Test</div>
      </Modal>
    )
    expect(screen.getByLabelText('test')).toBeVisible()
    expect(screen.getByLabelText('Title')).toBeVisible()
  })
})
