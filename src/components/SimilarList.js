import { useState, useEffect } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import styled from 'styled-components';
import apiCalls from '../config/api';
import SimilarCard from "./SimilarCard";

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

  useEffect(() => {

    const movieSimilar = async () => {
      try {
          const data = await apiCalls.similar(id);
          setSimilar(data.results);
      } catch (error) {
          setError(error.message);
      }
    }
    movieSimilar();
  }, [id]);

  return (
    <Slider>
      <Title> Similar </Title>
      {error && <div className="content-401">
        {error ? <img src="img/error_401.webp" alt="error 401" className="logo-401" /> : ''}
      </div>}
      {!error && <Swiper grabCursor={true} spaceBetween={0} slidesPerView={4}>
        { similar.map((el, index ) => (<SwiperSlide key={index} > <SimilarCard similarObj={el} /> </SwiperSlide>))}
      </Swiper>}
    </Slider>
 );
};

export default SimilarList;