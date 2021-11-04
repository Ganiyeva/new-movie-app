import { useState, useEffect } from "react";
import {Scrollbar} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
// import 'swiper/css/scrollbar';
import styled from 'styled-components';
import { MY_API_KEY } from "../global";
import { MOVIE_API } from '../global';
import SimilarCard from "./SimilarCard";
const API_SIMILAR = `/similar?api_key=${MY_API_KEY}`;

const Slider = styled.div`
  padding: 50px 0;
`;

const Title = styled.h3 `
  font-size: 25px;
  font-weight: 700;
`;

const SimilarList = ({id}) =>{
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    fetch(MOVIE_API + id + API_SIMILAR).then(res => res.json()).then(data =>{
      setSimilar(data.results);
    });
  }, [id]);

  return (
    <Slider>
      <Title> Similar </Title>
      <Swiper modules={Scrollbar} grabCursor={true} spaceBetween={0} slidesPerView={4} scrollbar={{ draggable: true }}>
        { similar.map((el, index ) => (<SwiperSlide key={index} > <SimilarCard similarObj={el} /> </SwiperSlide>))}
      </Swiper>
    </Slider>
 );
};

export default SimilarList;