import { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Buffer } from 'buffer'
import { ToastContainer, toast } from 'react-toastify'
import { toastOptions } from '../utils/ToastOptions'
import { SetAvatarRoute } from '../utils/ApiRoute'
import { useNavigate } from 'react-router-dom'

const SetAvatarPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [avatar, setAvatar] = useState<string[]>([])
  const [selectedAvatar, setSelectedAvatar] = useState<undefined | number>(
    undefined,
  )
  const navigate = useNavigate()

  const api = 'https://api.multiavatar.com/4567847'
  const apiKey = '4DAGKFQOHSnbtf'

  useEffect(() => {
    const data: string[] = []
    const makeAvatar = async () => {
      try {
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}?apikey=${apiKey}`,
            { responseType: 'arraybuffer' },
          )

          const buffer = Buffer.from(response.data)
          data.push(buffer.toString('base64'))
        }
        setAvatar(data)
        setIsLoading(false)
      } catch (error: unknown) {
        let errorMessage = 'Error :'
        if (error instanceof TypeError) {
          errorMessage += error.message
        }
        toast.error(errorMessage, toastOptions)
      }
    }

    makeAvatar()
  }, [])

  const SetAvatarServer = async () => {
    if (selectedAvatar == undefined) {
      toast.error('Please select an avatar!', toastOptions)
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user') || '')
      const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
        image: avatar[selectedAvatar],
      })

      if (data?.status) {
        localStorage.setItem('chat-app-user', JSON.stringify(data?.user))
        navigate('/')
      } else {
        toast.error('Error setting avatar. Please try again!', toastOptions)
      }
    }
  }

  return (
    <>
      <FormContainer>
        <div>
          {isLoading ? (
            <div className="text-white text-5xl">
              <img src={'/assets/loader.gif'} alt="" />
            </div>
          ) : (
            <div className="text-white rounded-xl px-2 py-6 md:px-10 md:py-18 bg-front max-w-lg">
              <div className="font-bold text-2xl text-center my-8">
                Pick an avatar as your profile picture
              </div>
              {/* images */}
              <div className="flex justify-around items-center my-8 flex-wrap">
                {avatar.map((item, index: number) => {
                  return (
                    <div key={index} className="rounded-full">
                      <img
                        src={`data:image/svg+xml;base64,${item}`}
                        alt="avatar"
                        className={
                          selectedAvatar == index
                            ? 'border-4 rounded-full border-violet-600 h-20 w-20'
                            : 'h-20 w-20'
                        }
                        onClick={() => setSelectedAvatar(index)}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-center items-center my-6">
                <button
                  className="bg-violet-600 my-2 py-1 px-4 rounded-xl text-md font-bold hover:bg-violet-900"
                  onClick={SetAvatarServer}
                >
                  Set As Profile Picture
                </button>
              </div>
            </div>
          )}
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

export default SetAvatarPage
