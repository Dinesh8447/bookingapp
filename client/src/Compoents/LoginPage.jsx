import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'



export default function LoginPage() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [redirect,setredirect] = useState(false)
  const {setuser} = useContext(UserContext)
  async function login(e) {
    e.preventDefault()
    try {
     const {data} =  await axios.post('/login',{ email, password });
     setuser(data)
      // alert('login success')
      setredirect(true)
    }
    catch (e) {
      alert("try again")
    }
  }

  if(redirect){
    return  <Navigate to="/"/>
  }


  return (

    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={login}>
          <input
            type="email"
            placeholder="enter email"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="enter password"
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center p-2 text-gray-500">
            Dont have account? <Link to='/register'>Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
