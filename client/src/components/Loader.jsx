import React from 'react'

const Loader = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader