import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Feed, PostDetails, CreatePostPage, Search} from '../Components';

const Posts = ({user}) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className='px-2 md:px-5'>
      <div className="bg-gray-50">
        <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path='/' element={<Feed />}/>
          <Route path='/category/:categoryId' element={<Feed />}/>
          <Route path='/post-detail/:postId' element={<PostDetails user = {user} />}/>
          <Route path='/create-post' element={<CreatePostPage user={user} />}/>
          <Route path='/search' element={<Search searchTerm={searchQuery} setSearchQuery={setSearchQuery} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default Posts
