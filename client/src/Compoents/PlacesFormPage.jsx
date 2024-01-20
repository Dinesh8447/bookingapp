import React, { useEffect, useState } from 'react'
import Perks from './Perks';
import Uploadphotos from './Uploadphotos';
import Accountnav from './Accountnav';
import axios from 'axios';
import { Navigate,useParams } from 'react-router-dom';

export default function PlacesFormPage() {
  const {id} = useParams()
  const[title,settitle] =useState('')
  const[address,setaddress] =useState('')
  const[addedphotos,setaddedphotos] =useState([])
  const[description,setdescription] =useState('')
  const[perks,setperks] =useState([])
  const[extrainfo,setextrainfo] =useState('')
  const[checkin,setcheckin] =useState('')
  const[checkout,setcheckout] =useState('')
  const[maxguests,setmaxguests] =useState(1)
  const[price,setprice] =useState(1000)
  const [redirect,setredirect] = useState(false)


  useEffect(()=>{
    if(!id){
      return
    }
    axios.get('/places/'+id).then(response=>{
      const {data} = response
      settitle(data.title)
      setaddress(data.address)
      setaddedphotos(data.photos)
      setdescription(data.description)
      setperks(data.perks)
      setextrainfo(data.extrainfo)
      setcheckin(data.checkin)
      setcheckout(data.checkout)
      setmaxguests(data.maxguests)
      setprice(data.price)
    })
  },[id])


  

  async function saveplace(e) {
    e.preventDefault()
    const placedata = {title,address,description,photos:addedphotos,perks,extrainfo,checkin,checkout,maxguests,price}
    if(id){
      //Updata
      await axios.put(`/places/${id}`,{...placedata})
     setredirect(true)
    }else{
      // New Place
      await axios.post(`/places`,placedata)
     setredirect(true)
    }
  }


  if(redirect){
    return <Navigate to='/account/places'/>
  }
  
  return (

    <div>
      <Accountnav/>
    <form onSubmit={saveplace}>
{/* title */}
      <h2 className='text-2xl mt-4'>Title</h2>
      <p className='text-gray-500 text-sm'>title for your place.should be short and catchy as in advertisment</p>
      <input type="text" value={title} onChange={e=>settitle(e.target.value)} placeholder='title,for example:My lovely apt' />

    {/* address */}
      <h2 className='text-2xl mt-4'>Address</h2>
      <p className='text-gray-500 text-sm'>Address to this place</p>
      <input type="text" value={address} onChange={e=>setaddress(e.target.value)} placeholder='address' />


<Uploadphotos addedphotos={addedphotos} onChange={setaddedphotos} />



{/* description */}
      <h2 className='text-2xl mt-4'>Description</h2>
      <p className='text-gray-500 text-sm'>description of the places</p>
      <textarea value={description} onChange={e=>setdescription(e.target.value)} className='border rounded-lg' rows={3} cols={70}/>


{/* perks */}
    <h2 className='text-2xl mt-4'>Perks</h2>
    <p className='text-gray-500 text-sm'>select all the perks</p>
    <Perks selected={perks} onchange={setperks}/>
     
       {/*extra info  */}
    <h2 className='text-2xl mt-4'>Extra info</h2>
    <p className='text-gray-500 text-sm'>house rules,etc</p>
    <textarea value={extrainfo} onChange={e=>setextrainfo(e.target.value)} className='border rounded-lg' rows={3} cols={70}/>

{/* check in & out */}
    <h2 className='text-2xl mt-4'>Check In&Out times,max guests</h2>
    <p className='text-gray-500 text-sm'>add check in and out times, remember to have some time window for cleaning the room b/w guests</p>
  <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
        
        <div>
          <h3 className='mt-2 mb-1 '>Check in time</h3>
          <input type="text" value={checkin} onChange={e=>setcheckin(e.target.value)} placeholder='9:00PM'/>
        </div>
        
        <div>
          <h3 className='mt-2 mb-1 '>Check out time</h3>
          <input type="text" value={checkout} onChange={e=>setcheckout(e.target.value)} placeholder='8:00AM'/>
        </div>


{/* maxguest */}
        <div>
          <h3 className='mt-2 mb-1 '>Max numbers of guests</h3>
          <input type="number" value={maxguests} onChange={e=>setmaxguests(e.target.value)} placeholder='3'/>
        </div>
{/* price */}
        <div>
          <h3 className='mt-2 mb-1 '>Price per night</h3>
          <input type="number" value={price} onChange={e=>setprice(e.target.value)} placeholder='1000rs'/>
        </div>

{/* submit button */}
      </div>
      <button className='primary my-4'>Save</button>      
    </form>
    </div>
  )
}
