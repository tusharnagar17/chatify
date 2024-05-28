import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import { AllUsersRoute, Host } from '../utils/ApiRoute'
import { io, Socket } from 'socket.io-client'
import { UserProps } from '../types/interface'

const ChatPage = () => {
  const socketRef = useRef<Socket | null>(null)
  const navigate = useNavigate()
  const [contacts, setContacts] = useState<UserProps[]>([])
  const [currentChat, setCurrentChat] = useState<UserProps | undefined>(
    undefined,
  )
  const [currentUser, setCurrentUser] = useState<UserProps | undefined>(
    undefined,
  )

  // socetRef --> attribute
  useEffect(() => {
    socketRef.current = io(Host, {
      reconnectionAttempts: 5, // Limit reconnection attempts to 5
      reconnectionDelay: 10000, // 2 seconds delay between reconnections
      reconnectionDelayMax: 5000, // Maximum delay of 5 seconds
      timeout: 20000, // 20 seconds timeout for connection attempt
    })
    socketRef.current.emit('add-user', currentUser?._id)
  }, [currentUser])

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userString = localStorage.getItem('chat-app-user')

      if (!userString) {
        navigate('/login')
      } else {
        const user = await JSON.parse(userString)
        setCurrentUser(user)
      }
    }
    fetchCurrentUser()
  }, [navigate])

  useEffect(() => {
    const CheckAvatar = async () => {
      if (currentUser) {
        if (currentUser?.isAvatarImageSet) {
          const response = await axios.get(
            `${AllUsersRoute}/${currentUser?._id}`,
          )

          setContacts(response.data.user)
        } else {
          navigate('/setAvatar')
        }
      }
    }
    CheckAvatar()
  }, [currentUser, navigate])

  const handleChatChange = (chat: UserProps) => {
    setCurrentChat(chat)
  }
  const hideForMobile = () => {
    setCurrentChat(undefined)
  }

  return (
    <div>
      {/* For web screen above 576px  */}
      <div className="hidden min-[576px]:block">
        <div className="flex justify-center md:items-center h-screen bg-first">
          <div className="flex items-center justify-start gap-10 text-white md:m-2 rounded-3xl p-4  w-[90%] h-[90%] bg-second">
            {/* Sidebar */}
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {/* Chat Bar */}
            <div className="rounded-xl flex-1 h-full">
              {currentChat === undefined ? (
                <Welcome username={currentUser?.username || ''} />
              ) : (
                <ChatContainer
                  hideForMobile={hideForMobile}
                  currentChat={currentChat}
                  currentUser={currentUser}
                  socketRef={socketRef}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* For mobile screen */}
      <div className="text-white bg-first block min-[576px]:hidden ">
        <div className="h-screen bg-second">
          {currentChat == undefined ? (
            <div className="h-full">
              <Contacts contacts={contacts} changeChat={handleChatChange} />
            </div>
          ) : (
            <ChatContainer
              hideForMobile={hideForMobile}
              currentChat={currentChat}
              currentUser={currentUser}
              socketRef={socketRef}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
