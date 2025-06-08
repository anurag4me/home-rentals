import React from 'react'

const RegisterPage = () => {
  return (
    <div className='w-full h-screen bg-gray-900 text-white flex justify-center items-center bg-[url(/assets/register.jpg)] object-cover bg-no-repeat'>
        <div className='w-100 p-10 bg-[#000000cc] rounded-4xl text-white'>
            <form action="" method='post'>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="text" placeholder='First Name' name='first-name' required/>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="text" placeholder='Last Name' name='last-name' required/>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="email" placeholder='Email' name='email' required/>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="password" placeholder='Password' name='password' required/>
                <input className='px-3 py-2 mb-4 border border-white-500 text-lg rounded-lg outline-none w-full' type="password" placeholder='Confirm Password' name='password' required/>
                <label htmlFor="image" className='block w-full text-center'><img className='mx-auto w-5' src="/assets/addImage.png" alt="" />Upload Your Photo</label>
                <input className='invisible' id='image' type="file" name='profile-image' accept='image/*' />
                <button type='submit' className='bg-red-600 px-14 py-2 mb-4 rounded-lg block mx-auto hover:bg-amber-500'>Register</button>
            </form>
            <p className='text-sm text-center'>Already have an account? Log in <a href="/login">Here</a></p>
        </div>
    </div>
  )
}

export default RegisterPage