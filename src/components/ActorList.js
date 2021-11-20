import { useState, useEffect } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import styled from 'styled-components';
import apiCalls from '../config/api';
import ActorCard from "./ActorCard";

const Slider = styled.div`
  padding: 50px 0;
`;

const Title = styled.h3 `
  font-size: 25px;
  font-weight: 700;
`;

const ActorList = ({id}) =>{
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const movieActors = async () => {
      try {
          const data = await apiCalls.actorsAndCast(id);
          setActors(data.cast);
      } catch (error) {
          setError(error.message);
      }
    }
    movieActors();
  }, []);

  return (
    <Slider>
        <Title> Actors </Title>
        {error && <div className="content-401">
        {error ? <img src="img/error_401.webp" alt="error 401" className="logo-401" /> : ''}
      </div>}
        {!error && <Swiper grabCursor={true} spaceBetween={0} slidesPerView={6}>
          { actors.map((el, index ) => (<SwiperSlide key={index} > <ActorCard actorObj={el} /> </SwiperSlide>))}
        </Swiper>}
    </Slider>
  );
};

export default ActorList;