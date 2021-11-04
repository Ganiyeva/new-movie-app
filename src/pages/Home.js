// import { useState, useEffect } from "react";
import styled from 'styled-components';
// import { MY_API_KEY } from "../global";
import Movielist from "../components/Movielist";
import Slider from '../components/Slider';

// const SEARCH_API =`https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false`;

const PageContent = styled.section `
  height: 100%;
  margin-top: 97px;
  padding: 0 0 100px 0;
`;

const Wrapper = styled.div `
  background-color: #16151A;
`;

// const Row = styled.div `
//   width: 870px;
//   display: flex;
//   flex-wrap: wrap;
// `;

// const Search = styled.input `
//   width: 100%;
//   padding: 15px 0;
//   background-color: #222125;
//   outline: none;
//   border: none;
//   text-align: center;
//   font-size: 15px;
//   color: #FFF;
// `;


const Home = () => {
  // const [error, setError] = useState(undefined);

  // const handleSearch = (e) => {
  //   if(e.target.value.length > 2){
  //     fetch(SEARCH_API + `&query=${e.target.value}`).then(res => res.json()).then(data =>{
  //       setMoviesList(data.results);
  //     })
  //   }
  // };

  return (
    <PageContent className="bg-img">
      <Slider />
      <div className="container">
        <Wrapper>
          {/* <Search type="text" placeholder="Search..." onChange={handleSearch} /> */}
          <Movielist type='popular' title='Popular' />
          {/* <Movielist type='trending' title='Trending' /> */}
          <Movielist type='top_rated' title='Top reading' />
          <Movielist type='upcoming' title='Upcoming' />
          {/* <Row> {!isLoading && !error ? mappedMovies : ''} </Row> */}
        </Wrapper>
      </div>
    </PageContent>
    );
}

export default Home;