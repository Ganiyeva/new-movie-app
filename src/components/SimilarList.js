import { useState, useEffect } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import styled from 'styled-components';
import apiCalls from '../config/api';
import SimilarCard from "./SimilarCard";
import Loader from './Loader';

const Slider = styled.div`
  padding: 50px 0;
`;

const Title = styled.h3 `
  font-size: 25px;
  font-weight: 700;
`;

const SimilarList = ({id}) =>{
  const [similar, setSimilar] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const movieSimilar = async () => {
      try {
          const data = await apiCalls.similar(id);
          setSimilar(data.results);
          setIsLoading(false);
      } catch (error) {
          setError(error.message);
          setIsLoading(false);
      }
    }
    setIsLoading(true);
    movieSimilar();
  }, [id]);

  if(isLoading)
    return (<Loader/>); 
  else return (
    <Slider>
      <Title> Similar </Title>
      {error && <div className="content-401">
        {error ? <img src="img/error_401.webp" alt="error 401" className="logo-401" /> : ''}
      </div>}
      {!error && <Swiper grabCursor={true} spaceBetween={0} slidesPerView={4}
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
        { similar.map((el, index ) => (<SwiperSlide key={index} > <SimilarCard similarObj={el} /> </SwiperSlide>))}
      </Swiper>}
    </Slider>
 );
};

export default SimilarList;