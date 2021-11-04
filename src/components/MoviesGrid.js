import styled from 'styled-components';
import { useState, useEffect } from "react";
import { BY_GENRES } from "../global";
import MovieCard from './MovieCard';
import usePrevious from "../hooks";
import {MY_API_KEY} from "../global";

const Card = styled.div `
  padding: 20px;
  margin-left: 20px;
`;

const Row = styled.div `
  width: 885px;
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h3 `
   font-size: 20px;
   font-weight: 600;
   color: #FFF;
   margin-left: 13px
`;

const Btn = styled.button `
  padding: 10px 15px;
  background-color: #FFC107;
  border: none;
  font-size: 17px;
  font-weight: 600;
  margin: 15px 0 0 13px;
  cursor: pointer;
`;

const MoviesGrid = (props) => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(undefined);

  const prevGenre = usePrevious(props.genre);
  const prevPage = usePrevious(page);

  const LoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    let list;

    if (prevGenre != props.genre) {
      list = [];
    } else if(prevPage === page) {
      list = [];
    } else {
      list = movies;
    }
    if (props.genre == undefined) {
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${MY_API_KEY}&page=${page}`).then(res => {if(!res.ok) {throw Error(res.status);};
        return res.json();
      }).then(data => {
        setMovies( [...list , ...data.results] );
        setTotalPage(data.total_pages);
      })
      .catch((err) => {
        setError(err);
      });
    } else {
      fetch(BY_GENRES + props.genre + '&page=' + page).then(res => {
        if(!res.ok) {
          throw Error(res.status);
        };
        return res.json();
      }).then(data =>{
        setMovies( [...list, ...data.results] );
        setTotalPage(data.total_pages);
      })
      .catch((err) => {
        setError(err);
      });
    }
    }, [props.genre, page]);

  return (
    <Card>
      <Title> Movies count: {movies.length} </Title>
      <div className="content-401">
        {error ? <img src="img/error_401.webp" alt="error 401" className="logo-401" /> : ''}
      </div>
      <Row>
        {movies.map((el, i ) => <MovieCard movieObj={el} key={i} />)}
      </Row>
      {page < totalPage ? <Btn type="button" onClick={LoadMore}> Load more </Btn> : ''}
    </Card>
  );
};

export default MoviesGrid;