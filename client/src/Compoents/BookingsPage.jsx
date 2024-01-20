import React, { useEffect, useState } from 'react'
import Accountnav from './Accountnav'
import axios from 'axios'
import PlaceImg from './PlaceImg'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function BookingsPage() {

    const [bookingdata, setbookingdata] = useState([])

    useEffect(() => {
        axios.get('/bookings')
            .then(bookingdata => setbookingdata(bookingdata.data))
            .catch(e => console.log(e))
    }, [])

    return (
        <div>
            <Accountnav />
            <div className='mt-5 grid gap-2'>
                {bookingdata?.length > 0 && bookingdata.map(booking => (
                    <Link to={`/account/booking/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                        <div className='w-48'>
                            {/* <img src='' alt="img"/> */}
                            <PlaceImg placeimg={booking}/>
                        </div>
                        <div className='py-3 pr-3 grow'>
                            <h2 className='text-xl'>{booking.name}</h2>
                            <div>
                                <div className='flex items-center gap-2 text-sm mt-2 text-gray-600'>
                                    <IoMoonOutline />{booking.numberofguest} nights:
                                    <FaRegCalendarAlt />{booking.checkin} &rarr; <FaRegCalendarAlt />{booking.checkout}
                                </div>
                                <div className='flex items-center text-2xl gap-2 mt-2'>
                                    <CiMoneyBill className='w-8 h-8' />Total Price: {booking.price}000rs
                                </div>
                            </div>
                            
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}
