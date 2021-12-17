import { FaFilter } from "react-icons/fa";
import { useState, useEffect } from "react";
import Select from 'react-select';
import styled from 'styled-components';
import apiCalls from '../config/api';
import MovieCard from "./MovieCard";
import Loader from "./Loader";

const Card = styled.div `
  width: 100%;
  min-height:80vh;
  padding: 20px 0;
  background-color: #16151A;
`;

const Forma = styled.form `
  display: flex;
  justify-content: space-between;
  padding: 0 15px;

  @media (max-width: 1199px){
    display: block;
    padding: 0;
  }
`;

const Box = styled.div `
  width: 250px;

  @media (max-width: 1199px){
    width: 70%;
    margin: 10px auto;
  }
`;

const Label = styled.span `
  color: #FFF;
`;

const Title = styled.span `
  font-size: 24px;
  font-weight: 700;
  color: #FFF;
  margin-left: 15px;

  @media (max-width: 1199px){
    margin-left: 130px;
  }
`;

const Btns = styled.div `
@media (max-width: 1199px){
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
`

const Btn = styled.button `
  width: 145px;
  height: 42px;
  padding: 8px 0;
  border: none;
  border-radius: 5px;
  margin: 0 10px 0 0;
  background-color: #FFC107;
  font-size: 17px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const Found = styled.span `
  display: inline-block;
  width: 145px;
  height: 42px;
  padding: 10px;
  border-radius: 5px;
  margin: 0;
  background-color: #FF1151;
  font-size: 15px;
  color: #FFF;
  text-align: center;
`;

const Row = styled.div `
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
`;

const Discovers = () => {

  const [year, setYear] = useState('');
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState([]);
  const [genre, setGenre] = useState('');
  const [discover, setDiscover] = useState([]);
  const [total, setTotal] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGanres = async () => {
      try {
          const data = await apiCalls.genres();
          setGenres(data.genres);
      } catch (error) {
          setError(error.message);
      }
    }
    getGanres();
  }, []);


  const yearOptions = [
    { value: '2000', label: '2000' },
    { value: '2001', label: '2001' },
    { value: '2002', label: '2002' },
    { value: '2003', label: '2003' },
    { value: '2004', label: '2004' },
    { value: '2005', label: '2005' },
    { value: '2006', label: '2006' },
    { value: '2006', label: '2007' },
    { value: '2006', label: '2008' },
    { value: '2006', label: '2009' },
    { value: '2006', label: '2010' },
    { value: '2006', label: '2011' },
    { value: '2006', label: '2012' },
    { value: '2006', label: '2013' },
    { value: '2006', label: '2014' },
    { value: '2006', label: '2015' },
    { value: '2006', label: '2016' },
    { value: '2006', label: '2017' },
    { value: '2006', label: '2018' },
    { value: '2006', label: '2019' },
    { value: '2006', label: '2020' },
    { value: '2006', label: '2021' }
  ];

  const genreOptions = genres.map( el => {
    return { value: el.id, label: el.name };
  });

  const sortOptions = [
    { value: 'popularity.asc', label: 'Popularity' },
    { value: 'release_date.asc', label: 'Release Date' },
    { value: 'revenue.asc', label: 'Budget' },
    { value: 'vote_average.asc', label: 'Rating' },
    { value: 'original_title.asc', label: 'Title' }
  ];

  // Functions
  const handleYearChange = (obj) => {
    setYear(obj.value);
  }

  const handleGenreChange = (objArr) => {
    let newArr = objArr.map(el => {
      return (
        el.value.toString()
      );
    });
    setGenre( newArr.join() );
  };

  const handleSortChange = (obj) => {
    setSort(obj.value);
  };

  const handleDiscoverBtn = async () => {
    try {
      const data = await apiCalls.discover({
        language: 'en-US',
        sort_by: sort,
        year: year,
        with_genres: genre
      });
      setDiscover(data.results);
      setTotal(data.total_results);
      setIsLoading(false);
      } catch (error) {
      setError(error.message);
      setIsLoading(false);
      }
      setIsLoading(true);
  };

  return (
    <div className="container">
      <Card>
        <Title> <FaFilter className="filter" /> Filter </Title>
        <Forma method="get">
          <Box>
            <Label>Year</Label>
            <Select options={yearOptions} onChange={handleYearChange} />
          </Box>
          <Box>
            <Label>Genre</Label>
            <Select options={genreOptions} isMulti onChange={handleGenreChange} />
          </Box>
          <Box>
            <Label>Sort by</Label>
            <Select options={sortOptions}  onChange={handleSortChange} />
          </Box>
          <Btns>
            <Btn className="search-btn" type="button" onClick={handleDiscoverBtn}> Discover </Btn>
            <Found> Found <span> {total} </span> </Found>
          </Btns>
        </Forma>
        {error && <div className="content-401">
        {error ? <img src="img/error_401.webp" alt="error 401" className="logo-401" /> : ''}
      </div>}
        {!error || !isLoading ? <Row>
          {discover.map(el => ( <div key={el.id}> <MovieCard movieObj={el}/> </div>))}
        </Row> : <Loader/>}
      </Card>
    </div>
  );
};

export default Discovers;