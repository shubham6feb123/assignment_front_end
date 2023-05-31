import React, { useState } from 'react'
import Spinner from '../components/Spinner';
import {useNavigate} from 'react-router-dom'
// import {bro} from "react-router"
import { login_user } from '../api_functions/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true) 
      const result = await login_user(email, password);
      navigate("/dashboard", {replace:true})
      if (result.data.success) {
        //{ user_id, name, email, mobile, dob }
        const user_data = result.data.data
        const json_str = JSON.stringify(user_data)
        window.localStorage.setItem("user_data", json_str)
        setLoading(false)
        // window.location.replace("/dashboard")
      }
   } catch (error) {
      alert("Invalid Credentials")
      setLoading(false)
   }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" type="email" id="email" placeholder="Email" value={email}
              onChange={handleEmailChange} required/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" type="password" id="password" placeholder="Password"
            value={password}
            onChange={handlePasswordChange} required/>
        </div>
        <div className="flex flex-col gap-2 items-center justify-between">
            <button disabled={loading} className="w-full flex place-content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {loading ?
                <Spinner /> :
                'Login'
            }
            </button>
            <div>OR</div>
              <button disabled={loading} className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={()=>{navigate("/register")}}>
              Register
            </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login