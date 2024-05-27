import Welcome from '@/components/Welcome'
import { render, screen } from '@testing-library/react'

describe('test Welcome component', () => {
  test('renders welcome message with username', () => {
    const username = 'TestUser'
    render(<Welcome username={username} />)

    expect(screen.getByText('Welcome ,')).toBeInTheDocument()

    // Check for the username with the exclamation mark part
    expect(screen.getByText(`${username}!`)).toBeInTheDocument()
  })

  test('renders instruction message', () => {
    render(<Welcome username="TestUser" />)
    const instructionMessage = screen.getByText(
      'Please select a chat to Start Messaging.',
    )
    expect(instructionMessage).toBeInTheDocument()
  })
})
