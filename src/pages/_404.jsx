import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const _404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
    <Link
              to="/login"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Go Back Home
    </Link>
  </div>
  )
}

export default _404