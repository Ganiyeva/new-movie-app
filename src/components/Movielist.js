import React from 'react';
import { useState, useEffect } from "react";
import styled from 'styled-components';
import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import { Link } from "react-router-dom";
import MovieCard from './MovieCard';
// import Loader from './Loader';
import { MY_API_KEY } from "../global";

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
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  SwiperCore.use([Autoplay]);


  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${MY_API_KEY}`).then(res => {
      if(!res.ok) {
        throw Error(res.status);
      };
      return res.json();
    }).then(data =>{
      setMoviesList(data.results);
      // setIsLoading(false);
    })
    .catch((err) => {
      setError(err);
      // setIsLoading(false);
    });
  }, []);

  return (
    <Slider>
      <Row>
        <Title> {title} </Title>
        <Link to="/catalog" className="all-movies"> All </Link>
      </Row>
      <div className="content-401">
        {error ? <img src="img/error_401.webp" alt="error 401" className="logo-401" /> : ''}
      </div>
      <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={4} loop autoplay={{delay: 7000, disableOnInteraction: false}}>
        {moviesList.map(el => (<SwiperSlide key={el.id} > <MovieCard movieObj={el}/> </SwiperSlide>))};
      </Swiper>
    </Slider>
  )
}

export default Movielist