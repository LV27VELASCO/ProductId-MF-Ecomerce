import React from 'react'

const Modal = ({msg}) => {
  return (
    <div className="w-full mt-1 flex justify-center rounded-lg bg-red-500">
        <p className="text-white font-medium">{msg}</p>
    </div>
  )
}

export default Modal