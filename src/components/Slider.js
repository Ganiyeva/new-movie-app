import { useState, useEffect } from "react";
import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styled from 'styled-components';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import { MOVIE_API } from '../global';
import { MY_API_KEY } from "../global";
import {IMAGE_URL} from "../global";
import {ORIGINAL_IMAGE_URL} from "../global";

const API_PARAMS = `popular?api_key=${MY_API_KEY}`;

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
      fetch(MOVIE_API + API_PARAMS).then(res => {
        if(!res.ok) {
          throw Error(res.status);
        };
        return res.json();
      }).then(data =>{
        setPopular(data.results.slice(0, 4));
      })
      .catch((err) => {
        setError(err);
      });
    }, []);

  return(
    <div>
      <div className="content-401">
        {error ? <img src="img/logo-401.png" alt="error 401" className="logo-401" /> : ''}
      </div>
      <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1} loop autoplay={{delay: 5000, disableOnInteraction: false}}>
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
      </Swiper>
    </div>
  );
};

export default Slider;