import React from 'react';
import { useState, useEffect } from "react";
import styled from 'styled-components';
import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import { Link } from "react-router-dom";
import apiCalls from '../config/api';
import MovieCard from './MovieCard';
import Loader from './Loader';

const Slider = styled.div`
  margin-top: 30px;
`;

const Row = styled.div `
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  display: inline-block;
  width: 130px;
  padding: 10px 0;
  margin-left: 15px;
  background-color: #FF1151;
  text-align: center;
  font-size: 17px;
  color: #FFF;
`;

const Movielist = ({type, title}) => {

  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  SwiperCore.use([Autoplay]);


  useEffect(()=>{
    const getMovies = async () => {
      try {
          const data = await apiCalls.getMovies(type);
          setMoviesList(data.results);
          setIsLoading(false);
      } catch (error) {
          setError(error.message);
          setIsLoading(false);
      }
    }
    setIsLoading(true);
    getMovies();
  }, [type]);

  if(isLoading)
    return (<Loader/>); 
  else return (
    <Slider>
      <Row>
        <Title> {title} </Title>
        <Link to="/catalog" className="all-movies"> All </Link>
      </Row>
      {error && <div className="content-401">
        {error ? <img src="img/error_401.webp" alt="error 401" className="logo-401" /> : ''}
      </div>}
      {!error && <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={4} loop autoplay={{delay: 7000, disableOnInteraction: false}}
      breakpoints={{
        '1360': {
          'slidesPerView': 4
        },
        "1199": {
          "slidesPerView": 3
        },
        "991": {
          "slidesPerView": 3
        },
        "767": {
          "slidesPerView": 3
        },
        "565": {
          "slidesPerView": 2
        },
        "480": {
          "slidesPerView": 1
        },
        // "375": {
        //   "slidesPerView": 3
        // }
      }}>
        {moviesList.map(el => (<SwiperSlide key={el.id} > <MovieCard movieObj={el}/> </SwiperSlide>))};
      </Swiper>}
    </Slider>
  )
}

export default Movielist