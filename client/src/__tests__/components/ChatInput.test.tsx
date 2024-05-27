import { render, screen, fireEvent } from '@testing-library/react'
import ChatInput from '@/components/ChatInput'
import EmojiPicker from 'emoji-picker-react'

jest.mock('emoji-picker-react', () => ({
  __esModule: true,
  default: ({
    onEmojiClick,
  }: {
    onEmojiClick: (emojiData: { emoji: string }) => void
  }) => (
    <div data-testid="emoji-picker">
      <button onClick={() => onEmojiClick({ emoji: '😊' })}>😊</button>
    </div>
  ),
}))

describe('ChatInput test', () => {
  test('should able to submit form', () => {
    const sendMessage = jest.fn()

    render(<ChatInput sendMessage={sendMessage} />)

    const input = screen.getByPlaceholderText('Type your message here!')
    // const submitBtn = screen.getByRole('button', { name: /send/i })

    fireEvent.change(input, { target: { value: 'Hello' } })

    fireEvent.click(screen.getByRole('button'))

    // Assert that sendMessage function is called with the correct message
    expect(sendMessage).toHaveBeenCalledWith('Hello')

    // Assert that the input field is cleared after submission
    expect(input).toHaveValue('')
  })

  test('should able to click and render emojiPicker', () => {
    // 1. click on emoji picker
    const handleEmojiClick = jest.fn()
    render(
      <EmojiPicker open={true} onEmojiClick={handleEmojiClick} height={400} />,
    )

    // Find and click an emoji button in EmojiPicker
    fireEvent.click(screen.getByText('😊'))

    // Verify that handleEmojiClick is called with the correct emoji
    expect(handleEmojiClick).toHaveBeenCalledWith({ emoji: '😊' })
  })
})
