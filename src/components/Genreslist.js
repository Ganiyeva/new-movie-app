import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import {MY_API_KEY} from "../global";

const GENRE_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MY_API_KEY}&language=en-US`;

const Aside = styled.aside `
  width: 200px;
  padding: 20px;
`;

const GenreList = () => {

  const [genres, setGenres] = useState([]);

    useEffect(() => {
      fetch(GENRE_API).then(res => res.json()).then(data => {
        setGenres(data.genres);
      });
    }, []);

  return (
    <Aside className="aside">
      { genres.map((el, index) => (<NavLink to={`/catalog/${el.id}`} key={index} activeClassName="active-genre" className="genre-link"> {el.name} </NavLink>))}
    </Aside>
  );
};

export default GenreList;