import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogoFlickr } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { UserContext } from '../UserContext';

export default function Header() {
  const {user}=useContext(UserContext)
  return (
    <header className=" flex justify-between">

      <Link to='/' className="flex items-center gap-1">
        <IoLogoFlickr />
        <span className="font-bold text-xl">BookingApp</span>
      </Link>

      <div className="flex gap-2 border border-gray-100 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border border-l border-gray-300"></div>
        <div>Anyplace</div>
        <div className="border border-l border-gray-300"></div>
        <div>Addgust</div>
        <button className="bg-primary text-white p-1 rounded-full "><CiSearch /></button>
      </div>

      <Link to={user ? "/account" : "/LoginPage"} className="flex items-center gap-2 border border-gray-100 rounded-full py-2 px-4 overflow-hidden ">
        <RxHamburgerMenu />
        <div className="bg-gray-500 text-white rounded-full border border-gray-500"><IoMdContact /></div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
      </Link>

    </header>
  )
}
