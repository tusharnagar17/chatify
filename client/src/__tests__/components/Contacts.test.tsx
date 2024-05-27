import { UserProps } from '@/types/interface'
import { fireEvent, render, screen } from '@testing-library/react'
import Contacts from '@/components/Contacts'

// mockContacts
const mockContacts: UserProps[] = [
  {
    username: 'User1',
    avatarImage: 'avatarImage1',
    _id: '',
    email: '',
    password: '',
    isAvatarImageSet: false,
  },
  {
    username: 'User2',
    avatarImage: 'avatarImage2',
    _id: '',
    email: '',
    password: '',
    isAvatarImageSet: false,
  },
]
// mockFunctions
const mockChangeChat = jest.fn()

describe('Contacts component', () => {
  // mockLocal Storage
  beforeEach(() => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => {
        if (key == 'chat-app-user') {
          return JSON.stringify({
            username: 'CurrentUser',
            avatarImage: 'currentUserImage',
          })
        }
        return null
      })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should renders Contacts component with current user info', async () => {
    render(<Contacts contacts={mockContacts} changeChat={mockChangeChat} />)

    // Check if current user's image and username are rendered
    const currentUserImage = await screen.findByAltText('Current User Avatar')
    const currentUsername = await screen.findByText('CurrentUser')

    expect(currentUserImage).toBeInTheDocument()
    expect(currentUsername).toBeInTheDocument()
  })

  test('render the list of contacts', async () => {
    render(<Contacts contacts={mockContacts} changeChat={mockChangeChat} />)

    const contact1 = await screen.findByText('User1')
    const contact2 = await screen.findByText('User2')

    expect(contact1).toBeInTheDocument()
    expect(contact2).toBeInTheDocument()
  })
  test('changes chat when a contact is clicked', async () => {
    render(<Contacts contacts={mockContacts} changeChat={mockChangeChat} />)

    // Click on the first contact
    const contact1 = await screen.findByText('User1')
    fireEvent.click(contact1)

    expect(mockChangeChat).toHaveBeenCalledWith(mockContacts[0])
  })
  test('highlights the selected chat', async () => {
    render(<Contacts contacts={mockContacts} changeChat={mockChangeChat} />)

    // Click on the first contact
    const contact1 = await screen.findByText('User1')
    fireEvent.click(contact1)

    // Verify the first contact has the selected class
    expect(contact1.parentElement).toHaveClass('bg-gray-700')

    // Click on the second contact
    const contact2 = await screen.findByText('User2')
    fireEvent.click(contact2)

    // Verify the second contact has the selected class and the first one does not
    expect(contact2.parentElement).toHaveClass('bg-gray-700')
    expect(contact1.parentElement).not.toHaveClass('bg-gray-700')
  })
})
