import axios from 'axios';
import React, { useState } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

export default function Uploadphotos({addedphotos,onChange}) {

    const[photolink,setphotolink] =useState('')

    
 async function AddPhotoByLink(e){
    e.preventDefault()
    const {data:filename} = await axios.post('/upload-by-link',{link:photolink})
    onChange(prev =>{
      return [...prev,filename]
    })

    setphotolink('')
}


function uploadphotos(e){
  const files = e.target.files
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append('photos',files[i])
  }
  axios.post('/uploads',data,{
    headers:{"Content-Type":"multipart/form-data"}      
  })
  .then(res=>{
    const {data:filename} = res
    onChange(prev =>{
      return [...prev,...filename]
    })  
  })
}


function removephoto(e,filename) {
  e.preventDefault()
  onChange([...addedphotos.filter(photo => photo !== filename)])
}

function SelectAsMainPhoto(e,filename) {
  e.preventDefault()
  onChange([filename,...addedphotos.filter(photo => photo !== filename)]) 
}

  return (
    <>
     {/* upload link */}
     {/* <h2 className='text-2xl mt-4'>photos</h2>
     <p className='text-gray-500 text-sm'>more = better</p>
     <div className='flex gap-2'>
       <input type="text" value={photolink} onChange={e=>setphotolink(e.target.value)} placeholder='Add using a link...jpg' />
       <button onClick={AddPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
     </div> */}

{/* upload photos */}
     <div className='mt-6 mb-6 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
       {addedphotos.length > 0 && addedphotos.map(link =>(
         <div className='h-32 flex relative' key={link}>
             <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/'+ link}/>
             <button onClick={e=>removephoto(e,link)} className='absolute bottom-2 right-2 text-white bg-black opacity-50 cursor-pointer rounded-2xl py-2 px-2'>
                <AiOutlineDelete/>
             </button>

             <button onClick={e=>SelectAsMainPhoto(e,link)} className='absolute bottom-2 left-2 text-white bg-black opacity-50 cursor-pointer rounded-2xl py-2 px-2'>
                {link == addedphotos[0] && (
                <IoMdHeart/>
                 )}

                {link !== addedphotos[0] && (
                <IoIosHeartEmpty/>                

                )}
             </button>

         </div>
       ))}
     <label className='h-32 border cursor-pointer bg-transparent rounded-2xl p-8 text-2xl justify-center flex gap-5 text-gray-600'>
       <input multiple type="file" className='hidden' onChange={uploadphotos} />
       <MdOutlineFileUpload />Upload
     </label>
     </div>
       </>
  )
}
