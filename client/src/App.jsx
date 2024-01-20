import { Route, Routes } from 'react-router-dom'
import './index.css'
import axios from 'axios'
import IndexPages from './Compoents/IndexPages'
import LoginPage from './Compoents/LoginPage'
import Layout from './Layout'
import Register from './Compoents/Register'
import ProfilePage from './Compoents/ProfilePage'
import PlacesPages from './Compoents/PlacesPages'
import PlacesFormPage from './Compoents/PlacesFormPage'
import Singleplacepage from './Compoents/Singleplacepage'
import BookingPage from './Compoents/BookingPage'
import BookingsPage from './Compoents/BookingsPage'

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPages />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPages />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/:subpage?" element={<ProfilePage />} />
          <Route path="/place/:id" element={<Singleplacepage/>} />
          <Route path="/account/booking/:id" element={<BookingPage/>} />
          <Route path="/account/bookings" element={<BookingsPage/>} />
          {/* <Route path="/account/:subpage/:action" element={<ProfilePage />} /> */}
          {/* <Route path="/account/places/:id" element={<ProfilePage />} /> */}
          {/* <Route path="/account/places/new" element={<ProfilePage />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App
