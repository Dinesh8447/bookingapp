import { useEffect, useState } from "react"
import axios from 'axios'
import {Link} from 'react-router-dom'


export default function IndexPages() {
  const [placesdata,setplacesdata] = useState([])

  useEffect(()=>{
    axios.get('/places')
    .then(response=>setplacesdata(response.data))
    .catch(e=>console.log(e))
  },[])



  return (
    <div className=" mt-8 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
      {
       placesdata.map(place=>(
          <Link to={'/place/'+place._id} key={place._id}>
            <div className=" bg-gray-500 gap-x-6 gap-y-8 mb-2 flex rounded-2xl">
             {place.photos?.[0] && ( 
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/'+place.photos?.[0]}  alt='img' />
              )}
          </div>
          <h2 className="font-bold truncate ">{place.address}</h2>
          <h3 className="text-sm text-gray-500 ">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">{place.price}rs </span>
            <span className="font-extralight font-mono"> Per nigth</span>
          </div>
          </Link>
        ))
      }
  </div>
  
  )
}
