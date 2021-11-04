import { useState, useEffect } from "react";
import {Scrollbar} from "swiper";
// import "swiper/css/scrollbar";
import {Swiper, SwiperSlide} from "swiper/react";
import styled from 'styled-components';
import { MY_API_KEY } from "../global";
import { MOVIE_API } from '../global';
import ActorCard from "./ActorCard";

const API_ACTORS = `/credits?api_key=${MY_API_KEY}`;

const Slider = styled.div`
  padding: 50px 0;
`;

const Title = styled.h3 `
  font-size: 25px;
  font-weight: 700;
`;

const ActorList = ({id}) =>{
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch(MOVIE_API + id + API_ACTORS).then(res => res.json()).then(data =>{
      setActors(data.cast);
    });
  }, []);

  return (
    <Slider>
        <Title> Actors </Title>
        <Swiper modules={Scrollbar} grabCursor={true} spaceBetween={0} slidesPerView={6} scrollbar={{ draggable: true }}>
          { actors.map((el, index ) => (<SwiperSlide key={index} > <ActorCard actorObj={el} /> </SwiperSlide>))}
        </Swiper>
    </Slider>
  );
};

export default ActorList;