import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdImages } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import BookingWidget from './BookingWidget';

export default function Singleplacepage() {
    const {id} = useParams()
    const [placedata,setplacedata] = useState([])
    const [showallphotos,setshowallphotos] = useState(false)
    useEffect(()=>{
        axios.get('/places/'+id)
        .then(response => setplacedata(response.data))
        .catch(e=>console.log(e))
    },[])

    

    if(showallphotos){
        return(
            <div className='absolute inset-0 bg-black text-white '>
                <div className='p-8 grid gap-4 bg-black'>
                    <div>
                        <h2 className='text-3xl mr-48'>Photos of {placedata.title}</h2>
                        <button onClick={()=>setshowallphotos(false)} className='flex gap-1 items-center text-black right-12 top-8 rounded-2xl fixed py-2 px-4 shadow shadow-white'>
                            <IoMdCloseCircle/>Close Button</button>
                    </div>
                {placedata?.photos?.length > 0 && placedata.photos.map(photo=>(
                <div >
                 <img className='w-full rounded-2xl' src={`http://localhost:4000/`+photo} />
                </div>
                ))}
                </div>
                
            </div>
        )
    }





  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
      <h1 className='text-3xl'>{placedata.title}</h1>

      <a className='my-3 gap-1 align-middle items-center flex underline font-semibold'  target='_blank' href={'https://maps.google.com/?q='+placedata.address}>
      <MdOutlineLocationOn />        
        {placedata.address}
        </a>

<div className="relative">

        <div className='mt-8 grid gap-3 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden '>

            <div >
                {placedata.photos?.[0] && (
                    <img onClick={()=>setshowallphotos(true)} className='  cursor-pointer w-full aspect-square object-cover ' src={'http://localhost:4000/'+placedata.photos[0]} />
                    )}
            </div>

{/* side 2 img */}
            <div className='grid '>
                {placedata.photos?.[1] && (
                    <img onClick={()=>setshowallphotos(true)} className='  cursor-pointer  aspect-square w-full object-cover' src={'http://localhost:4000/'+placedata.photos[1]} />
                    )}
                {/* second img  */}
                <div className='overflow-hidden'>
                {placedata.photos?.[2] && (
                    <img onClick={()=>setshowallphotos(true)} className='  cursor-pointer  top-2 relative aspect-square w-full object-cover' src={'http://localhost:4000/'+placedata.photos[2]} />
                    )}
                </div>
            </div>
        </div>
        <button onClick={()=>setshowallphotos(true)} className='flex gap-1 absolute bottom-2 items-center right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
   <IoMdImages/>
    Show more photos
    </button>
</div>

<div className='mt-4 mb-8 gap-8 grid grid-cols-1  md:grid-cols-[2fr_1fr]'>
    <div>
    <div className='mt-4'>
    <h2 className='font-semibold text-2xl'>Description</h2>
    {placedata.description}
    </div>
    <br/>
        Check-in:{placedata.checkin}<br/>
        Check-out:{placedata.checkout}<br/>
        Max number of guests:{placedata.maxguests}
      
    </div>
    <div>                
   <BookingWidget placedata={placedata}/>
   </div>
   
</div>
<div className="bg-white p-8 -mx-8 ">

<h2 className='text-2xl font-semibold'>ExtraInfo</h2> 
        <div className='mt-2 text-gray-700 leading-5 mb-4 text-sm'>{placedata.extrainfo}</div>
</div>
    </div>
  )
}
