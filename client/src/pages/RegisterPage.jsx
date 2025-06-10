import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData, 
      [name]: value,
      [name]: name === 'profileImage' ? files[0] : value
    })
  }

  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData()

      for(var key in formData) {
        registerForm.append(key, formData[key])
      }

      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        body: registerForm
      })

      if(response.ok) {
        navigate('/login')
      }
    } catch (err) {
      // console.log(err)
      console.log("Registration failed", err.message)
    }
  }

  return (
    <div className='w-full h-screen bg-gray-900 text-white flex justify-center items-center bg-[url(/assets/register.jpg)] bg-cover'>
        <div className='w-100 p-10 bg-[#000000cc] rounded-4xl text-white'>
            <form onSubmit={handleSubmit}>
                <input className='px-3 py-2 mb-4 text-lg rounded-lg border focus:border-sky-500 focus:outline focus:outline-sky-500 w-full' type="text" placeholder='First Name' name='firstName' required value={formData.firstName} onChange={handleChange}/>
                <input className='px-3 py-2 mb-4 border focus:border-sky-500 focus:outline focus:outline-sky-500 text-lg rounded-lg w-full' type="text" placeholder='Last Name' name='lastName' required value={formData.lastName} onChange={handleChange}/>
                <input className='px-3 py-2 mb-4 border focus:border-sky-500 focus:outline focus:outline-sky-500 text-lg rounded-lg w-full' type="email" placeholder='Email' name='email' required value={formData.email} onChange={handleChange}/>
                <input className='px-3 py-2 mb-4 border focus:border-sky-500 focus:outline focus:outline-sky-500 text-lg rounded-lg w-full' type="password" placeholder='Password' name='password' required value={formData.password} onChange={handleChange}/>
                <input className='px-3 py-2 border focus:border-sky-500 focus:outline focus:outline-sky-500 text-lg rounded-lg w-full' type="password" placeholder='Confirm Password' name='confirmPassword' required value={formData.confirmPassword} onChange={handleChange}/>
                {!passwordMatch && (
                  <p className='text-red-600'>Passwords are not matching</p>
                )}
                <label htmlFor="image" className='block w-full text-center mt-4 cursor-pointer'><img className='mx-auto w-5' src="/assets/addImage.png" alt="" />Upload Your Photo</label>
                <input className='invisible' id='image' type="file" name='profileImage' accept='image/*' required onChange={handleChange}/>
                {formData.profileImage && (
                  <div className='mb-3 w-full flex justify-center'>
                    <img src={URL.createObjectURL(formData.profileImage)} alt='profile photo' className='max-w-20'/>
                  </div>
                )}
                <button type='submit' disabled={!passwordMatch} className='bg-red-600 shadow-lg shadow-red-500/50 px-14 py-2 mb-4 rounded-lg block mx-auto hover:bg-red-500 cursor-pointer disabled:bg-red-800 disabled:cursor-not-allowed'>Register</button>
            </form>
            <p className='text-sm text-center'>Already have an account? Log in <a href="/login" className='text-blue-400 underline'>Here</a></p>
        </div>
    </div>
  )
}

export default RegisterPage;