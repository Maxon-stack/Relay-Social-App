import React, { useEffect, useState } from 'react';

import MainLayout from './MainLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utilityFunctions/data';
import Spinner from './Spinner';


const Search = ({searchTerm}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);
  return (
    <div>
      {loading && <Spinner message={`Searching...`}/> }
      {posts?.length !==0 && <MainLayout posts ={posts}/>}
      {posts?.length ===0 && searchTerm !=='' && !loading &&(<div className='mt-10 text-center text-xl'> 
        No Posts Found
        </div>)}
    </div>
  )
}

export default Search
