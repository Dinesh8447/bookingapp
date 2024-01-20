import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function PlaceImg({placeimg}) {
    // const [placesinfo,setplacesinfo] = useState([])
    // useEffect(()=>{
    //   axios.get('/places').then(({data})=>{
    //     setplacesinfo(data)
    //   })
    // },[])
    console.log(placeimg)

  return (
<div>

    {placeimg.length > 0 && placeimg.map(place=>(
          <div className='p-1 mb-2'>
                <img className='object-cover rounded w-32 h-32' src={'http://localhost:4000/'+place.photos[0]}/>
          </div>
      ))}
      </div>    
  )
}
