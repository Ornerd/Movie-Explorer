import {React, useEffect, useRef, useState} from 'react'
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { motion } from "framer-motion";
import Genre from '../components/button/Genre';
import pictorial from '../assets/images/logo searchlogo 1.png';
import DropDownBar from '../components/DropDownBar';

const SearchMovie = () => {
  const [movies, setMovies] = useState([]);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [getGenres, setGetGenres] = useState([]);
  const genreContainerRef = useRef(null); // Reference for genre scrolling
  const API_KEY = "bcc26b7e142a51f09bcf0a149964e33b";
  const GENRE_API =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=bcc26b7e142a51f09bcf0a149964e33b";

  const fetchMovies = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false`
    );
    const data = await response.json();
    setMovies(data.results || []);
  };

  useEffect(() => {
    fetch(GENRE_API) // Fetch Genres
      .then((result) => result.json())
      .then((data) => {
        setGetGenres(data.genres);
      });
  }, []);
  

    // Function to check scroll position
    const checkScroll = () => {
      if (genreContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = genreContainerRef.current;
        setAtStart(scrollLeft === 0);
        setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };
  
    // Attach scroll listener when genres load
    useEffect(() => {
      const container = genreContainerRef.current;
      if (container) {
        checkScroll();
        container.addEventListener("scroll", checkScroll);
        return () => {
          container.removeEventListener("scroll", checkScroll);
        };
      }
    }, [getGenres]);
  
    // Listen for window resize events
    useEffect(() => {
      window.addEventListener("resize", checkScroll);
      return () => {
        window.removeEventListener("resize", checkScroll);
      };
    }, []);
  
    // Scroll Handlers
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
  
    const handleGenreSelect = (id) => {
      setGetSelectedGenre((prevIds) =>
        prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
      );
    };

  return (
    <section className="min-h-screen p-6 text-white">
      <NavBar/>
      
      <div className='capitalize mt-30 mx-auto max-w-[1184px] relative'>
        <span className='p-2 w-fit h-12 rounded-2xl bg-[#228EE5] clip-custom'>advanced search</span>
        <div className='z-10 bg-[#030A1B] border-[1px] border-[#228EE5] rounded-2xl p-4 mt-4'>

          <div className='flex flex-col lg:flex-row items-center justify-center gap-12'>

            <div className='w-full lg:w-1/4 flex justify-left lg:items-end lg:justify-end pt-4'>
              <img src={pictorial} alt="cinema-graphic" className='w-1/2 lg:w-full lg:-mr-4' />
            </div>

            <div className='w-full lg:w-3/4 flex flex-wrap items-start lg:grid lg:grid-cols-6 lg:grid-rows-2 gap-6 lg:gap-y-12 lg:px-8'>
              <div className='w-full max-w-90 lg:w-auto lg:col-span-3 lg:col-start-1 lg:row-start-2 flex items-center justify-end'>
                <SearchBar onSearch={fetchMovies} onClick={fetchMovies}/>
              </div>
              <div className='lg:col-span-2 lg:col-start-1 flex items-center justify-end'>
                <DropDownBar 
                inputName={'year'}
                categoryName={'release-year'}
                placeholderText={'year'}
                />
              </div>
              <div className='lg:col-span-2 lg:col-start-3 flex items-center justify-end'>
                <DropDownBar 
                inputName={'country'}
                categoryName={'country'}
                placeholderText={'country'}
                />
              </div>

              <div className='lg:col-span-2 lg:col-start-5 flex items-center justify-end'>
                <DropDownBar
                 inputName={'actor'}
                 categoryName={'actor'}
                 placeholderText={'Tom Hanks'}
                />
              </div>

              <div className='lg:col-span-3 lg:col-start-4 lg:row-start-2 flex items-center justify-end'>
                <DropDownBar
                 inputName={'director'}
                 categoryName={'director'}
                 placeholderText={'Christopher Nolan'}
                />
              </div>

            </div>
          </div>

           {/* Genre Navigation */}
          <div className="relative w-full flex items-center justify-between mt-12 mb-12 lg:mb-0">
          {/* Left Arrow */}
          <motion.button
            onClick={scrollLeft}
            className="p-2 rounded-full z-10"
            animate={{
              opacity: atStart ? 0.3 : 1,
              scale: atStart ? 0.8 : 1,
            }}
            transition={{ duration: 0.3 }}
            disabled={atStart}
          >
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.929952 8.94757C0.682252 9.25267 0.682252 9.74733 0.929952 10.0524L7.27269 17.8649C7.52039 18.17 7.92199 18.17 8.16969 17.8649C8.41739 17.5598 8.41739 17.0652 8.16969 16.7601L2.27545 9.5L8.16969 2.23993C8.41739 1.93483 8.41739 1.44017 8.16969 1.13507C7.92199 0.829976 7.52039 0.829976 7.27269 1.13507L0.929952 8.94757Z" fill="#EBFAFF"/>
          </svg> 
          </motion.button>

          <div
            ref={genreContainerRef}
            className="flex overflow-hidden no-scrollbar whitespace-nowrap scroll-smooth w-[90%] px-0 "

          >
            {getGenres &&
              getGenres.map((genre, index) => (
                <Genre key={index} id={genre.id} handleGenreSelect={handleGenreSelect} genreName={genre.name} />
              ))}
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={scrollRight}

            className="p-2 rounded-full z-10"
            animate={{
              opacity: atEnd ? 0.3 : 1,
              scale: atEnd ? 0.8 : 1,
            }}
            transition={{ duration: 0.3 }}
            disabled={atEnd}
          >
            <svg width="8" height="19" viewBox="0 0 8 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.47239 8.94757C7.72009 9.25267 7.72009 9.74733 7.47239 10.0524L1.12965 17.8649C0.88195 18.17 0.480349 18.17 0.23265 17.8649C-0.01505 17.5598 -0.01505 17.0652 0.23265 16.7601L6.12689 9.5L0.23265 2.23993C-0.0150494 1.93483 -0.0150494 1.44017 0.23265 1.13507C0.48035 0.829976 0.88195 0.829976 1.12965 1.13507L7.47239 8.94757Z" fill="#EBFAFF"/>
            </svg>

          </motion.button>

          </div> 
        </div>
      </div>
      

      <div className="flex flex-wrap gap-12 mt-24 mx-auto justify-center">
        {movies?.length > 0 ? (
          movies.map((movie) => (
            <MovieCard {...movie} getGenres={getGenres} />
          ))
        ) : (
          <p className="text-center col-span-full">No movies found.</p>
        )}
      </div>

      <Footer/>
    </section>
  );
};

export default SearchMovie;

 /*const SearchMovie = () => {
  return (
    <div>
      <NavBar/>
      SearchMovie
    </div>
  )
}

export default SearchMovie;*/