import React, { useState } from 'react'

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

  console.log(formData)

  return (
    <div className='w-full h-screen bg-gray-900 text-white flex justify-center items-center bg-[url(/assets/register.jpg)] object-cover bg-no-repeat'>
        <div className='w-100 p-10 bg-[#000000cc] rounded-4xl text-white'>
            <form action="" method='post'>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="text" placeholder='First Name' name='firstName' required value={formData.firstName} onChange={handleChange}/>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="text" placeholder='Last Name' name='lastName' required value={formData.lastName} onChange={handleChange}/>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="email" placeholder='Email' name='email' required value={formData.email} onChange={handleChange}/>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="password" placeholder='Password' name='password' required value={formData.password} onChange={handleChange}/>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="password" placeholder='Confirm Password' name='confirmPassword' required value={formData.confirmPassword} onChange={handleChange}/>
                <label htmlFor="image" className='block w-full text-center'><img className='mx-auto w-5' src="/assets/addImage.png" alt="" />Upload Your Photo</label>
                <input className='invisible' id='image' type="file" name='profileImage' accept='image/*' required onChange={handleChange}/>
                {formData.profileImage && (
                  <div className='mb-3 w-full flex justify-center'>
                    <img src={URL.createObjectURL(formData.profileImage)} alt='profile photo' className='max-w-20'/>
                  </div>
                )}
                <button type='submit' className='bg-red-600 px-14 py-2 mb-4 rounded-lg block mx-auto hover:bg-amber-500'>Register</button>
            </form>
            <p className='text-sm text-center'>Already have an account? Log in <a href="/login" className='text-blue-400 underline'>Here</a></p>
        </div>
    </div>
  )
}

export default RegisterPage