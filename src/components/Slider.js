import { useState, useEffect } from "react";
import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styled from 'styled-components';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import apiCalls from '../config/api';
import {IMAGE_URL} from "../global";
import {ORIGINAL_IMAGE_URL} from "../global";

const Backdrop = styled.div `
  position: relative;
  padding: 60px 0;
  height: 570px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Row = styled.div `
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const Img = styled.img `
  width: 300px;
  height: 450px;
  border-radius: 10px;
`;

const Col = styled.div `
  color: #FFF;
  margin-left: 50px;
`;

const Title = styled.h3 `
  font-size: 35px;
  font-weight: 700;
  color: #FFF;
  margin: 0;
`;

const Overview = styled.span `
  display: inline-block;
  font-size: 22px;
  font-weight: 600;
  margin: 5px 0;
`;

const OverviewText = styled.p `
  font-size: 16px;
  line-height: 20px;
`;

const VoteAverage = styled.div `
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #081C22;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 0;
`;

const Slider = () => {

  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(undefined);
  SwiperCore.use([Autoplay]);

    useEffect(() => {
      const movieSlider = async () => {
        try {
            const data = await apiCalls.getMovies('popular');
            setPopular(data.results);
        } catch (error) {
            setError(error.message);
        }
      }
      movieSlider();
    }, []);

  return(
    <div>
      {error && <div className="content-401">
        {error ? <img src="img/error_401.webp" alt="error 401" className="logo-401" /> : ''}
      </div>}
      {!error && <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1} loop autoplay={{delay: 5000, disableOnInteraction: false}}>
      {popular.map(el => (<SwiperSlide>
        <div key={el.id}>
        <Backdrop className="backdrop" style={{ backgroundImage: `url(${ORIGINAL_IMAGE_URL + el.backdrop_path})`}}>
          <div className="container">
            <Row>
              <Img src={IMAGE_URL + el.poster_path} alt={el.title} className="img" />
              <Col>
                <Title> {el.title} </Title>
                <Overview> Overview </Overview>
                <OverviewText> {el.overview} </OverviewText>
                <VoteAverage> <Progress type="circle" percent={el.vote_average * 10} width={65} /> </VoteAverage>
                <Link className="view-movie" to={`/movie/${el.id}`}> View this movie </Link>
              </Col>
            </Row>
          </div>
        </Backdrop>
        </div>
          </SwiperSlide>))};
      </Swiper>}
    </div>
  );
};

export default Slider;