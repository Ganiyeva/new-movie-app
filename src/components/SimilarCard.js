import { Link } from "react-router-dom";
import styled from 'styled-components';
import {IMAGE_URL} from '../global';

const Card = styled.div `
  width: 260px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 -7px 5px -7px #e3e3e3, inset -7px 0 5px -7px #e3e3e3, inset 5px 0 5px -7px #e3e3e3;
`;

const Img = styled.img `
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const Box = styled.div `
  padding: 3px 15px 15px;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const Title = styled.h4 `
  max-width: 150px;
  font-size: 16px;
  color: #000;
  font-weight: 300;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const VoteAverage = styled.span `
  font-size: 15px;
  font-weight: 300;
  color: #000;
  margin: 0;
`;

const SimilarCard = ({similarObj}) => {
  return (
    <Card>
      <Link to={`/movie/${similarObj.id}`}>
        <Img src={IMAGE_URL + similarObj.poster_path} alt={similarObj.title} className="img" />
        <Box>
          <Title className="title"> {similarObj.title ? similarObj.title : similarObj.name} </Title>
          <VoteAverage> {Math.trunc(similarObj.vote_average) * 10 + '%'} </VoteAverage>
        </Box>
      </Link>
    </Card>
  );
};
  
  export default SimilarCard;