import React, { useEffect, useState} from 'react';
import './App.css'
import tmdb from './tmdb';
import MovieRow from './componets/MovieRow';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [ movieList, setMovieList ] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      // Pagando a lista total  
      let list = await tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);
  return (
    <div className='page'>
      <section className='lista'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}

      </section>
    </div>
  );
}

