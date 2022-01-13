import React, {useState, useRef, useEffect} from 'react';
import {AiOutlineMenuUnfold} from 'react-icons/ai'; 
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';
import {Sidebar, Profile} from '../Components';
import {client} from '../client';
import relay from '../assets/relay.png';
import Posts from './Posts';
import {getUser} from '../utilityFunctions/data'

const Home = () => {
  const [tSidebar, setTSidebar] = useState(false)
  const [user, setUser] = useState();
  const scrollStyleRef = useRef(null);
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  

  useEffect(() => {
    const attemptGetUser = getUser(userInfo?.googleId);
    client.fetch(attemptGetUser)
      .then((data)=>{
        //console.log(data)
        setUser(data[0]);
        
      })
  }, []);

  useEffect(() => {
    scrollStyleRef.current.scrollTo(0,0)
  }, [])
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar
        user={user && user}
        
        />
      </div>
      <div className="flex md:hidden flex-row">

        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
        
          
        <AiOutlineMenuUnfold fontSize={40} className='cursor-pointer' onClick={()=> setTSidebar(true)}/>
        <Link to='/'>
          <img src={relay} alt='logo' className='w-20'/>
        </Link>        
        <Link to={`user-profile/${user?._id}`} >
          <img src={user?.image} alt='logo' className='w-20 rounded-[100%]'/>
        </Link>
        </div>
        {tSidebar &&(
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in" >
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiOutlineCloseCircle fontSize={40} className = 'cursor-pointer' 
            onClick={()=>setTSidebar(false)}/>
          </div>
          <Sidebar
          user={user && user} closeSidebar = {setTSidebar}
          />
        </div>
      )}

      </div>

      <div className="pb2 flex-1 h-screen overflow-y-scroll" ref={scrollStyleRef}>
        <Routes>
            <Route path="/user-profile/:userId" element={<Profile/>} />
            <Route path="/*" element={<Posts user={user && user}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
