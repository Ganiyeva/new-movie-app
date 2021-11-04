import { FaFilter } from "react-icons/fa";
import { useState, useEffect } from "react";
import Select from 'react-select';
import styled from 'styled-components';
import {MY_API_KEY} from "../global";
// import MovieCard from './MovieCard';


const GENRE_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MY_API_KEY}&language=en-US`;

const Label = styled.span `
  color: #FFF;
`;

const Card = styled.div `
  width: 400px;
  padding: 50px;
  border-radius: 10px;
  background-color: #16151A;
  margin: 0 auto;
`;

const Title = styled.span `
  font-size: 24px;
  font-weight: 700;
  color: #FFF;
`;

const Btn = styled.button `
  width: 145px;
  height: 42px;
  padding: 8px 0;
  border: none;
  border-radius: 5px;
  margin: 10px 10px 0 0;
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
  margin: 10px 0 0;
  background-color: #FF1151;
  font-size: 15px;
  color: #FFF;
`;

const Discovers = () => {

  const [year, setYear] = useState('');
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState([]);
  const [genre, setGenre] = useState('');
  const [discover, setDiscover] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    fetch(GENRE_API).then(res => res.json()).then(data => {
      setGenres(data.genres);
    });
  }, []);

  // Select Options
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
    setGenre(objArr)
    let newArr = objArr.map(el => {
      return (
        el.value.toString()
      );
    });
    return ( newArr.join() );
  };

  const handleSortChange = (obj) => {
    setSort(obj.value);
  };

    const API_DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&sort_by=${sort}.desc&include_adult=false&page=1&${year}=2020&with_genres=${genres}`;

    useEffect(()=> {
      fetch(API_DISCOVER).then(res => {
        if(!res.ok) {
          throw Error(res.status);
        };
        return res.json();
      }).then(data =>{
        setDiscover(data.results);
        console.log(data.results);
      })
      .catch((err) => {
        setError(err);
      });
    }, []);

  const handleDiscoverBtn = () => {
    {discover.map(el => ( <div key={el.id}> {el.title} </div>))};
  };

  return (
    <Card>
      <Title> <FaFilter className="filter" /> Filter </Title>
      <form method="get">
        <Label>Year</Label>
        <Select className="all" options={yearOptions} onChange={handleYearChange} />
        <Label>Genre</Label>
        <Select className="all" options={genreOptions} isMulti onChange={handleGenreChange} />
        <Label>Sort by</Label>
        <Select className="all" options={sortOptions}  onChange={handleSortChange} />

        <Btn className="search-btn" type="button" onClick={handleDiscoverBtn}> Discover </Btn>
        <Found> Found <span></span> movies </Found>
      </form>
    </Card>
  );
};

export default Discovers;