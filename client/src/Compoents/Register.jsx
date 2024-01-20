import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const[name,setname]=useState('')
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')

  async function register(e){
    e.preventDefault()
    try{
      await axios.post('/register',{
        name,
        email,
        password
      })
      alert('success')
    }
    catch (e){
      alert('register fail')
    }
  
  }

  return (
    <div className="mt-4 flex items-center justify-around">
    <div className="mb-64">
    <h1 className="text-4xl text-center mb-4">Register</h1>
    <form onSubmit={register} className="max-w-md mx-auto ">
    <input 
    type="text" 
    placeholder="john"
    value={name}
    onChange={(e)=>setname(e.target.value)}
    />
      <input 
      type="email" 
      placeholder="john301@gmail.com"
      value={email}
      onChange={(e)=>setemail(e.target.value)}
      />
      <input 
      type="password" 
      placeholder="password"
      value={password}
      onChange={(e)=>setpassword(e.target.value)}
      />
      <button className="primary">Register</button>
      <div className="text-center p-2 text-gray-500">
       Already have account? <Link to='/loginpage'>loginpage</Link>
     </div>
    </form>
    </div>
</div>

  )
  
}
