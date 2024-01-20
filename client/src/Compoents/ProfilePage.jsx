import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import PlacesPages from './PlacesPages';
import Accountnav from './Accountnav';

export default function ProfilePage() {
  const [redirect, setredirect] = useState(null)
  const { ready, user, setuser } = useContext(UserContext)

  let { subpage } = useParams();
  if (subpage === 'undefined') {
    subpage = "profile"
  }

  if (!ready) {
    return 'Loading...'
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/LoginPage" />
  }

  async function logout() {
    await axios.post('/logout')
    setredirect('/')
    setuser(null)
  }



  if (redirect) {
    return <Navigate to={redirect} />
  }


  return (
    <div>
      <Accountnav />
      {subpage === 'profile' && (
        <div className='text-center mt-10 max-w-lg mx-auto'>
          Logged in as
          {user.name}
          ({user.email})
          <button onClick={logout} className='primary max-w-50 mt-5'>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <div>
          <PlacesPages />
        </div>
      )}
    </div>
  )
}
