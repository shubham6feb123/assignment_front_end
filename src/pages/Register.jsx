import React, { useState} from 'react'
import { useNavigate, } from 'react-router-dom'
import Spinner from '../components/Spinner';
import {register_user_to_db} from "../api_functions/axios"


const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const result = await register_user_to_db(name, email, mobile, dob, password)

      if (result.data.success) {
        setLoading(false)
        setName('')
        setDob('')
        setEmail('')
        setPassword('')
        setMobile('')
        navigate('/login')
        alert('user registered')
      } else {
        alert('failed to register user')
      }
      console.log("user resgister result ",result)
    } catch (error) {
      console.log("error from register submit ", error)
      alert('failed to register user')
      setLoading(false)
    }
  };


  return (
    <>
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required  
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">Mobile</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="text"
              id="mobile"
              value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">Date of Birth</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="date"
              id="dob"
              value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="email"
              id="email"
              value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="password"
              id="password"
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="password"
              id="confirmPassword"
                value={password}
                readOnly
                required
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-between">
            <button disabled={loading}  className="w-full flex place-content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {loading ? (
                <Spinner/>
              ) : (
                'Register'
              )}
              </button>
              <div>OR</div>
              <button disabled={loading} className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={()=>{navigate("/login")}}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register