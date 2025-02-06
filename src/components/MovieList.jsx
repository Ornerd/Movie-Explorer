import React, { useState, useEffect, useRef } from "react";
import SeeMore from "./navLinks/SeeMore";
import Genre from "./button/Genre";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";
<<<<<<< HEAD
import FavoriteList from "./FavoriteList"

const MovieList = () => {
  const [getMovies, setGetMovies] = useState([]);
  const [getGenres, setGetGenres] = useState([]);
  const [savedFavorite, setSavedFavorite] = useState([]);
=======
import { useScroll, useTransform } from 'framer-motion';
const MovieList = () => {
  const [getMovies, setGetMovies] = useState([]);
  const [getGenres, setGetGenres] = useState([]);
  const genreContainerRef = useRef(null); // Reference for genre scrolling
  const [getSelectedGenre, setGetSelectedGenre] = useState([]);

  
>>>>>>> 80062d683b31bb83c49263fa160222fcce861545

  const API_URL_ONE =
    `https://api.themoviedb.org/3/discover/movie?api_key=bcc26b7e142a51f09bcf0a149964e33b&with_genres=${getSelectedGenre.join(',')}`;

  const GENRE_API =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=bcc26b7e142a51f09bcf0a149964e33b";

  const handleGenreSelect = (id) => {
      if (getSelectedGenre.includes(id)) {
        setGetSelectedGenre((prevIds)=> prevIds.filter(prevId => prevId !== id))
        } 
        
        else{
            setGetSelectedGenre((prevIds)=>[...prevIds, id])
        }
      }  


  useEffect(() => {
    fetch(API_URL_ONE) //for hero section
      .then((res) => res.json())
      .then((data) => {
        setGetMovies(data.results);
      });
  }, []);

  useEffect(() => {
    fetch(GENRE_API)
      .then((result) => result.json())
      .then((data) => {
        setGetGenres(data.genres);
        console.log(getGenres);
      });
  }, []);


  //Get Genre Movies

  useEffect(() => {
    fetch(API_URL_ONE)
      .then((res) => res.json())
      .then((data) => {
        setGetMovies(data.results);
      });
  }, [getSelectedGenre]);




   // Scroll handlers for genre navigation
   const scrollLeft = () => {
    if (genreContainerRef.current) {
      genreContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (genreContainerRef.current) {
      genreContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  

  return (
<<<<<<< HEAD
    <section className="max-w-[1232px] mx-auto px-4">
      <FavoriteList savedFavorite={savedFavorite}/>
      <div className="text-2xl flex justify-between mb-8">
        <h1>Movies</h1>
        <SeeMore />
      </div>
      <div className="flex justify-start w-full mb-12 overflow-x-auto">
        {getGenres &&
          getGenres.map((genre) => {
            return <Genre key={genre.id} genreName={genre.name} />;
          })}
=======
    <section className="max-w-[1232px] mx-auto px-4"  >
      <div className="text-2xl flex justify-between mb-8" >
        <h1>Movies</h1>
        <SeeMore />
      </div>

      {/* Genre Navigation */}
      <div className="relative w-full flex items-center justify-between mb-10">
        <button
          onClick={scrollLeft}
          className=" left-0 bg-gray-200 p-2 rounded-full z-10"
        >
          ◀
        </button>

        <div 
        ref={genreContainerRef}
        className="flex overflow-hidden no-scrollbar whitespace-nowrap scroll-smooth w-[95%] px-10"
        >
        {getGenres &&
        getGenres.map((genre, index) => {
          return <Genre key={index} id={genre.id} handleGenreSelect={handleGenreSelect} genreName={genre.name} />;
        })}
        </div>
    
        <button
          onClick={scrollRight}
          className=" right-0 bg-gray-200 p-2 rounded-full z-10"
        >
          ▶
        </button>
>>>>>>> 80062d683b31bb83c49263fa160222fcce861545
      </div>

     
      
      <div className="w-full flex items-start justify-center gap-8 scroll-smooth scrollbar-hide flex-wrap relative">
        {getMovies &&
          getMovies.map((movie, index) => {
            return (
              <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }}>
                <MovieCard key={movie.id} {...movie} getGenres={getGenres} />
              </motion.div>
            );
          })}
      </div>
    </section>
  );
};

export default MovieList;
