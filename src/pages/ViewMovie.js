import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import { MY_API_KEY } from "../global";
import {ORIGINAL_IMAGE_URL} from '../global';
import {IMAGE_URL} from '../global';
import {MOVIE_API} from '../global';
import ActorList from "../components/ActorList";
import SimilarList from "../components/SimilarList";

const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;

const PageContent = styled.section `
  min-height: 100vh;
  margin-top: 97px;
  padding: 50px 0;
`;

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

const Box = styled.span `
  margin: 0;
  font-size: 15px;
  font-weight: 500;
`;

const Language = styled.span `
  text-transform: uppercase;
`;

const Circle = styled.span `
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #FFF;
  vertical-align: middle;
  margin-left: 5px;
`;

const Genres = styled.span `
  margin-left: 5px;
`;

const Time = styled.span `
  margin-left: 5px;
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

const Tagline = styled.p `
  font-size: 18px;
  font-style: italic;
  opacity: 0.7;
  margin: 15px 0 0;
`;

const Overview = styled.span `
  display: inline-block;
  font-size: 22px;
  font-weight: 600;
  margin: 5px 0;
`;

const OverviewText = styled.p `
  font-size: 16px;
  // font-weight: 500;
  line-height: 20px;
`;

const ViewMovie = () => {

  const [movieInfo, setMovieInfo] = useState({})
  const {id} = useParams();

    useEffect(() => {
      fetch(MOVIE_API + id + API_PARAMS).then(res => res.json()).then(data =>{
        setMovieInfo(data);
      });
    }, [id]);

  return (
    <PageContent>
      <Backdrop className="backdrop" style={{ backgroundImage: `url(${ORIGINAL_IMAGE_URL + movieInfo.backdrop_path})`}}>
        <div className="container">
          <Row>
            <Img src={IMAGE_URL + movieInfo.poster_path} alt="" />
            <Col>
              <Title> {movieInfo.title ? movieInfo.title : movieInfo.name} </Title>
              <Box>
                {movieInfo.release_date ? movieInfo.release_date : movieInfo.first_air_date}
                <Language> ({movieInfo.original_language}) </Language>
                <Circle> </Circle>
                <Genres>
                  { movieInfo.hasOwnProperty('genres') ? movieInfo.genres.map((genre, index ) => (<span key={index}> {genre.name}, </span>)) : null}
                </Genres>
                <Circle> </Circle>
                <Time> {movieInfo.runtime + 'm'} </Time>
              </Box>
              <VoteAverage> <Progress type="circle" percent={movieInfo.vote_average * 10} width={65} /> </VoteAverage>
              <Tagline> { movieInfo.hasOwnProperty('tagline') ? movieInfo.tagline : null} </Tagline>
              <Overview> Overview </Overview>
              <OverviewText> {movieInfo.overview} </OverviewText>
            </Col>
          </Row>
        </div>
      </Backdrop>
      <div className="container">
        <ActorList id={id}/>
        <SimilarList id={id}/>
      </div>
    </PageContent>
  );
};

export default ViewMovie;