import { Link } from "react-router-dom";
import { MdImageNotSupported } from "react-icons/all";
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

const NoImg = styled.div `
  height: 100%;
  width: 100%;
  background-color: #FF1151;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Date = styled.span `
  display: inline-block;
  font-size: 14px;
  color: #7C788D;
  margin-top: 7px;
`;

const Title = styled.h4 `
  max-width: 180px;
  font-size: 15px;
  font-weight: 500;
  color: #FFF;
  margin: 10px auto 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const MovieCard = ({movieObj}) =>{
  return(
    <Link className="view-movie" to={`/movie/${movieObj.id}`}>
      <Movie>
        <Box>
          {movieObj.poster_path ? <Img src={IMAGE_URL + movieObj.poster_path} alt={movieObj.title} className="img" /> : <NoImg> <MdImageNotSupported className="not-img" /> </NoImg>}
        </Box>
        <Date> {movieObj.release_date ? movieObj.release_date : movieObj.first_air_date} </Date>
        <Title className="title"> {movieObj.title ? movieObj.title : movieObj.name} </Title>
      </Movie>
    </Link>
  );
}

export default MovieCard;