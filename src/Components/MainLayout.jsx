import React from 'react'
import Masonry from 'react-masonry-css'
import SinglePost from './SinglePost'
//masonry layout
const breakpointObject = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
}
const MainLayout = ({posts}) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols= {breakpointObject}>
      {posts?.map((post) => <SinglePost key={post._id} post = {post} className='w-max'/>)}
    </Masonry>
    
  )
}

export default MainLayout
