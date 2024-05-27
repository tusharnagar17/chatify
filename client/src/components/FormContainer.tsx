import { ReactNode } from 'react'

const FormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      id="form-container"
      className="flex bg-first justify-center items-center h-screen bg-back"
    >
      {children}
    </div>
  )
}

export default FormContainer
