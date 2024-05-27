import { render, screen } from '@testing-library/react'
import FormContainer from '@/components/FormContainer'

test('should renders children correctly', () => {
  // Render the FormContainer with some children
  render(
    <FormContainer>
      <div data-testid="child">Test Child</div>
    </FormContainer>,
  )

  // Verify that the child element is rendered
  expect(screen.getByTestId('child')).toBeInTheDocument()
  expect(screen.getByText('Test Child')).toBeInTheDocument()
})
