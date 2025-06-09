import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      /* Get data after fetching */
      const data = await response.json()

      if(response.ok) {
        navigate('/')
      }
    } catch (err) {
      console.log(err)
      console.log("Login failed", err.message)
    }
  }

  return (
    <div className='w-full h-screen bg-gray-900 text-white flex justify-center items-center bg-[url(/assets/login.jpg)] bg-cover'>
        <div className='w-100 p-10 bg-[#000000cc] rounded-4xl text-white'>
            <form onSubmit={handleSubmit}>
                <input className='px-3 py-2 mb-4 border focus:border-sky-500 focus:outline focus:outline-sky-500 text-lg rounded-lg w-full' type="email" placeholder='Email' name='email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input className='px-3 py-2 mb-4 border focus:border-sky-500 focus:outline focus:outline-sky-500 text-lg rounded-lg w-full' type="password" placeholder='Password' name='password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit' className='bg-red-600 px-14 py-2 mb-4 rounded-lg block mx-auto hover:bg-red-500 cursor-pointer'>Login</button>
            </form>
            <p className='text-sm text-center'>Don't have an account? Sign In <a href="/register" className='text-blue-400 underline'>Here</a></p>
        </div>
    </div>
  )
}

export default LoginPage