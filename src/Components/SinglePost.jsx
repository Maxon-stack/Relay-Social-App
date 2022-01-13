import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../client'
import { getUserInfo } from '../utilityFunctions/getUserInfo';
import { postDetailQuery } from '../utilityFunctions/data';
import Spinner from './Spinner';

//const query = postDetailQuery(_id);

function SinglePost({post: {postedBy, image, _id, home_url, like}}) {
  const [loading, setLoading] = useState(false);
  const [postHovered, setPostHovered] = useState(false);
  //const [isLiked, setisLiked] = useState(false)
  const navigate = useNavigate();
  const user = getUserInfo();
  const deletePost = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };
  
  const alreadyLiked = !!(like?.filter((item) => item?.postedBy?._id === user?.googleId))?.length;
  const [isLiked, setisLiked] = useState(alreadyLiked)

  const likePost = (id) => {
    if (!isLiked) {
      setLoading(true)
      client
        .patch(id)
        .setIfMissing({ like: [] })
        .insert('after', 'like[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          //alreadyLiked = true;
          setLoading(false)
          setisLiked(true);
         
        });
    }
  };
  

  useEffect(() => {
    const query = postDetailQuery(_id);
    if (query) {
      
      client.fetch(`${query}`).then((data) => {
        if (data[0].like?.filter((item) => item.postedBy._id === user?.googleId)) {
          
          }
      });
    }
    
  }, [isLiked]);



  return (
    
    <div className='m-2 '>

      <div 
      onMouseEnter={()=> setPostHovered(true)}
      onMouseLeave={()=> setPostHovered(false)}
      onClick={() => navigate(`/post-detail/${_id}`)}
      className={firstInnerDiv}
      >
        
        <Link to={`/user-profile/${postedBy?._id}`} className="flex flex-col gap-2 mt-2 items-center self-center cursor-pointer z-[10000]" onClick={(e)=> e.stopPropagation()} >
          <img
            className="w-8 h-8 rounded-full object-cover cursor-pointer z-[10000]"
            src={postedBy?.image}
            onClick={(e)=> e.stopPropagation()}
            alt="user-profile"
          />
          <p className="font-semibold capitalize cursor-pointer z-[10000]">{postedBy?.userName}</p>
      </Link>
        
      <img className='rounded-lg w-250px' alt='post' src={urlFor(image).url()}/>
      {postHovered && (
        
        <div 
          className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
          style={{height: '100%'}}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                
                <a 
                href={`${image?.asset?.url}?dl=`}
                onClick={(e) => e.stopPropagation()}
                className={IconDiv}
                >
                <MdDownloadForOffline/>
                </a>
              </div>
              
              {isLiked ?(
                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  Saved!   
                </button>
              ): (
                <button 
                onClick={(e) =>{
                  e.stopPropagation();
                  likePost(_id);
                }}
                
                type="button"
                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  Save
                </button>
              )}
            </div>
            {loading? <Spinner/> : ''}


            <div className=" flex justify-between items-center gap-2 w-full">
              {home_url?.slice(8).length > 0 ? (
                <a
                href={home_url}
                target="_blank"
                className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                
                {' '}
                <BsFillArrowUpRightCircleFill />
                {home_url?.slice(8, 17)}...
              </a>
               ) : undefined}
               {
           postedBy?._id === user?.googleId && (
           <button
             type="button"
             onClick={(e) => {
               e.stopPropagation();
               deletePost(_id);
             }}
             className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
           >
             <AiTwotoneDelete />
           </button>
           )
            }
            </div>
        </div>
      )}
      </div>

    </div>
  );
};
const firstInnerDiv = ' relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
const IconDiv = 'bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'

export default SinglePost
