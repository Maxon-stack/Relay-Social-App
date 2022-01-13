import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai'
import {GiGlobe} from 'react-icons/gi'
import relay from '../assets/relay.png';
import {categories} from '../utilityFunctions/data'


const Sidebar = ({user, closeSidebar}) => {
  const closingSidebar = () =>{
    if(closeSidebar) closeSidebar(false);
  }
  return (
    <div className={mainDivStyles}>
      
      <div className="flex flex-col">
        
        <Link 
        to='/'
        className={linkStylesLogo + ' shadow-inner place-content-center'}
        onClick={closingSidebar}
        >
        <img src={relay} alt="logo" className='w-20'/>
        </Link>
        
        <div className="flex flex-col ">
          <NavLink
          to='/'
          className={( {isActive}) => (isActive ? isActiveStyle : isNotActiveStyle) + userLinkStyles}
          onClick={closingSidebar}
          >
            <AiOutlineHome fontSize={30}/>
            Home
          </NavLink>

          <div className=" drop-shadow-lg "></div>
            <h3 className={'mt-2 px-5 text-xl 2xl:text-xl font-bold flex items-center px-5 gap-3 font-extrabold transition-all duration-200 ease-in-out capitalize' }>
              
              Discover Hobbies
              <GiGlobe fontSize={25}/>
            </h3>
          {categories.slice(0,categories.length -1).map((category) => (
            <NavLink
            to={`/category/${category.name}`}
            className={({isActive}) => (isActive ? isActiveStyle : isNotActiveStyle) + userLinkStyles}
            onClick={closingSidebar}
            key={category.name}
            >
              {/**<img src={category} className='w-8 h-8 rounded-full shadow-sm'/>*/}
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
                {/**User div */}
                {user && (
            <Link
              to={`user-profile/${user._id}`}
              className={userLinkStyles + ' shadow-inner'}
              onClick={closingSidebar}
            >
              <img src={user.image} className='w-10 h-10 rounded-[100%]' alt='user-icon'/>
              <p className="">{user.userName}</p>
            </Link>
          )}
        {/**End User Div */}

    </div>
  )
}
// styles
const linkStylesLogo = "flex px-5 gap-2 my-6 pt-1 items-center mt-[50px]";
const mainDivStyles = 'flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'
const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';
const userLinkStyles = 'flex my-5 mb-3 gap-2 p-1 items-center bg-white rounded-lg ';
export default Sidebar
