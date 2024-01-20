import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosContact } from "react-icons/io";
import { FaBook ,FaRegBuilding} from "react-icons/fa";


export default function Accountnav() {

    const {pathname} = useLocation()
    let subpage = pathname.split('/')[2];

    if(subpage === undefined){
        subpage = 'profile'
    }

    function linkclasses(type=subpage){
        let classes = 'py-2 px-6 inline-flex items-center gap-2'
        if(type === subpage){
        classes = 'bg-primary items-center text-white rounded-full py-2 px-6 inline-flex gap-2'
        }else{
          classes = 'bg-gray-200 items-center text-black rounded-full py-2 px-6 inline-flex gap-2'
        }
        return classes
       }

  return (
    <nav className='w-full justify-center flex mt-8 gap-4'>
        <Link className={linkclasses('profile')} to='/account/profile'><IoIosContact /> My profile</Link>
        <Link className={linkclasses('bookings')} to='/account/bookings'><FaBook />My bookings</Link>
        <Link className={linkclasses('places')} to='/account/places'><FaRegBuilding />My accommodate</Link>
      </nav>
  )
}
