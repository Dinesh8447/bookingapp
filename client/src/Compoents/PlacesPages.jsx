import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios'
import Accountnav from './Accountnav';
import PlaceImg from './PlaceImg';


export default function PlacesPages() {
  const [placesinfo,setplacesinfo] = useState([])
  
  useEffect(()=>{
    axios.get('/places').then(({data})=>{
      setplacesinfo(data)
    })
  },[])

  return (
    <div>
      <Accountnav/>
      <div className='text-center mt-6'>
      <Link className='bg-primary  inline-flex gap-2 text-white items-center py-2 px-6 rounded-full' to='/account/places/new'>
      <IoIosAddCircleOutline className='w-5 h-5' />
        Add new Places
      </Link>
      </div>
    
      <div className='mt-5 bg-gray-100'>
        {placesinfo.length > 0 && placesinfo.map(place=>(
          <Link to={'/account/places/' + place._id} className='bg-gray-100 flex gap-4 rounded-2xl p-4 cursor-pointer' key={place._id}>
            <div className='p-1 mb-2'>
              {place.photos.length > 0 &&  (
                <img className='object-cover rounded w-32 h-32' src={'http://localhost:4000/'+place.photos[0]}/>
                // <PlaceImg place={place.photos}/>
              )}
            </div>
            <div className='grow-0 shrink'>
            <h2 className='text-xl font-bold'>{place.title}</h2>
            <p className='text-sm mt-2'>{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  )
}
