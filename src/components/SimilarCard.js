import { Link } from "react-router-dom";
import styled from 'styled-components';
import {IMAGE_URL} from '../global';

const Img = styled.img `
  width: 260px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const Box = styled.div `
  width: 260px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin: 3px 0 15px 0;
`;

const Title = styled.h4 `
  min-height: 50px;
  font-size: 16px;
  color: #000;
  font-weight: 300;
  margin: 0;
`;

const VoteAverage = styled.span `
  font-size: 15px;
  font-weight: 300;
  color: #000;
  margin: 0;
`;

const SimilarCard = ({similarObj}) => {
  return (
    <Link to={`/movie/${similarObj.id}`}>
      <Img src={IMAGE_URL + similarObj.poster_path} alt={similarObj.title} className="img" />
      <Box>
        <Title className="title"> {similarObj.title ? similarObj.title : similarObj.name} </Title>
        <VoteAverage> {Math.trunc(similarObj.vote_average) * 10 + '%'} </VoteAverage>
      </Box>
    </Link>
  );
};
  
  export default SimilarCard;