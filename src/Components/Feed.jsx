import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utilityFunctions/data';
import MainLayout from './MainLayout';
import Spinner from './Spinner';
const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState(null)
  const {categoryId} = useParams();
  useEffect(() => {
    setLoading(true)
    if(categoryId){
      const query = searchQuery(categoryId)
      client.fetch(query)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
    }else{
      client.fetch(feedQuery)
       .then((data)=>{
        setPosts(data);
        setLoading(false);
       })
    }
 
  }, [categoryId]) // calls this function everytime the category changes.
  if(loading) return <Spinner message ='Loading custom feed'/>
  if(!posts?.length) return(<h2>No posts here yet!</h2>)
  return (
    <div>
      {posts && <MainLayout posts = {posts}/>}
    </div>
  )
}

export default Feed
