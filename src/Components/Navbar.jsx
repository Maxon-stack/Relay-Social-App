import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {IoMdAdd, IoMdSearch} from 'react-icons/io';

const Navbar = ({searchQuery, setSearchQuery, user}) => {
  const navigate = useNavigate();

  if(!user)return null;
  return (
    <div className={mainDivStyles}>
      <div className={secondDivStyles}>
        <IoMdSearch fontSize={21} className='ml-1'/>
        <input
        type='text'
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search Relay'
        value={searchQuery}
        onFocus={() => navigate('/search')}
        className='p-2 w-full bg-white outline-none'
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
          <img 
            src={user.image} 
            alt='UserImage'
            className='w-14 h-12 rounded-lg max-w-none '
          />
        </Link>        
        <Link to={'/create-post'} className='bg-black text-white  rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center '>
          <IoMdAdd/>
        </Link>
      </div>
    </div>
  )
}
const mainDivStyles = 'flex gap-2 md:gap-5 w-full mt-5 pb-2 '
const secondDivStyles = 'flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm '

export default Navbar


