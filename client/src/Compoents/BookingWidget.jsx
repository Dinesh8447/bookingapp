import React, { useState } from 'react'
import  { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'


export default function BookingWidget({placedata}) {
    const [checkin,setcheckin] = useState('')
    const [checkout,setcheckout] = useState('')
    const [numberofguest,setnumberofguest] = useState(1)
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [phonenumber,setphonenumber] = useState('')
    const [redirect,setredirect] = useState('')
    
    let numberofnight = 0 

    if(checkin && checkout){
        numberofnight = differenceInCalendarDays(new Date(checkout),new Date(checkin))
    }


   async function BookThisPlace() {
       const response = await axios.post('/booking',{checkin,checkout,numberofguest,name,email,phonenumber,price:numberofnight})
        const bookingid = response.data._id
        setredirect(`/account/booking/${bookingid}`)
    }


    

    if(redirect){
        return <Navigate to={redirect}/>
    }


  return (
    <div>
    <div className='bg-white p-4 shadow rounded-2xl'>
        <h2 className='text-2xl text-center'>Price:{placedata.price} Rs / per night</h2>

    <div className="border mt-4 rounded-2xl">
         <div className="flex">
        <div className=' py-3 px-4 '>
            <label>CheckIn: </label>
            <input type="date" value={checkin} onChange={e=>setcheckin(e.target.value)}/>
        </div>
        <div className=' py-3 px-4 border-l '>
            <label>CheckOut: </label>
            <input type="date" value={checkout} onChange={e=>setcheckout(e.target.value)}/>
        </div>        
    </div>       
    <div className=' py-3 px-4 border-t '>
            <label>Maxguests: </label>
            <input type="number" value={numberofguest} onChange={e=>setnumberofguest(e.target.value)}/>
        </div>
        {numberofnight > 0 && (
        <div className=' py-3 px-4 border-t '>
            <label>Your Name: </label>
            <input type="text" value={name} onChange={e=>setname(e.target.value)}/>

            <label>Your email: </label>
            <input type="text" value={email} onChange={e=>setemail(e.target.value)}/>

            <label>Phone No: </label>
            <input type="text" value={phonenumber} onChange={e=>setphonenumber(e.target.value)}/>
        </div>
        )}        
    </div>        


        <button onClick={BookThisPlace} className='primary mt-1'>
            Book this place
            {numberofnight > 0 && (
                <span>{numberofnight + placedata.price}rs</span>
            )}
        </button>
    </div>
</div>
  )
}
