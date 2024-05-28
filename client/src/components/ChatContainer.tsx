import { RefObject, useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import axios from 'axios'
import { AllMessageRoute, SendMessageRoute } from '../utils/ApiRoute'
import { IoChevronBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { UserProps } from '../types/interface'
import { Socket } from 'socket.io-client'

interface Message {
  fromSelf: boolean
  message: string
}

interface ChatContainerProps {
  currentChat: UserProps
  currentUser: UserProps | undefined
  socketRef: RefObject<Socket | null>
  hideForMobile: () => void
}

const ChatContainer = ({
  currentChat,
  currentUser,
  socketRef,
  hideForMobile,
}: ChatContainerProps) => {
  const [message, setMessage] = useState<Message[]>([])
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const FetchMessage = async () => {
      const response = await axios.post(AllMessageRoute, {
        from: currentUser?._id,
        to: currentChat._id,
      })
      setMessage(response.data.ProjectedMessage)
    }
    FetchMessage()
  }, [currentChat._id, currentUser?._id])

  const handleMessageSend = async (chat: string) => {
    await axios.post(SendMessageRoute, {
      from: currentUser?._id,
      to: currentChat._id,
      message: chat,
    })
    if (socketRef.current) {
      socketRef.current.emit('send-msg', {
        to: currentChat._id,
        from: currentUser?._id,
        message: chat,
      })
    }

    const newMsgs: Message[] = [...message]
    newMsgs.push({ fromSelf: true, message: chat })
    setMessage(newMsgs)
  }

  useEffect(() => {
    const socket = socketRef.current
    if (socket) {
      const handleMessageReceive = (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: msg })
      }

      socket.on('msg-receive', handleMessageReceive)

      return () => {
        socket.off('msg-receive', handleMessageReceive)
      }
    }
  })

  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])
  // autoscroll for new message
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <div className="flex flex-col gap-2 justify-between h-full bg-back rounded-xl">
      {/* Receiver header */}
      <div className="flex items-center h-[10%] justify-start bg-first rounded-xl gap-4 p-2 ">
        <div
          className="block md:hidden"
          onClick={() => {
            hideForMobile()
            navigate('/')
          }}
        >
          <IoChevronBackOutline size={40} color="white" />
        </div>
        <div className="rounded-full">
          <img
            src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
            className="w-14 h-14 rounded-full "
          />
        </div>
        <div className="text-lg font-bold">{currentChat?.username}</div>
      </div>
      {/* Message container */}
      <div className="bg-first rounded-xl h-[80%]  p-4 relative overflow-y-auto">
        {message.length < 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="font-bold text-2xl">No Message! Start typing</div>
          </div>
        ) : (
          message.map((ptr, index) => {
            return (
              <div
                key={index}
                className={`flex items-center ${
                  ptr?.fromSelf ? 'justify-end' : 'justify-start'
                }`}
                ref={scrollRef}
              >
                <div
                  className={` rounded-full max-w-[60%] px-4 py-1 ${
                    ptr?.fromSelf
                      ? 'my-2 bg-violet-800'
                      : 'bg-violet-600 my-[3px]'
                  }`}
                >
                  {ptr?.message}
                </div>
              </div>
            )
          })
        )}
      </div>
      {/* ChatInput */}
      <div className="px-2 bg-first py-2 h-[10%] ">
        <ChatInput sendMessage={handleMessageSend} />
      </div>
    </div>
  )
}

export default ChatContainer
