import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import styled from 'styled-components';
import {IMAGE_URL} from '../global';

const Movie = styled.div `
  position: relative;
  width: 280px;
  padding: 0 15px;
  text-align: center;
`;

const Box = styled.div `
   position: relative;
   height: 350px;
   background-color: #16151ac7;
   z-index: 2;
`;

const Img = styled.img `
  width: 100%;
  height: 100%;
  border-radius: 7px;
`;

const Btn = styled.button `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 193, 7, 0.3);
`;

// const MovieType = styled.span `
//   diplay: inline-block;
//   position: absolute;
//   top: 22px;
//   left: 22px;
//   padding: 5px;
//   background-color: #FFC107;
//   border-radius: 5px;
//   z-index: 2;
//   font-size: 13px;
//   font-weight: 700;
//   color: #212529;
// `;

const Date = styled.span `
  display: inline-block;
  font-size: 14px;
  color: #7C788D;
  margin-top: 7px;
`;

const Title = styled.h4 `
  min-height: 46px;
  font-size: 15px;
  font-weight: 500;
  color: #FFF;
  margin: 10px 0 0;
`;

const MovieCard = ({movieObj}) =>{
  return(
    <Link className="view-movie" to={`/movie/${movieObj.id}`}>
      <Movie>
        <Box>
          <Img src={IMAGE_URL + movieObj.poster_path} alt={movieObj.title} className="img" />
          <Btn type="button"> <FaPlay className="play" /> </Btn>
        </Box>
        {/* <MovieType> {movieObj.media_type} </MovieType> */}
        <Date> {movieObj.release_date ? movieObj.release_date : movieObj.first_air_date} </Date>
        <Title className="title"> {movieObj.title ? movieObj.title : movieObj.name} </Title>
      </Movie>
    </Link>
  );
}

export default MovieCard;