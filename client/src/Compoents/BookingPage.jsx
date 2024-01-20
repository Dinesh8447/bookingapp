import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaPhone } from "react-icons/fa6";

export default function BookingPage() {
  const { id } = useParams()
  const [booking, setbooking] = useState([])

  useEffect(() => {
    axios.get(`/bookings/${id}`)
      .then(({ data }) => setbooking(data))
      .catch(e => console.log(e))
  }, [])

console.log(booking)

  return (
    <div className='my-8'>
      
      <div className="p-4 mb-4 rounded-2xl bg-gray-200">
        <h2 className='text-3xl'>Your Booking Information:</h2>
        <p className='text-lg gap-2 flex items-center'><CgProfile />Name: {booking.name}</p>
      <p className=' text-lg gap-2  flex items-center'><MdOutlineEmail />Email: {booking.email}</p>
      <p className=' text-lg gap-2  flex items-center'><FaPhone />Phone No: {booking.phonenumber}</p>
        <div className='flex items-center gap-2 text-sm mt-2 text-gray-600'>
          <IoMoonOutline />{booking.numberofguest} nights:
          <FaRegCalendarAlt />{booking.checkin} &rarr; <FaRegCalendarAlt />{booking.checkout}
        </div>
        <div className='flex items-center text-2xl gap-2 mt-2'>
          <CiMoneyBill className='w-8 h-8' />Total Price:{booking.price}000rs
        </div>
      </div>
      {/* <p>photo</p> */}
    </div>
  )
}
