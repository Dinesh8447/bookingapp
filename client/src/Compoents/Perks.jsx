import React from 'react'
import { FaWifi,FaParking  } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { PiDogLight } from "react-icons/pi";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
// import { toNamespacedPath } from 'path';

export default function Perks({selected,onchange}) {


      function handlecheck(e) {
            const {checked,name} = e.target
            if(checked){
                  onchange([...selected,name])
            } else{
                 onchange([...selected.filter(selectedname => selectedname !== name)])
            }            
      }


  return (
    <div className='grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
      <lable className="border p-4 flex rounded-2xl gap-2 items-center">
                  <input type="checkbox" checked={selected.includes('wifi')} name='wifi'  onChange={handlecheck} />  
                  <FaWifi />
                  <span>Wifi</span>
            </lable>

            <lable className="border p-4 flex rounded-2xl gap-2 items-center">
                  <input type="checkbox" checked={selected.includes('Free Parking Spot')} name='Free Parking Spot' onChange={handlecheck} />
                  <FaParking />  
                  <span>Free Parking Spot</span>
            </lable>

            <lable className="border p-4 flex rounded-2xl gap-2 items-center">
                  <input type="checkbox" checked={selected.includes('TV')} name='TV' onChange={handlecheck} />
                  <RiComputerLine />  
                  <span>TV</span>
            </lable>

            <lable className="border p-4 flex rounded-2xl gap-2 items-center">
                  <input type="checkbox" checked={selected.includes('Pets')} name='Pets' onChange={handlecheck} />  
                  <PiDogLight />
                  <span>Pets</span>
            </lable>  

            <lable className="border p-4 flex rounded-2xl gap-2 items-center ">
                  <input type="checkbox" checked={selected.includes('Private entrance')} name='Private entrance' onChange={handlecheck} />  
                  <RiGitRepositoryPrivateLine />
                  <span>Private entrance</span>
            </lable>
    </div>
  )
}
