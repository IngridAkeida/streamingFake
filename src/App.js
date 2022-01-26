import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeaturedData ] = useState(null);
  const [ blackHeader, setBlackHeader ] = useState(false);


  useEffect(() => {
    const loadAll = async () => {
      
      // Pagando a lista total  
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //Pegando o filme em destaque (Featured)

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){

        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return (

    <div className='page'>

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className='list'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label='Heart'>❤</span> por B7 Web<br/>
        Adaptado com ódio no <span role="img" aria-label='Heart'>❤</span> (brincadeirinha) por mim <a href='https://ingrid-akeida.netlify.app/' target='blank' className='link'>Ingrid Sanches</a><br/>
        Projeto de estudo sem fins lucrativos<br/>
        Direitos de imagem para <strong>Netflix</strong><br/>
        Dados obtidos no site <a href='https://www.themoviedb.org/' target='blank' className='link'>TMDB</a> 

      </footer>

      {movieList <= 0 &&
        <div className='loading'>
          <img src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif' alt='Loading'/>
        </div>
      }
    </div>
  );
}

